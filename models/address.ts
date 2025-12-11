import mongoose from "mongoose"
const { Schema } = mongoose

interface IAddress {
  user: mongoose.Types.ObjectId,
  fullname: string,
  country: string,
  state: string,
  city: string,
  pincode: number,
  address: string
}

const addressschema = new Schema<IAddress>({
  user: { type: Schema.Types.ObjectId, ref: "ProductUser", required: true },
  fullname: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  address: { type: String, required: true }
}, { timestamps: true })

const Address = mongoose.model<IAddress>("Address", addressschema)

export default Address