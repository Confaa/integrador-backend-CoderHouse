import { productService } from "../repositories/index.js";
import ProductDTO from "../dto/product.dto.js";
import { generateProducts } from "../utils/fakerUtil.js";
import config from "../config/env.config.js";
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
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
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
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await productService.getProductById(pid);
    res.status(200).json({ product: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const result = await productService.addProduct(new ProductDTO(req.body));
    res.status(201).json({ product: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const mockingProducts = async (req, res) => {
  try {
    await generateProducts();
    res.status(201).json({ message: "Products created" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!pid) {
      throw new Error("Missing pid");
    }
    const result = await productService.updateProduct({ ...req.body, id: pid });
    res.status(200).json({ product: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!pid) {
      throw new Error("Missing pid");
    }
    const result = await productService.deleteProduct(pid);
    res.status(200).json({ product: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
