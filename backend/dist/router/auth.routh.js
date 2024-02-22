"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_contriller_1 = require("../contollers/auth.contriller");
const verifyToken_1 = require("../Middleware/verifyToken");
const auth_router = (0, express_1.Router)();
auth_router.post('/login', auth_contriller_1.loginUser);
auth_router.post('/checkdetails', verifyToken_1.verifyToken, auth_contriller_1.checkUserDetails);
exports.default = auth_router;
