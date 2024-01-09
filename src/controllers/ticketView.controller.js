import { ticketService } from "../repositories/index.js";

export const getTicketPage = async (req, res) => {
  const { tid } = req.params;
  try {
    const { code, purchase_datetime, amount, purchaser } =
      await ticketService.getTicketById(tid);
    res.render("ticket", {
      title: "Ticket",
      code,
      purchase_datetime,
      amount,
      purchaser,
    });
  } catch (error) {
    res.sendClientError({ message: error.message });
  }
};
