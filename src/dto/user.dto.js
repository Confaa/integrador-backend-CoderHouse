import { createHash } from "../utils/crypto.utils.js";

export default class UserDTO {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.password = createHash(user.password);
    this.cart = user.cart || null;
    this.role = user.role || "user";
  }

  getUserForToken = () => {
    const { first_name, last_name, email, age, role } = this;
    return { first_name, last_name, email, age, role };
  };
  getUserCurrent = () => {
    const { first_name, last_name, email, age, role } = this;
    return { first_name, last_name, email, age, role };
  };
}
