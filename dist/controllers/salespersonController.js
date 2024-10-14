"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistributors = exports.getShops = exports.getAllProducts = exports.createOrder = exports.createShop = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createShop = async (req, res) => {
    var _a, _b;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role; // Extract the user ID and role from JWT
        // Ensure role is either 'SALESPERSON' or 'ADMIN'
        if (role !== 'SALESPERSON' && role !== 'ADMIN') {
            res.status(403).json({ error: 'Unauthorized action' });
            return;
        }
        const { name, ownerName, gstNumber, panNumber, phone, email, address, city, state, pincode, } = req.body;
        // Validate required fields
        if (!name || !ownerName || !phone || !address || !city || !state || !pincode) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        // Create the shop and associate it with the Salesperson or Admin
        const shop = await prisma.shop.create({
            data: {
                name,
                ownerName,
                gstNumber,
                panNumber,
                phone,
                email,
                address,
                city,
                state,
                pincode,
                salespersonId: role === 'SALESPERSON' ? id : undefined, // Only link to salesperson if user is salesperson
            },
        });
        res.status(201).json({ shop });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create shop' });
    }
};
exports.createShop = createShop;
const createOrder = async (req, res) => {
    try {
        const { shopId, totalAmount, notes, items, salespersonId, distributorId } = req.body;
        // Validate required fields
        if (!shopId || !totalAmount || !items || !Array.isArray(items) || items.length === 0) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        // Validate items
        for (const item of items) {
            if (!item.productId || !item.quantity || !item.price) {
                res.status(400).json({ error: 'Invalid order item' });
                return;
            }
        }
        // Create the order
        const order = await prisma.order.create({
            data: {
                shop: {
                    connect: { id: shopId }, // Link to the Shop
                },
                salesperson: {
                    connect: { id: salespersonId }, // Link to the Salesperson
                },
                distributor: {
                    connect: { id: distributorId }, // Link to the Distributor
                },
                orderNumber: Math.random().toString(36).substr(2, 9), // Generate a random order number
                totalAmount,
                notes,
                status: 'PENDING', // Set the order status to PENDING
                items: {
                    create: items.map(item => ({
                        product: { connect: { id: item.productId } },
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
        });
        res.status(201).json({ order });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
};
exports.createOrder = createOrder;
const getAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await prisma.product.findMany();
        // Respond with the list of products
        res.status(200).json({ products });
    }
    catch (error) {
        // Handle any errors
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
exports.getAllProducts = getAllProducts;
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
const getDistributors = async (req, res) => {
    try {
        const distributors = await prisma.distributor.findMany({
            include: {
                orders: false,
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
