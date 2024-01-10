import { productService, userService } from "../repositories/index.js";
import envConfig from "../config/env.config.js";

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

    const cartUser = await userService.getUserByEmail(req.user.email);
    res.render("products", {
      title: "Products",
      products: result.docs,
      prevLink: result.hasPrevPage
        ? `${envConfig.API}/products?limit=${limit}&page=${result.prevPage}${
            query ? `&query=${query}&value=${value}` : ""
          }${sort ? `&sort=${sort}` : ""}`
        : null,
      nextLink: result.hasNextPage
        ? `${envConfig.API}/products?limit=${limit}&page=${result.nextPage}${
            query ? `&query=${query}&value=${value}` : ""
          }${sort ? `&sort=${sort}` : ""}`
        : null,
      cartId: cartUser._id,
      user: req.user,
    });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};
