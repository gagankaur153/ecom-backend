const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{type: String, required: true},
    email: {type:String, required: true},
   password: {type:String, required: true},
   cart : [{type: mongoose.Types.ObjectId, ref: "Carts"}],
   address: {type:mongoose.Types.ObjectId, ref: "Address"},
   role : {type:String, default: "user", enum:["user", "admin"]}
},{
    timestamps : true
})

const ProductUser =  mongoose.model("ProductUser", userSchema)

module.exports = ProductUser
 