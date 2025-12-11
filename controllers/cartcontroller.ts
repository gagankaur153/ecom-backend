import ProductUser from "../models/user";
import Products from "../models/product";
import Carts from "../models/cart";
import { Request, Response } from 'express'


// product add to cart
const addcart = async (req: Request, res: Response) => {
    try {
        const userid = req.user?.id
        const { productid } = req.params
        //    console.log(productid)
        const finduser = await ProductUser.findById(userid)
        const product = await Products.findById(productid)
        //    console.log(findproduct?.price)
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
            await ProductUser.findByIdAndUpdate(userid, { $push: { cart: cart._id } }, { new: true })
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
            cart.totalamount = cart.item.reduce((acc: any, items: any) => acc + items.price, 0)
            cart.totalquantity = cart.item.reduce((acc: any, items: any) => acc + items.quantity, 0)
            await cart.save()
            return res.status(200).json({ status: true, data: cart, message: "item add to cart" });
        }
        cart.totalamount = cart.item.reduce((acc: any, items: any) => acc + items.price, 0)
        cart.totalquantity = cart.item.reduce((acc: any, items: any) => acc + items.quantity, 0)
        if (isNaN(cart.totalamount)) {
            throw new Error("total amount is invalid(NAN)")
        }

        await cart.save()
        return res.status(200).json({ status: true, data: cart, message: "item increase to cart" });
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
        console.log(finduser)

        if (!finduser) return res.status(400).json({ status: false, message: "id not found" })

        const checkproduct = finduser.item.find((items: any) => items.productid._id.toString() === productid)
        if (!checkproduct) return res.status(400).json({ status: "true", message: "product not match" })



        if (checkproduct.quantity > 1) {
            checkproduct.quantity -= 1
            checkproduct.price = checkproduct?.quantity * checkproduct?.productid?.price

        }
        else {
            finduser.item = finduser.item.filter((item: any) => item.productid._id.toString() !== productid)
            await ProductUser.findByIdAndUpdate(userid, { $pull: { cart: finduser._id } }, { new: true })
        }
        console.log("totalamount", finduser.totalamount)
        finduser.totalamount = finduser?.item?.reduce((acc: any, i: any) => acc + i.price, 0)
        finduser.totalquantity = finduser?.item?.reduce((acc: any, i: any) => acc + i.quantity, 0)
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

        finduser.totalamount = finduser?.item?.reduce((acc: any, i: any) => acc + i.price, 0)
        finduser.totalquantity = finduser?.item?.reduce((acc: any, i: any) => acc + i.quantity, 0)
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
        const { productid } = req.params
        const newuser = await ProductUser.findById(userid).select("cart")
        const removeproduct = await Carts.findOne({ user: userid })
        if (removeproduct) {
            removeproduct.item = await removeproduct.item.filter((details: any) => details.productid.toString() !== productid)
            // await ProductUser.findByIdAndUpdate(userid, {$pull: {cart:removeproduct._id}},{new:true})
        }
        if (!removeproduct) return res.status(400).json({ message: "product not found" })

        removeproduct.totalamount = removeproduct?.item?.reduce((acc: any, i: any) => acc + i.price, 0)
        removeproduct.totalquantity = removeproduct?.item?.reduce((acc: any, i: any) => acc + i.quantity, 0)
        await removeproduct.save()


        // const removeproduct = await ProductUser.findByIdAndUpdate(userid, {$set: {cart:[]}}, {new:true})
        // if(!removeproduct) return res.status(400).json({status:"false", message: "id not found"})
        return res.status(200).json({ sttaus: "true", message: "cart delete", data: removeproduct, newuser })
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

        const clearcart = await Carts.findOneAndUpdate({ user: userid }, { $set: { item: [], totalamount: 0, totalquantity: 0 } })
        if (!clearcart) {
            return res.status(400).json({ status: "false", message: "cart not find" })
        }
        const usercart = await ProductUser.findByIdAndUpdate(userid, { $set: { cart: [] } }, { new: true })
        if (!usercart) {
            return res.status(400).json({ status: "false", message: "user cart not find" })
        }
        return res.status(200).json({ status: "true", data: clearcart, message: "cart is empty" })
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
