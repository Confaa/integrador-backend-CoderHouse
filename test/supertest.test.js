import { expect } from "chai";
import supertest from "supertest";
import { describe, it, before } from "mocha";
import { faker } from "@faker-js/faker";
import UserDTO from "../src/dto/user.dto.js";

const expectChai = expect;
const request = supertest("http://localhost:8080");

describe("Testing Ecommerce API", () => {
  describe("Session testing", () => {
    before(function () {
      this.mockUser = new UserDTO({
        password: faker.string.uuid(),
        email: faker.internet.email(),
      });
    });
    it("The endpoint POST /api/sessions/register should register a user", async function () {
      const { statusCode } = await request
        .post("/api/sessions/register")
        .send(this.mockUser);
      expectChai(statusCode).to.be.equal(201);
    });
    it("The endpoint POST /api/sessions/login should login a user", async function () {
      const { statusCode } = await request
        .post("/api/sessions/login")
        .send(this.mockUser);
      expectChai(statusCode).to.be.equal(200);
    });
  });
});
