import {
  getAllProducts,
  getProductById,
  addProduct,
  mockingProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js"; // Import the missing function
import { missingFields } from "../middlewares/missingFields.middleware.js";
import RouterBase from "./router.js";

export default class ProductRouter extends RouterBase {
  init() {
    this.get("/", ["USER", "PREMIUM", "ADMIN"], getAllProducts);
    this.get("/:pid", ["USER", "PREMIUM", "ADMIN"], getProductById);
    this.post("/", ["PREMIUM", "ADMIN"], missingFields, addProduct);
    this.post("/mocking", ["ADMIN"], mockingProducts);
    this.put("/:pid", ["PREMIUM", "ADMIN"], updateProduct);
    this.delete("/:pid", ["USER", "PREMIUM", "ADMIN"], deleteProduct);
  }
}
