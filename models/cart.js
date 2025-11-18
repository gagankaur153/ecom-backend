const mongoose = require ('mongoose')

const cartschema = new mongoose.Schema({
    user: {type:mongoose.Types.ObjectId, ref: "ProductUser"},
    item: [
        {
            productid: {type: mongoose.Types.ObjectId, ref: "Products"},
        price: {type:Number},
        quantity: {type: Number},
        image: {type: String}
        }
    ],
    totalamount: {type:Number},
    totalquantity: {type:Number}
   
   
    
})

// const Carts = mongoose.model("Carts", cartschema)
const Carts = mongoose.models.Carts || mongoose.model("Carts", cartschema);


module.exports = Carts