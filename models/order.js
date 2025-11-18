const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    productinfo: {type:mongoose.Types.ObjectId, ref: "Products"},
   status: {type:String, default:"order placed", enum: ["order placed", "out of delivered", "cancelled"]},


},{
    timestamps : true
})

const order = new mongoose.model("Orders", orderSchema)

module.exports = order