import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response):Promise<any> => {
    try {
        const adminId = req.user?.id;
        const role = req.user?.role;

        if (!adminId || role !== 'ADMIN') {
             res.status(403).json({ error: 'Unauthorized action' });
            return
        }

        const { name, description, price, category, stock, sku } = req.body;

        // Validate input
        if (!name || !price || !category || !stock || !sku) {
             res.status(400).json({ error: 'Missing required fields' });
            return
        }

        const existingProduct = await prisma.product.findUnique({
            where: { sku }
        });

        if (existingProduct) {
             res.status(400).json({ error: 'Product with this SKU already exists' });
            return
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
    } catch (error) {
        console.log("error",error)
        res.status(500).json({ error: 'Failed to create product' });
    }
};
export const getOrders = async (req: Request, res: Response): Promise<any> => {
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
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
};
export const getSalespersons = async (req: Request, res: Response): Promise<any> => {
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
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to retrieve salespersons' });
    }
};

export const getDistributors = async (req: Request, res: Response): Promise<any> => {
    try {
        const distributors = await prisma.distributor.findMany({
            include: {
                orders: true,
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
