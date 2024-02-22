"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTripSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerTripSchema = joi_1.default.object({
    trip_name: joi_1.default.string().max(255).required(),
    image: joi_1.default.string().max(255),
    location: joi_1.default.string().max(255).required(),
    duration: joi_1.default.string().max(255).required,
    start_date: joi_1.default.date().required(),
    end_date: joi_1.default.date().required(),
    category: joi_1.default.string().max(50).required(),
    description: joi_1.default.string().max(500),
    price: joi_1.default.string().max(255).required()
});
