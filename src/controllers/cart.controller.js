import {
  cartService,
  productService,
  ticketService,
} from "../repositories/index.js";
import CartDTO from "../dto/cart.dto.js";
import { generateCarts } from "../utils/faker.utils.js";
import TicketDTO from "../dto/ticket.dto.js";
import ProductDTO from "../dto/product.dto.js";
export const addCart = async (req, res) => {
  try {
    const result = await cartService.addCart(new CartDTO(req.body));
    res.sendSuccessCreated({ cart: result });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const getCarts = async (req, res) => {
  try {
    const result = await cartService.getCarts();
    res.sendSuccess({ carts: result });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const result = await cartService.getCartById(cid);
    if (!result) res.sendNotFound({ message: "Cart not found" });
    res.sendSuccess({ cart: result });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const mockingCarts = async (req, res) => {
  try {
    await generateCarts();
    res.sendSuccessCreated({ message: "Carts created" });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { cid, pid } = req.params;

    const result = await cartService.addProductToCart(cid, pid, quantity ?? 1);
    res.sendSuccessCreated({ cart: result });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};
export const deleteProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = await cartService.deleteProductToCart(cid, pid);
    res.sendSuccessCreated({ cart: result });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const result = await cartService.updateCart(cid, products);
    res.sendSuccess({ cart: result });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const updateProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const result = await cartService.updateProductFromCart(cid, pid, quantity);
    res.sendSuccess({ cart: result });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const purchaseCart = async (req, res) => {
  const { cid } = req.params;
  const { email } = req.user;
  try {
    const cart = await cartService.getCartById(cid);
    if (!cart) {
      return res.sendNotFound({ message: "Cart not found" });
    }
    if (cart.products.length === 0) {
      return res.sendClientError({ message: "Cart is empty" });
    }
    if(cart.purchased){
      return res.sendClientError({ message: "Cart already purchased or whitout stock" });
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
          return res.sendNotFound({ message: `Product not found: ${product._id}` });
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

  const response=  await cartService.purchaseCart(cid);

    if (!response) {
      return res.sendServerError({ message: "Error" });
    }
    productsAvailable.forEach(async (item) => {
      let response = await cartService.deleteProductToCart(cid, item._id);

      if (!response) {
        console.log(`Product not found: ${item._id}`);
      }
    });

    return res.sendSuccessCreated({ ticket,productsNotAvailable:productsNotAvailable.map((item) => item._id) });
  } catch (error) {
    return res.sendClientError(error.message);
  }
};
