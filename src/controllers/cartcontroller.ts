import ProductUser from "../models/user";
import Products from "../models/product";
import Carts from "../models/cart";
import { Request, Response } from 'express'
//recall function
const recall = ((cart: any)=> {
    cart.totalquantity = cart.item.reduce((acc: any,i: any)=> acc + i.quantity,0)
    cart.totalamount = cart.item.reduce((acc: any,i: any)=> acc + i.price,0)
})

// product add to cart
const addcart = async (req: Request, res: Response) => {
    try {
        const userid = req.user?.id
        const { productid } = req.params
        const finduser = await ProductUser.findById(userid)
        const product = await Products.findById(productid)
        if (!finduser) return res.status(400).json({ status: "false", message: "userid not found" })
        if (finduser.role == "admin") return res.status(400).json({ status: "false", message: "you are elegible to add cart because your role is admin" })
        if (!product) return res.status(400).json({ status: "false", message: "product not found" })
        //    check exist product or not
        let cart = await Carts.findOne({ user: userid })
        if (!cart) {
            cart = new Carts({
                user: userid,
                item: [
                    {
                        productid: productid,
                        price: product.price,
                        quantity: 1,
                        image: product.image
                    }
                ],
                totalamount: product.price,
                totalquantity: 1,
            })
            await cart.save()
            const itemlength = cart?.item[cart?.item?.length-1]?._id
            await ProductUser.findByIdAndUpdate(userid, { $push: { cart: itemlength} }, { new: true })
            return res.status(200).json({ status: true, data: cart, message: "item add to cart" });
        }
        const itemindex = cart.item.findIndex((itemm: any) =>
            itemm.productid.toString() === productid
        )
        if (itemindex > -1) {
            cart.item[itemindex].quantity += 1
            cart.item[itemindex].price = (product.price as number) * (cart.item[itemindex].quantity as number)
        } else {
            cart.item.push({
                productid: productid,
                price: product.price,
                quantity: 1,
                image: product.image,
            })
           recall(cart)
            await cart.save()
            const itemlength = cart?.item[cart?.item?.length-1]?._id
            console.log("itemlength", itemlength)
            await ProductUser.findByIdAndUpdate(userid, { $push: { cart: itemlength} }, { new: true })
            return res.status(200).json({ status: true, data: {cart,finduser}, message: "item add to cart" });
        }
        recall(cart)

        await cart.save()
        return res.status(200).json({ status: true, data: cart, finduser, message: "item increase to cart" });
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ status: false, message: err.message });
    }
}

// get all cart
const allcart = async (req: Request, res: Response) => {
    try {
        const userid = req.user?.id
        if (!userid) return res.status(400).json({ status: false, message: "id not found" })
        const finduser = await Carts.findOne({ user: userid }).populate("item.productid").populate("user.address")
        if (!finduser) return res.status(400).json({ status: false, message: "cart is empty" })
        return res.status(200).json({ status: true, data: finduser })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ status: false, message: err.message });
    }
}

// quantity decrease
const quantitydecrease = async (req: Request, res: Response) => {
    try {
        const userid = req.user?.id
        const { productid } = req.params
        if (!productid) return res.status(400).json({ status: false, message: "product id not found" })

        const newuser = await ProductUser.findById(userid).select("cart")
        const finduser = await Carts.findOne({ user: userid }).populate("item.productid")

        if (!finduser) return res.status(400).json({ status: false, message: "id not found" })

        const checkproduct = finduser.item.find((items: any) => items.productid._id.toString() === productid)
        if (!checkproduct) return res.status(400).json({ status: "true", message: "product not match" })



        if (checkproduct.quantity > 1) {
            checkproduct.quantity -= 1
            checkproduct.price = checkproduct?.quantity * checkproduct?.productid?.price

        }
        else {
            finduser.item = finduser.item.filter((item: any) => item.productid._id.toString() !== productid)
            await ProductUser.findByIdAndUpdate(userid, { $pull: { cart: productid} }, { new: true })
        }
        console.log("totalamount", finduser.totalamount)
        recall(finduser)
        await finduser.save()
        return res.status(200).json({ status: "true", data: finduser, newuser })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ status: false, message: err.message });
    }
}


// quantity increase
const quantityincrease = async (req: Request, res: Response) => {
    try {
        const userid = req.user?.id
        const { productid } = req.params
        if (!productid) return res.status(400).json({ status: false, message: "product id not found" })

        const finduser = await Carts.findOne({ user: userid }).populate("item.productid")

        if (!finduser) return res.status(400).json({ status: false, message: "id not found" })

        const checkproduct = finduser.item.find((items: any) => items.productid._id.toString() === productid)
        if (!checkproduct) return res.status(400).json({ status: "true", message: "product not match" })



        if (checkproduct.quantity >= 1) {
            checkproduct.quantity += 1
            checkproduct.price = checkproduct?.quantity * checkproduct?.productid?.price

        }

        recall(finduser)
        await finduser.save()
        return res.status(200).json({ status: "true", data: finduser })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ status: false, message: err.message });
    }
}

// delete per product
const deletecart = async (req: Request, res: Response) => {
    try {
        const userid = req.user?.id
        const {cartid} = req.params
        console.log( "cartid", cartid)
        const newuser = await ProductUser.findById(userid).select("cart")
        const removeproduct = await Carts.findOne({ user: userid })
        if (!removeproduct) return res.status(400).json({ message: "cart not found" })
      
         removeproduct.item =  removeproduct.item.filter((details: any) => details._id.toString() !==  cartid)
        
        recall(removeproduct)
        console.log("remove product", removeproduct)
        await ProductUser.findByIdAndUpdate(userid, {$pull: {cart: cartid}}, {new:true})
        await removeproduct.save()
        return res.status(200).json({ status: true, message: "cart delete", data: removeproduct, newuser })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ status: false, message: err.message });
    }
}

// delete all product

const updateAllProduct = async (req: Request, res: Response) => {
    try {
        const userid = req.user?.id
        const clearcart = await Carts.findOneAndUpdate({ user: userid }, { $set: { item: [], totalamount: 0, totalquantity: 0 } }, {new: true})
        if (!clearcart) {
            return res.status(400).json({ status: "false", message: "cart not find" })
        }
        const usercart = await ProductUser.findByIdAndUpdate(userid, { $set: { cart: [] } }, { new: true })
        if (!usercart) {
            return res.status(400).json({ status: "false", message: "user cart not find" })
        }
        return res.status(200).json({ status: "true", data: clearcart, data2: usercart , message : "cart is empty" })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ status: false, message: err.message });
    }
}
export {
    addcart,
    allcart,
    quantitydecrease,
    quantityincrease,
    deletecart,
    updateAllProduct
}
