"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Admin Signup Schema
const AdminSignupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6), // Minimum password length
    name: zod_1.z.string().min(1),
    phone: zod_1.z.string().optional(),
    adminCode: zod_1.z.string().min(1),
});
// Admin Signin Schema
const AdminSigninSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
