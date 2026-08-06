import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {
try {
    if(isAdmin(req)){
        const product = new Product(req.body);
        await product.save();
        res.json({ message: "Product created successfully" });
    }else {
        res.status(403).json({ message: "You need to login as an admin to create a product" });
        return;
    }


}catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating product" });
    }
}

export async function getAllProducts(req, res) {
    try {
        if(isAdmin(req)){
            const products = await Product.find(); //if the user is an admin, return all products, including those that are not available
            res.json(products);
        }else {
            const products = await Product.find({isAvailable: true}); //if the user is not an admin, return only available products
            res.json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
}

export async function deleteProduct(req, res) {
    try{
        const productId = req.params.id;
        if(isAdmin(req)){

            const product = await Product.findOne({productId: productId});
            if(product == null) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            await Product.findOneAndDelete({productId: productId});
            res.json({ message: "Product deleted successfully" });

        }else {
            res.status(403).json({ message: "You need to login as an admin to delete a product" });
            return;
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product" });
    }
}

export async function updateProduct(req, res) {
    try {
        const productId = req.params.id;    
        if(isAdmin(req)){

            const product = await Product.findOne({productId: productId});
            if(product == null) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            await Product.findOneAndUpdate({productId: productId}, req.body);
            res.json({ message: "Product updated successfully" });
        }else {
            res.status(403).json({ message: "You need to login as an admin to update a product" });
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    }
}

export async function getProductById(req, res) {
    try {
        const productId = req.params.id;

        const product = await Product.findOne({productId: productId});

        if(product == null) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        if(product.isAvailable){
            res.json(product);
        } else {
            if(isAdmin(req)){
                res.json(product);
            }else {
                res.status(404).json({ message: "Product not found" });
                return;
            }
        }

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product" });
    }
}

export async function searchProducts(req, res) {

    try{

        const query = req.params.query

        // const category = req.query.category

        //if category == all

        const products = await Product.find(
            {
                $or : [
                    { name : { $regex : query , $options : "i" } },
                    { description : { $regex : query , $options : "i" } },
                    { altNames : { $elemMatch : { $regex : query , $options : "i" } } }
                ],
                // category : category === "all" ? { $exists : true } : category               
            }
        )
        res.json(products);

    }catch(error){
        console.error("Error searching products:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}