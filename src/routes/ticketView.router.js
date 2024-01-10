import { getTicketPage } from "../controllers/ticketView.controller.js";
import RouterBase from "./router.js";

export default class TicketViewRouter extends RouterBase {
  init() {
    this.get("/:tid", ["USER", "PREMIUM", "ADMIN"], getTicketPage);
  }
}
