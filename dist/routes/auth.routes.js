"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public Routes
router.post('/login', authController_1.login);
// Admin-only Routes
router.post('/createAdmin', auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, authController_1.createAdmin);
router.post('/create-salesperson', auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, authController_1.createSalesperson);
router.put('/create-distributor', auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, authController_1.createDistributor);
exports.authRouter = router;
