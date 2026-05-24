import express from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct, getProductById } from "../controllers/productController.js";
import { getAllStudents } from "../controllers/studentController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);

productRouter.get("/search",(req, res) => {
    res.json({ message:"Search products"});
});

productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);
productRouter.get("/:id", getProductById);

export default productRouter;