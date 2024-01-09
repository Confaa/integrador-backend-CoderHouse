export default class ChatRepository {
  constructor(dao) {
    this.dao = dao;
  }
  addMessage = async (chatItem) => {
    try {
      return await this.dao.add(chatItem);
    } catch (error) {
      return error;
    }
  };
  getMessages = async () => {
    try {
      return await this.dao.get();
    } catch (error) {
      return error;
    }
  };
}
