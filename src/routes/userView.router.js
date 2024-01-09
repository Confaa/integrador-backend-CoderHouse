import {
  loginPage,
  registerPage,
  getUserCurrentPage,
} from "../controllers/userView.controller.js";
import { passportCall } from "../utils/auth.utils.js";
import RouterBase from "./router.js";

export default class UserViewRouter extends RouterBase {
  init() {
    this.get("/login", ["NOAUTH"], loginPage);
    this.get("/register", ["NOAUTH"], registerPage);
    this.get("/current", ["USER"], passportCall("jwt"), getUserCurrentPage);
  }
}
