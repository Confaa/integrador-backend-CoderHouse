import {
  getAdminUsersPage,
  getDocumentsPage,
} from "../controllers/userView.controller.js";
import RouterBase from "./router.js";

export default class UserViewRouter extends RouterBase {
  init() {
    this.get(
      "/upload-documents",
      ["USER", "PREMIUM", "ADMIN"],
      getDocumentsPage,
    );
    this.get("/admin-users", ["ADMIN"], getAdminUsersPage);
  }
}
