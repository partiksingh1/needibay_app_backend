"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Salesperson Signup Schema
const zod_1 = require("zod");
const SalespersonSignupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(1),
    phone: zod_1.z.string().optional(),
    employeeId: zod_1.z.string().min(1),
    panNumber: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
// Salesperson Signin Schema
const SalespersonSigninSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
