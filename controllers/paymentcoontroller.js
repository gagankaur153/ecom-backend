"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allOrder = exports.userOrder = exports.verify = exports.Checkout = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const payment_1 = __importDefault(require("../models/payment"));
const razorpay = new razorpay_1.default({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});
const Checkout = async (req, res) => {
    try {
        const { amount, cartItems, userShipping, userId } = req.body;
        var options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };
        const order = await razorpay.orders.create(options);
        res.json({
            orderId: order.id,
            amount: amount,
            cartItems,
            userShipping, userId,
            payStatus: "created"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.Checkout = Checkout;
// verify payment
const verify = async (req, res) => {
    const { orderId, paymentId, signature, amount, orderItems, userId, userShipping } = req.body;
    const orderConfirm = new payment_1.default({
        orderId, paymentId, signature, amount, orderItems, userId, userShipping, payStatus: "paid"
    });
    if (!orderConfirm) {
        res.status(400).json({ status: "false", message: "your order is not confirm Teachinal error" });
    }
    await orderConfirm.save();
    res.status(200).json({ status: "true", message: " Pay Sucessfully...", data: orderConfirm });
};
exports.verify = verify;
// user order
const userOrder = async (req, res) => {
    var _a;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const orders = await payment_1.default.find({ userId: userid }).sort({ orderDate: -1 });
    if (!orders)
        return res.status(400).json({ status: "false", message: "order list is empty" });
    return res.status(200).json({ status: "true", data: orders });
};
exports.userOrder = userOrder;
// all orders for admin panel
const allOrder = async (req, res) => {
    var _a;
    const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (!role)
        return res.status(400).json({ status: "false", message: "role not found" });
    if (role === "user")
        return res.status(400).json({ status: "false", message: "you cannot see all orders" });
    const orders = await payment_1.default.find().sort({ orderDate: -1 });
    if (!orders)
        return res.status(400).json({ status: "false", message: "order list is empty" });
    return res.status(200).json({ status: "true", data: orders });
};
exports.allOrder = allOrder;
