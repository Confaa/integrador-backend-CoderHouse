import fs from "fs";
import { generateId } from "../../utils/fakerUtil.js";

export default class Product {
  constructor() {
    this.path = "src/dao/fs/products.json";
  }
  get = async () => {
    try {
      const result = await fs.promises.readFile(this.path, "utf-8");
      if (result === "") {
        return [];
      }
      return JSON.parse(result);
    } catch (error) {
      return error;
    }
  };
  getById = async (pid) => {
    try {
      const result = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(result).filter((product) => product.id === pid);
    } catch (error) {
      return error;
    }
  };
  add = async (product) => {
    try {
      const products = await this.get();
      let coincidencias = products.findIndex(
        (prod) => prod.code === product.code,
      );
      if (coincidencias !== -1) {
        throw new Error("Product already exists");
      }
      return await fs.promises.writeFile(
        this.path,
        JSON.stringify(
          [...products, { ...product, id: generateId() }],
          null,
          "\t",
        ),
      );
    } catch (error) {
      return error;
    }
  };
  update = async (product) => {
    try {
      const productById = await this.getById(product.id);
      if (productById.length === 0) {
        throw new Error("Product not found");
      }
      const products = await this.get();
      const productIndex = products.findIndex((prod) => prod.id === product.id);
      products[productIndex] = { ...products[productIndex], ...product };
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t"),
      );
    } catch (error) {
      return error;
    }
  };
  delete = async (pid) => {
    try {
      const products = await this.get();
      const productIndex = products.findIndex((prod) => prod.id === pid);
      if (productIndex === -1) {
        throw new Error("Product not found");
      }
      products.splice(productIndex, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t"),
      );
    } catch (error) {
      return error;
    }
  };
}
