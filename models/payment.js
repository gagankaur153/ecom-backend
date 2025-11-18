const mongoose = require ('mongoose')

const paymentmodel = new mongoose.Schema({
    orderDate: {
        type:Date, default: Date.now
    },
    payStatus: {
        type:String
    }
}, {strict: false})

const Payment = mongoose.model("Payment", paymentmodel)
module.exports = Payment