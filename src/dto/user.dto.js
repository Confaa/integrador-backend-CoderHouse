import jwt from "jsonwebtoken";
import { createHash } from "../utils/crypto.utils.js";
import envConfig from "../config/env.config.js";
export default class UserDTO {
  constructor(user) {
    this.first_name = user.first_name || "first_name";
    this.last_name = user.last_name || "last_name";
    this.email = user.email || "email";
    this.age = user.age || 1;
    this.password = createHash(user.password) || "password";
    this.cart = user.cart || null;
    this.role = user.role || "admin";
    this.document = user.document || [];
    this.last_connection = user.last_connection || null;
  }

  getUserForToken = () => {
    const { first_name, last_name, email, age, role } = this;
    return { first_name, last_name, email, age, role };
  };
  getUserForTokenRecovery = () => {
    const { first_name, last_name, email } = this;
    return { email, first_name, last_name, role: "RECOVERY" };
  };
  getUserCurrent = () => {
    const { first_name, last_name, email, age, role, last_connection } = this;
    return { first_name, last_name, email, age, role, last_connection };
  };
  getJwtToken = () => {
    return jwt.sign(this.getUserForToken(), envConfig.JWT_SECRET, {
      expiresIn: envConfig.JWT_EXPIRES_IN,
    });
  };
  static verifyJwtToken = (token) => {
    return jwt.verify(token, envConfig.JWT_SECRET);
  };
}
