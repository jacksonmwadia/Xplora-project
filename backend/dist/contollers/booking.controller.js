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
exports.deleteBooking = exports.updateBooking = exports.getOneBooking = exports.getBookings = exports.createBooking = void 0;
const uuid_1 = require("uuid");
const sql_config_1 = require("../config/sql.config");
const mssql_1 = __importDefault(require("mssql"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { national_id, start_date, end_date, no_of_participants, trip_id, is_cancelled } = req.body;
        /*
                let { error } = registerTripSchema.validate(req.body);
        
                if (error) {
                    return res.status(404).json({
                        error: error.details[0].message
                    });
                }
         */
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let results = (yield pool.request()
            .input("booking_id", mssql_1.default.VarChar, id)
            .input("national_id", mssql_1.default.VarChar, national_id)
            .input("start_date", mssql_1.default.Date, start_date)
            .input("end_date", mssql_1.default.Date, end_date)
            .input("no_of_participants", mssql_1.default.VarChar, no_of_participants)
            .input("trip_id", mssql_1.default.VarChar, trip_id)
            .input("is_cancelled", mssql_1.default.Bit, is_cancelled)
            .execute("CreateBooking")).rowsAffected;
        return res.json({
            message: "Booking Created Successfully",
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.createBooking = createBooking;
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let allBookings = (yield pool.request().execute("GetAllBookings")).recordset;
        return res.status(200).json({
            bookings: allBookings
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getBookings = getBookings;
const getOneBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let booking = (yield pool.request().input("booking_id", id).execute("getOneBooking")).recordset;
        return res.json({ booking });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getOneBooking = getOneBooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { national_id, start_date, end_date, no_of_participants, trip_id, is_cancelled } = req.body;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let results = (yield pool.request()
            .input("booking_id", mssql_1.default.VarChar, id)
            .input("national_id", mssql_1.default.VarChar, national_id)
            .input("start_date", mssql_1.default.Date, start_date)
            .input("end_date", mssql_1.default.Date, end_date)
            .input("no_of_participants", mssql_1.default.Int, no_of_participants)
            .input("trip_id", mssql_1.default.VarChar, trip_id)
            .input("is_cancelled", mssql_1.default.Bit, is_cancelled)
            .execute("updateBooking")).rowsAffected;
        return res.status(200).json({
            message: "Booking Updated Successfully"
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let results = (yield pool.request().input("booking_id", mssql_1.default.VarChar, id).execute("deleteBooking")).rowsAffected;
        if (results[0] == 0) {
            return res.status(201).json({
                error: "Booking not found"
            });
        }
        else {
            return res.status(200).json({
                message: "Booking deleted successfully"
            });
        }
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.deleteBooking = deleteBooking;
