import { cartService } from "../dao/repositories/index.js";
import CartDTO from "../dao/dto/cart.dto.js";
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
  try {
    const result = await cartService.getCartById(req.params.id);
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
    const result = await cartService.addProductToCart(
      req.params.id,
      req.params.pid,
      quantity ?? 1,
    );
    res.status(201).json({ cart: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
