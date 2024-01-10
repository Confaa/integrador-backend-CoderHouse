import {
  changePassword,
  sendEmail,
} from "../controllers/recovery.controller.js";
import RouterBase from "./router.js";

export default class RecoveryRouter extends RouterBase {
  init() {
    this.get("/send-email", ["PUBLIC"], sendEmail);
    this.post("/change-password", ["RECOVERY"], changePassword);
  }
}
