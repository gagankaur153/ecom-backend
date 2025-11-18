const mongoose = require ('mongoose')

const addressschema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId, ref:"ProductUser"},
    fullname:{type:String, required: true},
    country:{type:String, required: true},
    state:{type:String, required: true},
      city: {type:String, required: true},
      pincode : {type:Number, required: true},
     address : {type:String, required: true}
},{timestamps:true})

const Address = mongoose.model("Address", addressschema)

module.exports = Address