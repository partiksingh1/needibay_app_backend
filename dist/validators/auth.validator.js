"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.createDistributorSchema = exports.createSalespersonSchema = exports.loginSchema = void 0;
// src/validators/auth.validator.ts
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email().nonempty(),
    password: zod_1.z.string().nonempty(),
});
exports.createSalespersonSchema = zod_1.z.object({
    email: zod_1.z.string().email().nonempty(),
    name: zod_1.z.string().nonempty(),
    phone: zod_1.z.string().nonempty(),
    employeeId: zod_1.z.string().nonempty(),
    panNumber: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
exports.createDistributorSchema = zod_1.z.object({
    email: zod_1.z.string().email().nonempty(),
    name: zod_1.z.string().nonempty(),
    phone: zod_1.z.string().nonempty(),
    distributorId: zod_1.z.string().nonempty(),
    panNumber: zod_1.z.string().optional(),
    gstId: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
exports.changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().nonempty(),
    newPassword: zod_1.z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    })
        .nonempty(),
});
