import { userModel } from "../models/user.model.js";

export class User {
  add = async (user) => {
    try {
      return await userModel.create(user);
    } catch (error) {
      console.log(error);
    }
  };
  getByEmail = async (email) => {
    try {
      const users = await userModel.findOne({ email });
      return users;
    } catch (error) {
      console.log(error);
    }
  };

  addCart = async (email, cid) => {
    try {
      return await userModel.updateOne({ email }, { $set: { cart: cid } });
    } catch (error) {
      console.log(error);
    }
  };
}
