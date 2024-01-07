import { cartService } from "../repositories/index.js";

export const getCartPage = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);

    const products = cart.products.map((product) => ({
      title: product.product.title,
      description: product.product.description,
      price: product.product.price,
      quantity: product.quantity,
    }));

    console.log(products);
    res.render("cart", {
      title: "Cart",
      products,
      total: cart.products.reduce(
        (acc, product) => acc + product.product.price * product.quantity,
        0,
      ),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
