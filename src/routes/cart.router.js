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
    this.get("/", ["USER", "PREMIUM", "ADMIN"], getCarts);
    this.get("/:cid", ["USER", "PREMIUM", "ADMIN"], getCartById);
    this.post(
      "/:cid/product/:pid",
      ["USER", "PREMIUM", "ADMIN"],
      addProductToCart,
    );
    this.delete(
      "/:cid/product/:pid",
      ["USER", "PREMIUM", "ADMIN"],
      deleteProductToCart,
    );
    this.get("/:cid/purchase", ["USER", "PREMIUM", "ADMIN"], purchaseCart);
  }
}
