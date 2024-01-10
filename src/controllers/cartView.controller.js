import mongoose from "mongoose";
import { cartService } from "../repositories/index.js";
import CustomError from "../errors/custom.error.js";
import { generateCartIdErrorInfo } from "../errors/info.js";
import ErrorCodes from "../errors/enums.js";

export const getCartPage = async (req, res) => {
  try {
    const { cid } = req.params;
    if (!mongoose.isValidObjectId(cid)) {
      CustomError.createError({
        cause: generateCartIdErrorInfo(cid),
        message: "Error to get cart by ID",
        code: ErrorCodes.NOT_FOUND_ERROR,
      });
    }

    const cart = await cartService.getCartById(cid);
    if (!cart) return res.sendNotFound({ message: "Cart not found" });
    const products = cart.products.map((product) => ({
      title: product.product.title,
      description: product.product.description,
      price: product.product.price,
      stock: product.product.stock,
      quantity: product.quantity,
    }));

    return res.render("cart", {
      title: "Cart",
      products,
      total: cart.products.reduce(
        (acc, product) => acc + product.product.price * product.quantity,
        0,
      ),
      cartId: cid,
    });
  } catch (error) {
    res.sendClientError(error);
  }
};
