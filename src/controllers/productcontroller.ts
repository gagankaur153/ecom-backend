import Products from '../models/product'
import ProductUser from '../models/user'
import { Request, Response } from 'express'
import dummyProducts from '../data/dummyproducts'

const getMissingDummyProducts = async () => {
    const existingProducts = await Products.find({
        title: { $in: dummyProducts.map((product) => product.title) }
    }).select("title")
    const existingTitles = new Set(existingProducts.map((product) => product.title))

    return dummyProducts.filter((product) => !existingTitles.has(product.title))
}

const seedMissingDummyProducts = async () => {
    const productsToCreate = await getMissingDummyProducts()
    if (productsToCreate.length === 0) return []

    return Products.insertMany(productsToCreate)
}

// add Product
const addproduct = async (req: Request, res: Response) => {
    try {
        const userid = req.user?.id
        const checkuser = await ProductUser.findById(userid)
        if (checkuser?.role == "user") return res.status(400).json({ status: false, message: "you are not eligible to add book" })
        const body = req.body || {}
        if (!body.category || !body?.title || !body?.price || !body.description) return res.status(400).json({ status: false, message: "All fields are required" })
        const image = req.file ? req.file?.path : null
        const payload = new Products({
            category: body.category,
            title: body.title,
            price: body.price,
            description: body.description,
            image: image
        }
        )
        await payload.save()
        return res.status(200).json({ status: true, data: payload, message: "product added successfully" })
    }
    catch (err: any) {
        return res.status(500).json({ status: false, message: err});
    }
}

// get all products
const getallproduct = async (req: Request, res: Response) => {
    try {
        if (!req.query.search) {
            await seedMissingDummyProducts()
        }

        const search = req.query.search || ""
        let searchcreteria = {}
        if (search) {
            searchcreteria = {
                $or: [
                    { category: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } }
                ]
            }
        }
        const getallproduct = await Products.find(searchcreteria).sort({ updatedAt: -1 })
        return res.status(200).json({ status: true, data: getallproduct })

    }
    catch (err: any) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

// get single product
const getsingleproduct = async (req: Request, res: Response) => {
    try {
        const { productid } = req.params
        const getoneproduct = await Products.findById(productid)
        if (!getoneproduct) return res.status(400).json({ status: false, message: "id not ofund" })
        return res.status(200).json({ status: true, data: getoneproduct })

    }
    catch (err: any) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

// update Product
const updateproduct = async (req: Request, res: Response) => {
    try {
        const userid = req.user?.id
        const { productid } = req.params
        const checkuser = await ProductUser.findById(userid)
        if (checkuser?.role == "user") return res.status(400).json({ status: false, message: "you are not eligible to update book" })
        if (!checkuser) return res.status(400).json({ status: false, message: "user not found" })
        const body = req.body || {}
        if (!body.category || !body?.title || !body?.price || !body.description) return res.status(400).json({ status: false, message: "All fields are required" })
        const image = req.file && req.file?.path 
        const payload = {
            category: body.category,
            title: body.title,
            price: body.price,
            description: body.description,
            image: image
        }
        const update = await Products.findByIdAndUpdate(productid, payload, { new: true })
        return res.status(200).json({ status: true, data: update, message: "product update successfully" })
    }
    catch (err: any) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

// delete product
const deleteproduct = async (req: Request, res: Response) => {
    try {
        const { productid } = req.params
        const deleteproduct = await Products.findByIdAndDelete(productid)
        if (!deleteproduct) return res.status(400).json({ status: false, message: "id not ofund" })
        return res.status(200).json({ status: true, data: deleteproduct, message: "product delete successfully" })

    }
    catch (err: any) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

// add dummy products
const seedDummyProducts = async (req: Request, res: Response) => {
    try {
        const productsToCreate = await getMissingDummyProducts()

        if (productsToCreate.length === 0) {
            return res.status(200).json({ status: true, data: [], message: "dummy products already added" })
        }

        const createdProducts = await Products.insertMany(productsToCreate)
        return res.status(200).json({ status: true, data: createdProducts, message: "dummy products added successfully" })
    }
    catch (err: any) {
        return res.status(500).json({ status: false, message: err.message });
    }
}


export {
    addproduct,
    getallproduct,
    getsingleproduct,
    updateproduct,
    deleteproduct,
    seedDummyProducts
}
