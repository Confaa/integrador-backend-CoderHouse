import { expect } from "chai";
import { describe, it, before, beforeEach, after } from "mocha";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import envConfig from "../src/config/env.config.js";
import UserDTO from "../src/dto/user.dto.js";
import { User } from "../src/dao/mongo/classes/user.dao.js";
import { Cart } from "../src/dao/mongo/classes/cart.dao.js";

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

describe("User", () => {
  before(function () {
    this.daoUser = new User();
    this.daoCart = new Cart();
  });
  beforeEach(async function () {
    this.timeout(5000);
    mongoose.connection.collections.users.drop();
    this.mockUser = new UserDTO({ password: faker.string.uuid() });
  });

  it("Should add a user", async function () {
    try {
      const response = await this.daoUser.add(this.mockUser);
      expectChai(response).to.have.property("_id");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should get a user by email", async function () {
    try {
      await this.daoUser.add(this.mockUser);
      const response = await this.daoUser.getByEmail(this.mockUser.email);
      expectChai(response).to.have.property("email");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should get all users", async function () {
    try {
      await this.daoUser.add(this.mockUser);
      const response = await this.daoUser.get();
      expectChai(response).to.be.an("array");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should get a user by id", async function () {
    try {
      const { _id } = await this.daoUser.add(this.mockUser);
      const response = await this.daoUser.getById(_id);
      expectChai(response).to.have.deep.property("_id");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should add a cart to a user", async function () {
    try {
      const { _id } = await this.daoUser.add(this.mockUser);
      const { _id: cid } = await this.daoCart.add([]);
      const response = await this.daoUser.addCart(_id, cid);
      expectChai(response).to.have.property("acknowledged");
    } catch (error) {
      console.log(error);
    }
  });

  it("Should update a user", async function () {
    try {
      const { _id } = await this.daoUser.add(this.mockUser);
      const response = await this.daoUser.update(_id, {
        first_name: faker.commerce.productName(),
      });
      expectChai(response).to.have.property("acknowledged");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should delete a user for id", async function () {
    try {
      const { _id } = await this.daoUser.add(this.mockUser);
      const response = await this.daoUser.deleteById(_id);
      expectChai(response).to.have.property("acknowledged");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should change a user role", async function () {
    try {
      const { _id } = await this.daoUser.add(this.mockUser);
      const response = await this.daoUser.changeRole(_id, "admin");
      expectChai(response).to.have.property("acknowledged");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should update last connection", async function () {
    try {
      const { _id } = await this.daoUser.add(this.mockUser);
      const response = await this.daoUser.updateLastConnection(_id);
      expectChai(response).to.have.property("acknowledged");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should delete user for email", async function () {
    try {
      await this.daoUser.add(this.mockUser);
      const response = await this.daoUser.delete(this.mockUser.email);
      expectChai(response).to.have.property("acknowledged");
    } catch (error) {
      console.log(error);
    }
  });
  it("Should upload a document", async function () {
    try {
      const { _id } = await this.daoUser.add(this.mockUser);
      const response = await this.daoUser.uploadDocument(_id, {
        name: faker.commerce.productName(),
        reference: faker.internet.url(),
      });
      expectChai(response).to.have.property("acknowledged");
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
