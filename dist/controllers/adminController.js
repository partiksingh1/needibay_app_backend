"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShops = exports.getDistributors = exports.getSalespersons = exports.getOrders = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProduct = async (req, res) => {
    var _a, _b;
    try {
        const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!adminId || role !== 'ADMIN') {
            res.status(403).json({ error: 'Unauthorized action' });
            return;
        }
        const { name, description, price, category, stock, sku } = req.body;
        // Validate input
        if (!name || !price || !category || !stock || !sku) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const existingProduct = await prisma.product.findUnique({
            where: { sku }
        });
        if (existingProduct) {
            res.status(400).json({ error: 'Product with this SKU already exists' });
            return;
        }
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                category,
                stock,
                sku,
                adminId,
            },
        });
        res.status(201).json({
            product,
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};
exports.createProduct = createProduct;
const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                shop: true,
                salesperson: true,
                distributor: true,
                items: true, // Includes order items
                payment: true, // Includes payment details
            },
        });
        res.status(200).json({
            orders,
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
};
exports.getOrders = getOrders;
const getSalespersons = async (req, res) => {
    try {
        const salespersons = await prisma.salesperson.findMany({
            include: {
                admin: true,
                shops: true,
                orders: true,
            },
        });
        res.status(200).json({
            salespersons,
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to retrieve salespersons' });
    }
};
exports.getSalespersons = getSalespersons;
const getDistributors = async (req, res) => {
    try {
        const distributors = await prisma.distributor.findMany({
            include: {
                orders: true,
            },
        });
        res.status(200).json({
            distributors,
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to retrieve distributors' });
    }
};
exports.getDistributors = getDistributors;
const getShops = async (req, res) => {
    try {
        const shops = await prisma.shop.findMany({
            include: {
                salesperson: true,
                orders: true,
            },
        });
        res.status(200).json({
            shops,
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to retrieve shops' });
    }
};
exports.getShops = getShops;
