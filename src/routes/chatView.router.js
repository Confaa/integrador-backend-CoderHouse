import { getChatPage } from "../controllers/chatView.controller.js";
import RouterBase from "./router.js";

export default class ChatViewRouter extends RouterBase {
  init() {
    this.get("/chat", ["USER"], getChatPage);
  }
}
