import { cartService } from "../repositories/index.js";
import CartDTO from "../dto/cart.dto.js";
import { generateCarts } from "../utils/fakerUtil.js";
export const addCart = async (req, res) => {
  try {
    const result = await cartService.addCart(new CartDTO(req.body));
    res.status(201).json({ cart: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCarts = async (req, res) => {
  try {
    const result = await cartService.getCarts();
    res.status(200).json({ carts: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const result = await cartService.getCartById(cid);
    res.status(200).json({ cart: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const mockingCarts = async (req, res) => {
  try {
    await generateCarts();
    res.status(201).json({ message: "Carts created" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { cid, pid } = req.params;

    const result = await cartService.addProductToCart(cid, pid, quantity ?? 1);
    res.status(201).json({ cart: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = await cartService.deleteProductToCart(cid, pid);
    res.status(201).json({ cart: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const result = await cartService.updateCart(cid, products);
    res.status(200).json({ cart: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const result = await cartService.updateProductFromCart(cid, pid, quantity);
    res.status(201).json({ cart: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
