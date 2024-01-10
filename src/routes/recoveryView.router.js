import RouterBase from "./router.js";
import {
  getChangePasswordPage,
  getForgotPasswordPage,
} from "../controllers/recoveryView.controller.js";

export default class RecoveryViewRouter extends RouterBase {
  init() {
    this.get("/forgot-password", ["PUBLIC"], getForgotPasswordPage);
    this.get("/change-password/:token", ["RECOVERY"], getChangePasswordPage);
  }
}
