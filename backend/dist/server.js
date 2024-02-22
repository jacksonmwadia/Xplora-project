"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const user_router_1 = __importDefault(require("./router/user.router"));
const cors_1 = __importDefault(require("cors"));
const auth_routh_1 = __importDefault(require("./router/auth.routh"));
const tour_router_1 = __importDefault(require("./router/tour.router"));
const booking_1 = __importDefault(require("./router/booking"));
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, cors_1.default)());
app.use("/users", user_router_1.default);
app.use('/auth', auth_routh_1.default);
app.use('/trips', tour_router_1.default);
app.use('/booking', booking_1.default);
app.use((error, req, res, next) => {
    res.json({
        message: error.message
    });
});
let port = 4100;
app.listen(port, () => {
    console.log(`server listening on ${port}`);
});
