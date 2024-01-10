import {
  loginPage,
  registerPage,
  getUserCurrentPage,
  homePage,
} from "../controllers/sessionView.controller.js";
//import { passportCall } from "../utils/auth.utils.js";
import RouterBase from "./router.js";

export default class SessionViewRouter extends RouterBase {
  init() {
    this.get("/login", ["NOAUTH"], loginPage);
    this.get("/register", ["NOAUTH"], registerPage);
    this.get(
      "/current",
      ["USER", "PREMIUM", "ADMIN"],
      //passportCall("jwt"),
      getUserCurrentPage,
    );
    this.get("/", ["PUBLIC"], homePage);
  }
}
