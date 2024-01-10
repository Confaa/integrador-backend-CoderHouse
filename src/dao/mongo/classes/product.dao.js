import { productModel } from "../models/product.model.js";

export class Product {
  get = async () => {
    try {
      return await productModel.find();
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (pid) => {
    try {
      return await productModel.findById(pid);
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
      return await productModel.create(product);
    } catch (error) {
      console.log(error);
    }
  };
  update = async (pid, product) => {
    try {
      return await productModel.updateOne({ _id: pid }, product);
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
