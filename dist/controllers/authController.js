"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createDistributor = exports.createSalesperson = exports.createAdmin = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
// Admin signup
const createAdmin = async (req, res) => {
    try {
        const { email, password, name, phone, adminCode } = req.body;
        const existingAdmin = await prisma.admin.findFirst({
            where: { OR: [{ email }, { adminCode }] }
        });
        if (existingAdmin) {
            res.status(400).json({
                error: 'Admin with this email or admin code already exists'
            });
            return;
        }
        // const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await prisma.admin.create({
            data: {
                email,
                password,
                name,
                phone,
                adminCode,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: admin.id, role: 'ADMIN' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({
            user: Object.assign(Object.assign({}, admin), { password: undefined }),
            token
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create admin' });
    }
};
exports.createAdmin = createAdmin;
// Create Salesperson
const createSalesperson = async (req, res) => {
    var _a;
    try {
        const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!adminId) {
            res.status(403).json({ error: 'Unauthorized action' });
            return;
        }
        const { email, name, phone, password, employeeId, panNumber, city, address } = req.body;
        // const temporaryPassword = generateRandomPassword();
        // const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
        const salesperson = await prisma.salesperson.create({
            data: {
                email,
                password,
                name,
                phone,
                employeeId,
                panNumber,
                city,
                address,
                admin: { connect: { id: adminId } }
            },
        });
        res.status(201).json({
            user: Object.assign(Object.assign({}, salesperson), { password: undefined }),
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to create salesperson' });
    }
};
exports.createSalesperson = createSalesperson;
// Create Distributor
const createDistributor = async (req, res) => {
    var _a;
    try {
        const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!adminId) {
            res.status(403).json({ error: 'Unauthorized action' });
            return;
        }
        const { email, password, name, phone, distributorId, panNumber, gstId, city, address } = req.body;
        // const temporaryPassword = generateRandomPassword();
        // const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
        const distributor = await prisma.distributor.create({
            data: {
                email,
                password,
                name,
                phone,
                distributorId,
                panNumber,
                gstId,
                city,
                address,
                admin: { connect: { id: adminId } }
            },
        });
        res.status(201).json({
            user: Object.assign(Object.assign({}, distributor), { password: undefined }),
            // temporaryPassword // Only in development
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create distributor' });
    }
};
exports.createDistributor = createDistributor;
// Universal login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check for user in Admin, Salesperson, and Distributor tables
        let user = await prisma.admin.findUnique({ where: { email } }) ||
            await prisma.salesperson.findUnique({ where: { email } }) ||
            await prisma.distributor.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        if (password !== user.password) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const role = user.adminCode ? 'ADMIN' : user.employeeId ? 'SALESPERSON' : 'DISTRIBUTOR';
        const token = jsonwebtoken_1.default.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            user: Object.assign(Object.assign({}, user), { password: undefined }),
            token
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Authentication failed' });
    }
};
exports.login = login;
