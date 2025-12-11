import mongoose, { Schema } from 'mongoose'
interface Iorder {
    productinfo: mongoose.Types.ObjectId,
    status?: "order placed" | "out of delivered" | "cancelled"
}

const orderSchema = new Schema<Iorder>(
    {
        productinfo: { type: Schema.Types.ObjectId, ref: "Products", required: true },
        status: { type: String, default: "order placed", enum: ["order placed", "out of delivered", "cancelled",] },


    }, {
    timestamps: true
})

const order = mongoose.model<Iorder>("Orders", orderSchema)

export default order