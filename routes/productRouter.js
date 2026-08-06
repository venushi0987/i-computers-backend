import express from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct, getProductById, searchProducts } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);

productRouter.get("/search/:query", searchProducts);

productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);
productRouter.get("/:id", getProductById);

export default productRouter;