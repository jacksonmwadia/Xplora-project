"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserDetails = exports.loginUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../config/sql.config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let user = (yield pool.request()
            .input("email", email)
            .input("password", password)
            .execute("loginUser")).recordset;
        // return res.json({user})
        console.log(user); // console.log          
        if (((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) == email) {
            const correct_pwd = yield bcrypt_1.default.compare(password, user[0].password);
            if (!correct_pwd) {
                return res.status(401).json({
                    error: "Incorrect password"
                });
            }
            const loginCredentials = user.map(response => {
                const { password, isDeleted, location } = response, rest = __rest(response, ["password", "isDeleted", "location"]);
                return rest;
            });
            const token = jsonwebtoken_1.default.sign(loginCredentials[0], process.env.SECRET, {
                expiresIn: '3600s'
            });
            return res.status(200).json({
                message: "Logged in successfully",
                token
            });
        }
    }
    catch (error) {
        return res.sendStatus(501).json({
            error: "Internal server error"
        });
    }
});
exports.loginUser = loginUser;
const checkUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({
            info: req.info
        });
    }
});
exports.checkUserDetails = checkUserDetails;
