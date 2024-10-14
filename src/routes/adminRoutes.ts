import { Router } from 'express';
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware";
import {createProduct, getDistributors, getOrders, getSalespersons, getShops} from "../controllers/adminController";

const AdminRouter = Router();


// Admin-only Routes
AdminRouter.post('/createProduct', authenticate, authorizeAdmin, createProduct);
AdminRouter.get('/getOrders', authenticate, authorizeAdmin, getOrders);
AdminRouter.get('/getSalespersons', authenticate, authorizeAdmin, getSalespersons);
AdminRouter.get('/getDistributors', authenticate, authorizeAdmin, getDistributors);
AdminRouter.get('/getShops', authenticate, authorizeAdmin, getShops);

export const adminRoute = AdminRouter;

