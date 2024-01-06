import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  mockingProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js"; // Import the missing function
import { missingFields } from "../middlewares/missingFields.middleware.js";

// Create Express router
const router = Router();

// Endpoint: GET /api/products
router.get("/", getAllProducts);
router.get("/:pid", getProductById);
router.post("/", missingFields, addProduct);
router.post("/mocking", mockingProducts);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);
// Export router

export default router;
