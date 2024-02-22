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
exports.deleteUser = exports.updateUser = exports.getOneUser = exports.getUsers = exports.createUser = void 0;
const uuid_1 = require("uuid");
const sql_config_1 = require("../config/sql.config");
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_validators_1 = require("../validators/user.validators");
const users = [];
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { name, email, nationalId, phoneNumber, dateOfBirth, location, gender, nationality, occupation, password } = req.body;
        const hashed_pwd = yield bcrypt_1.default.hash(password, 4);
        let { error } = user_validators_1.registerUserSchema.validate(req.body);
        if (error) {
            return res.status(404).json({
                error: error.details[0].message
            });
        }
        /*        const newUser = {user_id:id, name, email,nationalId,phoneNumber,dateOfBirth,
                 location, gender, nationality, occupation, password}; */
        // users.push(newUser);
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let results = (yield pool.request()
            .input("user_id", mssql_1.default.VarChar, id)
            .input("name", mssql_1.default.VarChar, name)
            .input("email", mssql_1.default.VarChar, email)
            .input("nationalId", mssql_1.default.VarChar, nationalId)
            .input("phoneNumber", mssql_1.default.VarChar, phoneNumber)
            .input("dateOfBirth", mssql_1.default.VarChar, dateOfBirth)
            .input("location", mssql_1.default.VarChar, location)
            .input("gender", mssql_1.default.VarChar, gender)
            .input("nationality", mssql_1.default.VarChar, nationality)
            .input("occupation", mssql_1.default.VarChar, occupation)
            .input("password", mssql_1.default.VarChar, hashed_pwd)
            .execute("registerUser")).rowsAffected;
        console.log(results);
        return res.json({ message: "Account Created Successfully",
            //  user:newUser
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*    return res.json({
               users
           }); */
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let allUsers = (yield pool.request().execute("getAllUsers")).recordset;
        return res.status(200).json({
            users: allUsers
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getUsers = getUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // /*     const singleUser = users.filter(user=>user.user_id==id) */
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let user = (yield pool.request().input("user_id", id).execute("getOneUser")).recordset;
        return res.json({ user });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getOneUser = getOneUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, email, nationalId, phoneNumber, dateOfBirth, location, gender, nationality, occupation } = req.body;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let results = (yield pool.request()
            .input("user_id", mssql_1.default.VarChar, id)
            .input("name", mssql_1.default.VarChar, name)
            .input("email", mssql_1.default.VarChar, email)
            .input("nationalId", mssql_1.default.VarChar, nationalId)
            .input("phoneNumber", mssql_1.default.VarChar, phoneNumber)
            .input("dateOfBirth", mssql_1.default.VarChar, dateOfBirth)
            .input("location", mssql_1.default.VarChar, location)
            .input("gender", mssql_1.default.VarChar, gender)
            .input("nationality", mssql_1.default.VarChar, nationality)
            .input("occupation", mssql_1.default.VarChar, occupation)
            .execute("updateUser")).rowsAffected;
        return res.status(200).json({
            message: "User Updated Successfully"
        });
        /* const updatedUser = {user_id:id, name, email,nationalId,phoneNumber,dateOfBirth,
          location, gender, nationality,occupation};

          const user_index = users.findIndex(user => user.user_id==id)

          if(user_index<0)
          {
              return res.json({message: "User not found"})
          }else {
              users[user_index] = updatedUser
              return res.json({message: "User updated",  updatedUser})
             
          } */
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let results = (yield pool.request().input("user_id", mssql_1.default.VarChar, id).execute("deleteUser")).rowsAffected;
        console.log(results[0]);
        if (results[0] == 0) {
            return res.status(201).json({
                error: "User not found"
            });
        }
        else {
            return res.status(200).json({
                message: "Account deleted successfully"
            });
        }
    }
    /*  let user_index = users.findIndex(user => user.user_id==id)

     if(user_index<0)
     {
         return res.json({message: "User not found"})
     }else {
         users.splice(user_index,1)
         return res.json({message: "User deleted successfully"})
         
     } */
    catch (error) {
        return res.json({ error });
    }
});
exports.deleteUser = deleteUser;
