import { productService } from "../dao/repositories/index.js";
import ProductDTO from "../dao/dto/product.dto.js";
import { generateProducts } from "../utils/fakerUtil.js";
export const getAllProducts = async (req, res) => {
  try {
    let { limit } = req.query;
    const result = await productService.getAllProducts();
    if (result.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    if (!limit) {
      return res.status(200).json({ products: result });
    }
    return res.status(200).json({ products: result.slice(0, limit) });
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
