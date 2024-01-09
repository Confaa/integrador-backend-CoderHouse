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
    this.get("/", ["USER"], getAllProducts);
    this.get("/:pid", ["USER"], getProductById);
    this.post("/", ["ADMIN"], missingFields, addProduct);
    this.post("/mocking", ["ADMIN"], mockingProducts);
    this.put("/:pid", ["ADMIN"], updateProduct);
    this.delete("/:pid", ["ADMIN"], deleteProduct);
  }
}
