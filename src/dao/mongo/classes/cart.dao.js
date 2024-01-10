import { cartModel } from "../models/cart.model.js";

export class Cart {
  add = async (products) => {
    try {
      return await cartModel.create({ products });
    } catch (error) {
      console.log(error);
    }
  };
  get = async () => {
    try {
      return await cartModel.find();
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (cid) => {
    try {
      return await cartModel.findOne({ _id: cid });
    } catch (error) {
      console.log(error);
    }
  };
  addToCart = async (cid, pid, quantity) => {
    try {
      return await cartModel.updateOne(
        {
          _id: cid,
        },
        { $push: { products: { product: pid, quantity } } },
      );
    } catch (error) {
      console.log(error);
    }
  };
  deleteToCart = async (cid, pid) => {
    try {
      return await cartModel.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } },
      );
    } catch (error) {
      console.log(error);
    }
  };
  update = async (cid, products) => {
    try {
      return await cartModel.updateOne({ _id: cid }, { $set: { products } });
    } catch (error) {
      console.log(error);
    }
  };
  updateToCart = async (cid, pid, quantity) => {
    try {
      return await cartModel.updateOne(
        { _id: cid, "products.id": pid },
        { $set: { "products.$.quantity": quantity } },
      );
    } catch (error) {
      console.log(error);
    }
  };
  purchase = async (cid) => {
    try {
      return await cartModel.updateOne(
        { _id: cid },
        { $set: { purchased: true } },
      );
    } catch (error) {
      console.log(error);
    }
  };
}
