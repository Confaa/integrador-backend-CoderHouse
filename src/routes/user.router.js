import {
  changeRoleAdmin,
  changeRoleUser,
  deleteUserById,
  deleteUserInactives,
  getUsers,
  uploadDocumentsUser,
} from "../controllers/user.controller.js";
import RouterBase from "./router.js";
import { uploadFiles } from "../middlewares/uploadFiles.middleware.js";
import { verifyDocumentation } from "../middlewares/verifyDocumentation.middleware.js";
export default class UserRouter extends RouterBase {
  init() {
    this.get("/", ["ADMIN"], getUsers);
    this.delete("/", ["ADMIN"], deleteUserInactives);
    this.get(
      "/premium/:uid",
      ["USER", "PREMIUM"],
      verifyDocumentation,
      changeRoleUser,
    );
    this.post(
      "/upload-documents",
      ["USER", "PREMIUM"],
      uploadFiles,
      uploadDocumentsUser,
    );
    this.post("/change-role", ["ADMIN"], changeRoleAdmin);
    this.delete("/:uid", ["ADMIN"], deleteUserById);
  }
}
