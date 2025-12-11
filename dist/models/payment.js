"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentmodel = new mongoose_1.Schema({
    orderDate: {
        type: Date, default: Date.now
    },
    payStatus: {
        type: String,
        required: true
    }
}, {
    strict: false
});
const Payment = (0, mongoose_1.model)("Payment", paymentmodel);
exports.default = Payment;
// const paymentmodel = new Schema<IPayment>({
//     orderDate: {
//         type:Date, default: Date.now, required: true
//     },
//     payStatus: {
//         type:String,
//         required: true
//     }
// },
// { timestamps: true })
// const Payment = model<IPayment>("Payment", paymentmodel)
// export default Payment
