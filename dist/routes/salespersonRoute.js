"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const salespersonController_1 = require("../controllers/salespersonController");
const router = (0, express_1.Router)();
// Protected route for creating a shop
router.post('/create-shop', auth_middleware_1.authenticate, salespersonController_1.createShop);
router.post('/create-order', auth_middleware_1.authenticate, salespersonController_1.createOrder);
router.get('/getAllProducts', auth_middleware_1.authenticate, salespersonController_1.getAllProducts);
router.get('/getShops', auth_middleware_1.authenticate, salespersonController_1.getShops);
router.get('/getDistributors', auth_middleware_1.authenticate, salespersonController_1.getDistributors);
exports.shopRouter = router;
