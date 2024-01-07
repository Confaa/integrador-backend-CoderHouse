import { cartService, productService } from "../repositories/index.js";
import config from "../config/env.config.js";

export const getProductsPage = async (req, res) => {
  try {
    let { limit, page, sort, query, value } = req.query;

    if (!limit) {
      limit = 10;
    }

    if (page) {
      page = parseInt(page);
    } else {
      page = 1;
    }

    const result = await productService.getProductsWithParams(
      limit,
      page,
      query,
      value,
      sort,
    );

    const cart = await cartService.addCart();
    res.render("products", {
      title: "Products",
      products: result.docs,
      prevLink: result.hasPrevPage
        ? `http://localhost:${config.PORT}/products?limit=${limit}&page=${
            result.prevPage
          }${query ? `&query=${query}&value=${value}` : ""}${
            sort ? `&sort=${sort}` : ""
          }`
        : null,
      nextLink: result.hasNextPage
        ? `http://localhost:${config.PORT}/products?limit=${limit}&page=${
            result.nextPage
          }${query ? `&query=${query}&value=${value}` : ""}${
            sort ? `&sort=${sort}` : ""
          }`
        : null,
      cartId: cart._id,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
