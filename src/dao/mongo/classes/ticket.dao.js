import { ticketModel } from "../models/ticket.model.js";

export class Ticket {
  add = async (ticket) => {
    try {
      return await ticketModel.create(ticket);
    } catch (error) {
      console.log(error);
    }
  };
  get = async () => {
    try {
      return await ticketModel.find();
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (tid) => {
    try {
      return await ticketModel.findOne({ _id: tid });
    } catch (error) {
      console.log(error);
    }
  };
  update = async (tid, ticket) => {
    try {
      return await ticketModel.updateOne({ _id: tid }, { $set: ticket });
    } catch (error) {
      console.log(error);
    }
  };
  delete = async (tid) => {
    try {
      return await ticketModel.deleteOne({ _id: tid });
    } catch (error) {
      console.log(error);
    }
  };
}
