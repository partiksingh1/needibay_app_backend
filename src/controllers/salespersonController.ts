import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createShop = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id;
        const role = req.user?.role;// Extract the user ID and role from JWT

        // Ensure role is either 'SALESPERSON' or 'ADMIN'
        if (role !== 'SALESPERSON' && role !== 'ADMIN') {
             res.status(403).json({ error: 'Unauthorized action' });
             return
        }

        const {
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
        } = req.body;

        // Validate required fields
        if (!name || !ownerName || !phone || !address || !city || !state || !pincode) {
             res.status(400).json({ error: 'Missing required fields' });
            return
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
    } catch (error) {
        res.status(500).json({ error: 'Failed to create shop' });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { shopId, totalAmount, notes, items,salespersonId,distributorId } = req.body;

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
    } catch (error: unknown) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        // Fetch all products from the database
        const products = await prisma.product.findMany();

        // Respond with the list of products
        res.status(200).json({ products });
    } catch (error) {
        // Handle any errors
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
export const getShops = async (req: Request, res: Response): Promise<any> => {
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
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to retrieve shops' });
    }
};

export const getDistributors = async (req: Request, res: Response): Promise<any> => {
    try {
        const distributors = await prisma.distributor.findMany({
            include: {
                orders: false,
            },
        });

        res.status(200).json({
            distributors,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to retrieve distributors' });
    }
};