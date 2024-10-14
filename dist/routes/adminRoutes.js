"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const adminController_1 = require("../controllers/adminController");
const AdminRouter = (0, express_1.Router)();
// Admin-only Routes
AdminRouter.post('/createProduct', auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, adminController_1.createProduct);
AdminRouter.get('/getOrders', auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, adminController_1.getOrders);
AdminRouter.get('/getSalespersons', auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, adminController_1.getSalespersons);
AdminRouter.get('/getDistributors', auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, adminController_1.getDistributors);
AdminRouter.get('/getShops', auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, adminController_1.getShops);
exports.adminRoute = AdminRouter;
