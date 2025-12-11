import { Schema, model } from 'mongoose'
// const {Schema, model} = mongoose

interface IPayment {
    orderDate: string | Date,
    payStatus: string
}


const paymentmodel = new Schema<IPayment>(
    {
        orderDate: {
            type: Date, default: Date.now
        },
        payStatus: {
            type: String,
            required: true
        }
    },{
        strict: false
    })

const Payment = model<IPayment>("Payment", paymentmodel)
export default Payment
// const paymentmodel = new Schema<IPayment>({
//     orderDate: {
//         type:Date, default: Date.now, required: true
//     },
//     payStatus: {
//         type:String,
//         required: true
//     }
// },
// { timestamps: true })

// const Payment = model<IPayment>("Payment", paymentmodel)
// export default Payment