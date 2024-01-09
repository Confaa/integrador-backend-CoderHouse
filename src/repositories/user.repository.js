export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  addUser = async (user) => {
    try {
      return await this.dao.add(user);
    } catch (error) {
      return error;
    }
  };

  getUserByEmail = async (email) => {
    try {
      return await this.dao.getByEmail(email);
    } catch (error) {
      return error;
    }
  };

  addCart = async (email, cid) => {
    try {
      return await this.dao.addCart(email, cid);
    } catch (error) {
      return error;
    }
  };
}
