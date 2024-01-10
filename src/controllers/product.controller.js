import { productService } from "../repositories/index.js";
import ProductDTO from "../dto/product.dto.js";
import { generateProducts } from "../utils/faker.utils.js";
import envConfig from "../config/env.config.js";
export const getAllProducts = async (req, res) => {
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

    if (result.length === 0) {
      res.sendNotFound("No products found");
    }
    res.sendSuccess({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
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
    });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await productService.getProductById(pid);
    res.sendSuccess({ product: result });
  } catch (error) {
    res.sendClientError(error.message);
  }
};

export const addProduct = async (req, res) => {
  try {
    const result = await productService.addProduct(new ProductDTO(req.body));
    res.sendSuccessCreated({ product: result });
  } catch (error) {
    res.sendClientError(error.message);
  }
};

export const mockingProducts = async (req, res) => {
  try {
    await generateProducts();
    res.sendSuccessCreated({ message: "Products created" });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!pid) {
      throw new Error("Missing pid");
    }
    const result = await productService.updateProduct({ ...req.body, id: pid });
    res.sendSuccess({ product: result });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!pid) {
      throw new Error("Missing pid");
    }
    const { owner } = await productService.getProductById(pid);

    if (owner !== req.user.email && owner !== "admin") {
      return res.sendUnauthorized({ message: "Unauthorized" });
    }
    const result = await productService.deleteProduct(pid);
    return res.sendSuccess({ product: result });
  } catch (error) {
    return res.sendClientError({ message: error.message });
  }
};
