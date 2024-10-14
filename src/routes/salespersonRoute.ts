import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {createShop, createOrder, getAllProducts, getShops, getDistributors} from "../controllers/salespersonController";

const router = Router();

// Protected route for creating a shop
router.post('/create-shop', authenticate, createShop);
router.post('/create-order', authenticate, createOrder);
router.get('/getAllProducts', authenticate, getAllProducts);
router.get('/getShops', authenticate, getShops);
router.get('/getDistributors', authenticate, getDistributors);

export const shopRouter = router;
