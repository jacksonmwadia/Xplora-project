"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tour_controller_1 = require("../contollers/tour.controller");
const verifyToken_1 = require("../Middleware/verifyToken");
// import { verifyToken } from "../Middleware/verifyToken";
const tripRoute = (0, express_1.Router)();
tripRoute.post('/', tour_controller_1.createTrip);
tripRoute.get('/', verifyToken_1.verifyToken, tour_controller_1.getTrips);
tripRoute.put('/update/:id', verifyToken_1.verifyToken, tour_controller_1.updateTrip);
tripRoute.delete('/delete/:id', verifyToken_1.verifyToken, tour_controller_1.deleteTrip);
tripRoute.get('/:id', verifyToken_1.verifyToken, tour_controller_1.getOneTrip);
exports.default = tripRoute;