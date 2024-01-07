import { Product } from "../dao/mongo/classes/product.dao.js";
import { Cart } from "../dao/mongo/classes/cart.dao.js";
import ProductRepository from "./product.repository.js";
import CartRepository from "./cart.repository.js";

export const productService = new ProductRepository(new Product());
export const cartService = new CartRepository(new Cart());
