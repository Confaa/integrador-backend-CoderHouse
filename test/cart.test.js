import { expect } from "chai";
import { describe, it, before, beforeEach, after } from "mocha";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import envConfig from "../src/config/env.config.js";
import { Cart } from "../src/dao/mongo/classes/cart.dao.js";
import { Product } from "../src/dao/mongo/classes/product.dao.js";
import ProductDTO from "../src/dto/product.dto.js";

before(async function () {
  try {
    const db = `mongodb+srv://${envConfig.DB_USER}:${envConfig.DB_PASS}@${envConfig.DB}`;
    await mongoose.connect(db);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
});
const expectChai = expect;

describe("Cart", () => {
  before(function () {
    this.daoCart = new Cart();
    this.daoProduct = new Product();
  });
  beforeEach(async function () {
    this.timeout(5000);
    mongoose.connection.collections.carts.drop();
    this.mockProduct = new ProductDTO({ code: faker.string.uuid() });
  });
  it("Should add a product to cart", async function () {
    try {
      const response = await this.daoCart.add([]);
      expectChai(response).to.have.property("_id");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should get all carts", async function () {
    try {
      const response = await this.daoCart.get();
      expectChai(response).to.be.an("array");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should get a cart by id", async function () {
    try {
      const { _id } = await this.daoCart.add([]);
      const response = await this.daoCart.getById(_id);
      expectChai(response).to.have.deep.property("_id");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should add a product to cart", async function () {
    try {
      const { _id } = await this.daoCart.add([]);
      const response = await this.daoCart.addToCart(
        _id,
        this.mockProduct._id,
        1,
      );
      expectChai(response).to.be.an("object");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should delete a product to cart", async function () {
    try {
      const { _id } = await this.daoCart.add([]);
      const product = await this.daoProduct.add(this.mockProduct);
      await this.daoCart.addToCart(_id, product._id, 1);
      const response = await this.daoCart.deleteToCart(_id, product._id);
      expectChai(response).to.have.property("acknowledged").to.be.true;
    } catch (error) {
      console.log(error);
    }
  });
  it("Should update a cart", async function () {
    try {
      const { _id } = await this.daoCart.add([]);
      const response = await this.daoCart.update(_id, []);
      expectChai(response).to.have.property("acknowledged").to.be.true;
    } catch (error) {
      console.log(error);
    }
  });
  it("Should update a product to cart", async function () {
    try {
      const { _id } = await this.daoCart.add([]);
      const product = await this.daoProduct.add(this.mockProduct);
      await this.daoCart.addToCart(_id, product._id, 1);
      const response = await this.daoCart.updateToCart(_id, product._id, 2);
      expectChai(response).to.have.property("acknowledged").to.be.true;
    } catch (error) {
      console.log(error);
    }
  });
  it("Should purchase a cart", async function () {
    try {
      const { _id } = await this.daoCart.add([]);
      const response = await this.daoCart.purchase(_id);

      expectChai(response).to.have.property("acknowledged").to.be.true;
    } catch (error) {
      console.log(error);
    }
  });
});
after(async function () {
  try {
    await mongoose.connection.close();
    console.log("Database disconnected");
  } catch (error) {
    console.log(error);
  }
});
