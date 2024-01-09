import { getProductsPage } from "../controllers/productView.controller.js";
import RouterBase from "./router.js";

export default class ProductRouterView extends RouterBase {
  init() {
    this.get("/", ["USER", "PREMIUM", "ADMIN"], getProductsPage);
  }
}
