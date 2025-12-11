import mongoose, { Schema, model } from 'mongoose'

interface ICart {
    user: mongoose.Types.ObjectId,
    item: any[],
    totalamount: number,
    totalquantity: number
}

const cartschema = new Schema<ICart>({
    user: { type: Schema.Types.ObjectId, ref: "ProductUser" },
    item: [
        {
            productid: { type: Schema.Types.ObjectId, ref: "Products" },
            price: { type: Number },
            quantity: { type: Number },
            image: { type: String }
        }
    ],
    totalamount: { type: Number },
    totalquantity: { type: Number }



})

// const Carts = mongoose.model("Carts", cartschema)
const Carts = model<ICart>("Carts", cartschema);


export default Carts