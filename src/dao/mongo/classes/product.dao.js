import ProductDTO from "../../../dto/product.dto.js";
import { productModel } from "../models/product.model.js";

export class Product {
  get = async () => {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (pid) => {
    try {
      const product = await productModel.findById(pid);
      return product;
    } catch (error) {
      console.log(error);
    }
  };
  add = async (product) => {
    try {
      const exists = await productModel.findOne({ code: product.code });

      if (exists) {
        throw new Error("Product already exists");
      }

      const newProduct = await productModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  };
  update = async (product) => {
    try {
      return await productModel.updateOne(
        { _id: product.id },
        new ProductDTO(product),
      );
    } catch (error) {
      console.log(error);
    }
  };
  delete = async (pid) => {
    try {
      return await productModel.deleteOne({ _id: pid });
    } catch (error) {
      console.log(error);
    }
  };
  getWithParams = async (limit, page, query, value, sort) => {
    try {
      if (sort) {
        return await productModel.paginate(
          { [query]: value },
          { limit, page, sort },
        );
      } else {
        return await productModel.paginate(
          { [query]: value },
          { limit, page, lean: true },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
}
