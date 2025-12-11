import mongoose, { Schema, Document } from 'mongoose'

export interface IUser {
  username: string,
  email: string,
  password: string,
  cart: mongoose.Types.ObjectId[],
  address?: mongoose.Types.ObjectId,
  role: "user" | "admin"
}
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    cart: [{ type: mongoose.Types.ObjectId, ref: "Carts" }],
    address: { type: mongoose.Types.ObjectId, ref: "Address" },
    role: { type: String, default: "user", enum: ["user", "admin"] }
  }, {
  timestamps: true
})

const ProductUser = mongoose.model<IUser>("ProductUser", userSchema)

export default ProductUser