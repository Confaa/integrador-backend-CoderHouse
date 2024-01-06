export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  addCart = async (products) => {
    try {
      return await this.dao.add(products);
    } catch (error) {
      return error;
    }
  };
  getCarts = async () => {
    try {
      return await this.dao.get();
    } catch (error) {
      return error;
    }
  };
  getCartById = async (pid) => {
    try {
      return await this.dao.getById(pid);
    } catch (error) {
      return error;
    }
  };
  addProductToCart = async (cid, pid, quantity) => {
    try {
      return await this.dao.addToCart(cid, pid, quantity);
    } catch (error) {
      return error;
    }
  };
}
