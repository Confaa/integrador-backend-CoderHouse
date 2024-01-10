import {
  addCart,
  mockingCarts,
  getCartById,
  getCarts,
  addProductToCart,
  deleteProductToCart,
  purchaseCart,
} from "../controllers/cart.controller.js";
import RouterBase from "./router.js";

export default class CartRouter extends RouterBase {
  init() {
    this.post("/", ["USER", "PREMIUM", "ADMIN"], addCart);
    this.post("/mocking", ["ADMIN"], mockingCarts);
    this.get("/", ["USER"], getCarts);
    this.get("/:cid", ["USER"], getCartById);
    this.post("/:cid/product/:pid", ["USER"], addProductToCart);
    this.delete("/:cid/product/:pid", ["USER"], deleteProductToCart);
    this.get("/:cid/purchase", ["USER"], purchaseCart);
  }
}
