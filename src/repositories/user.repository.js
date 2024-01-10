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

  getUserById = async (uid) => {
    try {
      return await this.dao.getById(uid);
    } catch (error) {
      return error;
    }
  };

  addCartToUser = async (email, cid) => {
    try {
      return await this.dao.addCart(email, cid);
    } catch (error) {
      return error;
    }
  };
  getUsers = async () => {
    try {
      return await this.dao.get();
    } catch (error) {
      return error;
    }
  };
  updateUser = async (email, user) => {
    try {
      return await this.dao.update(email, user);
    } catch (error) {
      return error;
    }
  };

  changeRoleUser = async (uid, role) => {
    try {
      return await this.dao.changeRole(uid, role);
    } catch (error) {
      return error;
    }
  };
  updateLastConnectionUser = async (email) => {
    try {
      return await this.dao.updateLastConnection(email);
    } catch (error) {
      return error;
    }
  };
  uploadDocumentUser = async (email, documents) => {
    try {
      return await this.dao.uploadDocument(email, documents);
    } catch (error) {
      return error;
    }
  };
  deleteUser = async (email) => {
    try {
      return await this.dao.delete(email);
    } catch (error) {
      return error;
    }
  };
  deleteUserById = async (uid) => {
    try {
      return await this.dao.deleteById(uid);
    } catch (error) {
      return error;
    }
  }
}
