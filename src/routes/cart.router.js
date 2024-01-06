import { Router } from "express";
import {
  addCart,
  mockingCarts,
  getCartById,
  getCarts,
  addProductToCart,
} from "../controllers/cart.controller.js";

// Create Express router
const router = Router();

router.post("/", addCart);
router.post("/mocking", mockingCarts);
router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/:cid/product/:pid", addProductToCart);

// Export router

export default router;
