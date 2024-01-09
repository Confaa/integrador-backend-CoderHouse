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
  getCartById = async (cid) => {
    try {
      return await this.dao.getById(cid);
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
  deleteProductToCart = async (cid, pid) => {
    try {
      return await this.dao.deleteToCart(cid, pid);
    } catch (error) {
      return error;
    }
  };
  updateCart = async (cid, products) => {
    try {
      return await this.dao.update(cid, products);
    } catch (error) {
      return error;
    }
  };
  updateProductFromCart = async (cid, pid, quantity) => {
    try {
      return await this.dao.updateToCart(cid, pid, quantity);
    } catch (error) {
      return error;
    }
  };
  purchaseCart = async (cid) => {
    try {
      return await this.dao.purchase(cid);
    } catch (error) {
      return error;
    }
  };
}
