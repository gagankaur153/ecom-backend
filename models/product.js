const mongoose = require ('mongoose')

const productSchema = new mongoose.Schema({
    category:{type:String},
    title: {type:String},
    price: {type:String},
    description: {type:String},
    image: {type:String}
}, {timestamps:true})

const Products = mongoose.model("Products", productSchema)

module.exports = Products