export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAllProducts = async () => {
    try {
      return await this.dao.get();
    } catch (error) {
      return error;
    }
  };
  getProductById = async (pid) => {
    try {
      return await this.dao.getById(pid);
    } catch (error) {
      return error;
    }
  };
  addProduct = async (product) => {
    try {
      return await this.dao.add({ ...product });
    } catch (error) {
      return error;
    }
  };
  updateProduct = async (product) => {
    try {
      return await this.dao.update(product);
    } catch (error) {
      return error;
    }
  };
  deleteProduct = async (pid) => {
    try {
      return await this.dao.delete(pid);
    } catch (error) {
      return error;
    }
  };
}
