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
exports.deleteTrip = exports.updateTrip = exports.getOneTrip = exports.getTrips = exports.createTrip = void 0;
const uuid_1 = require("uuid");
// import { User } from "../interface/user";
const sql_config_1 = require("../config/sql.config");
const mssql_1 = __importDefault(require("mssql"));
const trip_validators_1 = require("../validators/trip.validators");
const createTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { trip_name, location, duration, start_date, end_date, image, category, description, price } = req.body;
        console.log(req.body);
        let { error } = trip_validators_1.registerTripSchema.validate(req.body);
        if (error) {
            return res.status(404).json({
                error: error.details[0].message
            });
        }
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let results = (yield pool.request()
            .input("trip_id", mssql_1.default.VarChar, id)
            .input("trip_name", mssql_1.default.VarChar, trip_name)
            .input("image", mssql_1.default.VarChar, image) // Assuming empty string for image, adjust as needed
            .input("location", mssql_1.default.VarChar, location)
            .input("duration", mssql_1.default.VarChar, duration)
            .input("start_date", mssql_1.default.Date, start_date)
            .input("end_date", mssql_1.default.Date, end_date)
            .input("category", mssql_1.default.VarChar, category)
            .input("description", mssql_1.default.VarChar, description)
            .input("price", mssql_1.default.VarChar, price)
            .execute("registerTrips")).rowsAffected;
        console.log(results);
        return res.json({
            message: "Trip Created Successfully",
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.createTrip = createTrip;
const getTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let allTrips = (yield pool.request().execute("getAllTrips")).recordset;
        return res.status(200).json({
            trips: allTrips
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getTrips = getTrips;
const getOneTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let trip = (yield pool.request().input("trip_id", id).execute("getOneTrip")).recordset;
        return res.json({ trip });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getOneTrip = getOneTrip;
const updateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { trip_id, trip_name, location, duration, start_date, end_date, image, category, description, price } = req.body;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let results = (yield pool.request()
            .input("trip_id", mssql_1.default.VarChar, id)
            .input("trip_name", mssql_1.default.VarChar, trip_name)
            .input("location", mssql_1.default.VarChar, location)
            .input("image", mssql_1.default.VarChar, image)
            .input("duration", mssql_1.default.Int, duration)
            .input("start_date", mssql_1.default.Date, start_date)
            .input("end_date", mssql_1.default.Date, end_date)
            .input("category", mssql_1.default.VarChar, category)
            .input("description", mssql_1.default.VarChar, description)
            .input("price", mssql_1.default.VarChar, price)
            .execute("updateTrip")).rowsAffected;
        return res.status(200).json({
            message: "Trip Updated Successfully"
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.updateTrip = updateTrip;
const deleteTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let results = (yield pool.request().input("trip_id", mssql_1.default.VarChar, id).execute("deleteTrip")).rowsAffected;
        if (results[0] == 0) {
            return res.status(201).json({
                error: "Trip not found"
            });
        }
        else {
            return res.status(200).json({
                message: "Trip deleted successfully"
            });
        }
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.deleteTrip = deleteTrip;
