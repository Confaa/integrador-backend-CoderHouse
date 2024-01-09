export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }
  addTicket = async (ticket) => {
    try {
      return await this.dao.add(ticket);
    } catch (error) {
      return error;
    }
  };
  getTickets = async () => {
    try {
      return await this.dao.get();
    } catch (error) {
      return error;
    }
  };
  getTicketById = async (tid) => {
    try {
      return await this.dao.getById(tid);
    } catch (error) {
      return error;
    }
  };
  updateTicket = async (tid, ticket) => {
    try {
      return await this.dao.update(tid, ticket);
    } catch (error) {
      return error;
    }
  };
  deleteTicket = async (tid) => {
    try {
      return await this.dao.delete(tid);
    } catch (error) {
      return error;
    }
  };
}
