import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {getDistributorOrders, getOrderById, updateOrderStatus} from "../controllers/distributorController";

const router = Router();

// Protected route for creating a shop
router.get('/getOrders', authenticate, getDistributorOrders);
router.put('/orders/:orderId/status', updateOrderStatus);
router.get('/orders/:orderId', getOrderById);


export const distributorRoute = router;
