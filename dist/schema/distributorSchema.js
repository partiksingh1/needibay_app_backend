"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Distributor Signup Schema
const zod_1 = require("zod");
const DistributorSignupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(1),
    phone: zod_1.z.string().optional(),
    distributorId: zod_1.z.string().min(1),
    panNumber: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    gstId: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
// Distributor Signin Schema
const DistributorSigninSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
