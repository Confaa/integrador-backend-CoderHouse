import RouterBase from "./router.js";
import { getCartPage } from "../controllers/cartView.controller.js";

export default class CartViewRouter extends RouterBase {
  init() {
    this.get("/:cid", ["USER", "PREMIUM", "ADMIN"], getCartPage);
  }
}
