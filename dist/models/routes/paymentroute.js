"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentcoontroller_1 = require("../controllers/paymentcoontroller");
const usermiddleware_1 = require("../Middleware/usermiddleware");
const router = (0, express_1.Router)();
router.post('/checkout', paymentcoontroller_1.Checkout);
// verify and save to db
router.post("/verify-payment", paymentcoontroller_1.verify);
// user order
router.get('/userorder', usermiddleware_1.authmiddleware, paymentcoontroller_1.userOrder);
// all orders admin
router.get('/allorders', usermiddleware_1.authmiddleware, paymentcoontroller_1.allOrder);
exports.default = router;
