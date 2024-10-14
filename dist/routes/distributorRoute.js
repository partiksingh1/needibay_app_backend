"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distributorRoute = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const distributorController_1 = require("../controllers/distributorController");
const router = (0, express_1.Router)();
// Protected route for creating a shop
router.get('/getOrders', auth_middleware_1.authenticate, distributorController_1.getDistributorOrders);
router.put('/orders/:orderId/status', distributorController_1.updateOrderStatus);
router.get('/orders/:orderId', distributorController_1.getOrderById);
exports.distributorRoute = router;
