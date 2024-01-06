import fs from "fs";
import { generateId } from "../../utils/fakerUtil.js";

export default class Cart {
  constructor() {
    this.path = "src/dao/fs/carts.json";
  }

  add = async (products) => {
    try {
      const carts = await this.get();
      carts.push({ products, id: generateId() });
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };
  get = async () => {
    try {
      const result = await fs.promises.readFile(this.path, "utf-8");
      if (result === "") {
        return [];
      }
      return JSON.parse(result);
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (pid) => {
    try {
      const carts = await this.get();
      return carts.find((cart) => cart.id === pid);
    } catch (error) {
      console.log(error);
    }
  };
  addToCart = async (cid, pid, quantity) => {
    try {
      const carts = await this.get();
      const cart = carts.find((cart) => cart.id === cid);
      cart.push({ products: pid, quantity });
      fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };
}
