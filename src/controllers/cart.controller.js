import {
  cartService,
  productService,
  ticketService,
} from "../repositories/index.js";
import CartDTO from "../dto/cart.dto.js";
import { generateCarts } from "../utils/faker.utils.js";
import TicketDTO from "../dto/ticket.dto.js";
import ProductDTO from "../dto/product.dto.js";
import mongoose from "mongoose";
import CustomError from "../errors/custom.error.js";
import {
  generateCartIdErrorInfo,
  generateProductIdErrorInfo,
} from "../errors/info.js";
import ErrorCodes from "../errors/enums.js";
export const addCart = async (req, res) => {
  try {
    const result = await cartService.addCart(new CartDTO(req.body));
    return res.sendSuccessCreated({ cart: result });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const getCarts = async (req, res) => {
  try {
    const result = await cartService.getCarts();
    return res.sendSuccess({ carts: result });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};

export const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    if (!mongoose.isValidObjectId(cid)) {
      CustomError.createError({
        cause: generateCartIdErrorInfo(cid),
        message: "Error to get cart by ID",
        code: ErrorCodes.NOT_FOUND_ERROR,
      });
    }
    const result = await cartService.getCartById(cid);
    if (!result) res.sendNotFound({ message: "Cart not found" });
    return res.sendSuccess({ cart: result });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};

export const mockingCarts = async (req, res) => {
  try {
    await generateCarts();
    req.debug("Carts created");
    return res.sendSuccessCreated({ message: "Carts created" });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { cid, pid } = req.params;

    if (!mongoose.isValidObjectId(cid)) {
      CustomError.createError({
        cause: generateCartIdErrorInfo(cid),
        message: "Error to get cart by ID",
        code: ErrorCodes.NOT_FOUND_ERROR,
      });
    }

    if (!mongoose.isValidObjectId(pid)) {
      CustomError.createError({
        name: "Invalid ID",
        cause: generateProductIdErrorInfo(pid),
        message: "Invalid ID",
        code: ErrorCodes.INVALID_PARAM,
      });
    }

    const product = await productService.getProductById(pid);

    if (req.user.email === product.owner) {
      return res.sendUnauthorized({
        message: "Unauthorized, this is your product",
      });
    }

    const result = await cartService.addProductToCart(cid, pid, quantity ?? 1);
    return res.sendSuccessCreated({ cart: result });
  } catch (error) {
    return res.sendClientError(error);
  }
};
export const deleteProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    if (!mongoose.isValidObjectId(cid)) {
      CustomError.createError({
        cause: generateCartIdErrorInfo(cid),
        message: "Error to get cart by ID",
        code: ErrorCodes.NOT_FOUND_ERROR,
      });
    }

    if (!mongoose.isValidObjectId(pid)) {
      CustomError.createError({
        name: "Invalid ID",
        cause: generateProductIdErrorInfo(pid),
        message: "Invalid ID",
        code: ErrorCodes.INVALID_PARAM,
      });
    }
    const result = await cartService.deleteProductToCart(cid, pid);
    return res.sendSuccessCreated({ cart: result });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    if (!mongoose.isValidObjectId(cid)) {
      CustomError.createError({
        cause: generateCartIdErrorInfo(cid),
        message: "Error to get cart by ID",
        code: ErrorCodes.NOT_FOUND_ERROR,
      });
    }
    const result = await cartService.updateCart(cid, products);
    return res.sendSuccess({ cart: result });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const updateProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    if (!mongoose.isValidObjectId(cid)) {
      CustomError.createError({
        cause: generateCartIdErrorInfo(cid),
        message: "Error to get cart by ID",
        code: ErrorCodes.NOT_FOUND_ERROR,
      });
    }

    if (!mongoose.isValidObjectId(pid)) {
      CustomError.createError({
        name: "Invalid ID",
        cause: generateProductIdErrorInfo(pid),
        message: "Invalid ID",
        code: ErrorCodes.INVALID_PARAM,
      });
    }
    const result = await cartService.updateProductFromCart(cid, pid, quantity);
    return res.sendSuccess({ cart: result });
  } catch (error) {
    return res.sendClientError(error);
  }
};

export const purchaseCart = async (req, res) => {
  const { cid } = req.params;
  const { email } = req.user;
  try {
    if (!mongoose.isValidObjectId(cid)) {
      CustomError.createError({
        cause: generateCartIdErrorInfo(cid),
        message: "Error to get cart by ID",
        code: ErrorCodes.NOT_FOUND_ERROR,
      });
    }

    const cart = await cartService.getCartById(cid);
    if (!cart) {
      return res.sendNotFound({ message: "Cart not found" });
    }
    if (cart.products.length === 0) {
      return res.sendClientError({ message: "Cart is empty" });
    }
    if (cart.purchased) {
      return res.sendClientError({
        message: "Cart already purchased or whitout stock",
      });
    }
    const products = cart.products.map((item) => {
      return {
        stock: item.product.stock,
        quantity: item.quantity,
        price: item.product.price,
        _id: item.product._id,
      };
    });

    const productsAvailable = [];
    const productsNotAvailable = [];

    products.forEach(async (item) => {
      if (item.stock >= item.quantity) {
        productsAvailable.push(item);

        let product = await productService.getProductById(item._id);

        const productForUpdate = new ProductDTO({
          ...product._doc,
          stock: product.stock - item.quantity,
        });
        let result = await productService.updateProduct(
          product._id,
          productForUpdate,
        );

        if (!result) {
          return res.sendNotFound({
            message: `Product not found: ${product._id}`,
          });
        }
      } else if (item.stock < item.quantity) {
        productsNotAvailable.push(item);
      }
    });
    const amount = productsAvailable.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    const ticket = await ticketService.addTicket(new TicketDTO(amount, email));

    if (!ticket) {
      return res.sendNotFound({ message: "Ticket not found" });
    }

    const response = await cartService.purchaseCart(cid);

    if (!response) {
      return res.sendServerError({ message: "Error" });
    }
    productsAvailable.forEach(async (item) => {
      let response = await cartService.deleteProductToCart(cid, item._id);

      if (!response) {
        console.log(`Product not found: ${item._id}`);
      }
    });

    req.info(`Cart ${cid} purchased!`);
    return res.sendSuccessCreated({
      ticket,
      productsNotAvailable: productsNotAvailable.map((item) => item._id),
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
