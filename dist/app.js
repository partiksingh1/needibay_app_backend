"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middleware/error.middleware");
const auth_routes_1 = require("./routes/auth.routes");
const adminRoutes_1 = require("./routes/adminRoutes");
const salespersonRoute_1 = require("./routes/salespersonRoute");
const distributorRoute_1 = require("./routes/distributorRoute");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_routes_1.authRouter);
app.use('/admin', adminRoutes_1.adminRoute);
app.use('/salesperson', salespersonRoute_1.shopRouter);
app.use('/distributor', distributorRoute_1.distributorRoute);
// Error handling
app.use(error_middleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
