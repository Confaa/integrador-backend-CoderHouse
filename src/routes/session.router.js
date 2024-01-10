import {
  getUserCurrent,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/session.controller.js";
import RouterBase from "./router.js";

export default class SessionRouter extends RouterBase {
  init() {
    this.post("/login", ["PUBLIC"], loginUser);
    this.post("/register", ["PUBLIC"], registerUser);
    this.get("/logout", ["USER", "PREMIUM", "ADMIN"], logoutUser);
    this.get("/current", ["USER", "PREMIUM", "ADMIN"], getUserCurrent);
  }
}
