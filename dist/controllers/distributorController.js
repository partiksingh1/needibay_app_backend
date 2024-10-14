"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.updateOrderStatus = exports.getDistributorOrders = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDistributorOrders = async (req, res) => {
    var _a;
    try {
        const distributorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming distributorId is stored in the JWT token and added to the request
        // Fetch orders where distributorId matches the logged-in distributor
        const orders = await prisma.order.findMany({
            where: {
                distributorId, // Filter by distributorId
            },
            include: {
                shop: true,
                salesperson: true,
                items: true, // Includes order items
                payment: true, // Includes payment details
            },
        });
        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this distributor.' });
        }
        res.status(200).json({
            orders,
        });
    }
    catch (error) {
        console.log("Error fetching distributor orders:", error);
        res.status(500).json({ error: 'Failed to retrieve distributor orders' });
    }
};
exports.getDistributorOrders = getDistributorOrders;
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params; // Order ID from URL params
        const { status } = req.body; // New status from request body
        const distributorId = req === null || req === void 0 ? void 0 : req.user;
        console.log(distributorId); // Assuming distributorId is stored in JWT
        // Check if the new status is valid
        if (!Object.values(client_1.OrderStatus).includes(status)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }
        // Fetch the order to ensure it belongs to the distributor
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { distributor: true } // Include distributor for ownership check
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Ensure the logged-in distributor owns the order
        // if (order.distributorId !== distributorId) {
        //     return res.status(403).json({ message: 'Unauthorized: You can only update your own orders' });
        // }
        // Update the order status
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });
        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    }
    catch (error) {
        console.log("Error updating order status:", error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params; // Extract order ID from URL parameters
        // Fetch the order with all related information
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                shop: true, // Include shop information
                salesperson: true, // Include salesperson information
                items: {
                    include: {
                        product: true // Include product details for each item
                    }
                },
                payment: true, // Include payment details
            },
        });
        // If the order is not found, return a 404 error
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Return the order details
        res.status(200).json({ order });
    }
    catch (error) {
        console.log("Error fetching order by ID:", error);
        res.status(500).json({ error: 'Failed to retrieve order' });
    }
};
exports.getOrderById = getOrderById;
