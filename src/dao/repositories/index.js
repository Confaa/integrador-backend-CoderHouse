import Product from "../fs/productFS.dao.js";
import Cart from "../fs/cartFS.dao.js";
import ProductRepository from "./product.repository.js";
import CartRepository from "./cart.repository.js";

export const productService = new ProductRepository(new Product());
export const cartService = new CartRepository(new Cart());
