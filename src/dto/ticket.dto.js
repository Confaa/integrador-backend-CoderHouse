import { generateId } from "../utils/faker.utils.js";

export default class TicketDTO {
  constructor(amount, purchaser) {
    this.code = generateId();
    this.purchase_datetime = new Date();
    this.amount = amount || 0;
    this.purchaser = purchaser || "";
  }
}
