import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import RouterBase from "./router.js";

export default class UserRouter extends RouterBase {
  init() {
    this.post("/login", ["PUBLIC"], loginUser);
    this.post("/register", ["PUBLIC"], registerUser);
    this.get("/logout", ["USER", "PREMIUM", "ADMIN"], logoutUser);
  }
}
