import mongoose, { Schema, model } from 'mongoose'

export interface Iproduct {
    category: string,
    title: string,
    price: number,
    description: string,
    image: string
}


const productSchema = new Schema<Iproduct>(
    {
        category: { type: String },
        title: { type: String },
        price: { type: Number },
        description: { type: String },
        image: { type: String }
    })

const Products = model<Iproduct>("Products", productSchema)

export default Products