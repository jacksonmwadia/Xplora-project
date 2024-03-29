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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../config/sqlConfig");
const ejs_1 = __importDefault(require("ejs"));
const emailHelper_1 = require("../Helpers/emailHelper");
const welcomeUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
    const users = (yield pool.request().query('SELECT * FROM users WHERE isWelcome = 0 and isDeleted = 0')).recordset;
    console.log(users);
    for (let user of users) {
        ejs_1.default.renderFile('template/welcomeUse.ejs', { CustomerName: user.name }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let mailOptions = {
                from: "mwadiajackson@gmail.com",
                to: user.email,
                subject: "Welcome to Xplora Tours",
                html: data
            };
            try {
                yield (0, emailHelper_1.sendMail)(mailOptions);
                yield pool.request().query('UPDATE users SET isWelcome = 1 WHERE isWelcome = 0 AND isDeleted = 0');
                console.log("Emails send to new users");
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.welcomeUser = welcomeUser;
