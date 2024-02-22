"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object({
    name: joi_1.default.string().max(255),
    email: joi_1.default.string().max(255).email(),
    nationalId: joi_1.default.string().max(255),
    phoneNumber: joi_1.default.string().max(20),
    dateOfBirth: joi_1.default.date(),
    location: joi_1.default.string().max(255),
    gender: joi_1.default.string().max(10),
    nationality: joi_1.default.string().max(255),
    occupation: joi_1.default.string().max(255),
    password: joi_1.default.string().max(255)
});
