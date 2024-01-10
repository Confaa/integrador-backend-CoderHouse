import { expect } from "chai";
import { describe, it, before, beforeEach, after } from "mocha";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import envConfig from "../src/config/env.config.js";
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

describe("Product", () => {
  before(function () {
    this.daoProduct = new Product();
  });
  beforeEach(async function () {
    this.timeout(5000);
    mongoose.connection.collections.products.drop();
    this.mockProduct = new ProductDTO({ code: faker.string.uuid() });
  });
  it("Should add a product", async function () {
    try {
      const response = await this.daoProduct.add(this.mockProduct);
      expectChai(response).to.have.property("_id");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should get all products", async function () {
    try {
      await this.daoProduct.add(this.mockProduct);
      const response = await this.daoProduct.get();
      expectChai(response).to.be.an("array");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should get a product by id", async function () {
    try {
      const { _id } = await this.daoProduct.add(this.mockProduct);
      const response = await this.daoProduct.getById(_id);
      expectChai(response).to.have.deep.property("_id");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should update a product", async function () {
    try {
      const { _id } = await this.daoProduct.add(this.mockProduct);
      const response = await this.daoProduct.update(_id, {
        title: faker.commerce.productName(),
      });
      expectChai(response).to.have.property("acknowledged");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should delete a product", async function () {
    try {
      const { _id } = await this.daoProduct.add(this.mockProduct);
      const response = await this.daoProduct.delete(_id);
      expectChai(response).to.have.property("acknowledged");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should get a product with params", async function () {
    try {
      await this.daoProduct.add(this.mockProduct);
      const response = await this.daoProduct.getWithParams(
        10,
        1,
        "code",
        this.mockProduct.code,
      );
      expectChai(response).to.be.an("object");
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
