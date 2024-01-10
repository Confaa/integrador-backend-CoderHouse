import { userModel } from "../models/user.model.js";

export class User {
  add = async (user) => {
    try {
      return await userModel.create(user);
    } catch (error) {
      return error;
    }
  };
  getByEmail = async (email) => {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      return error;
    }
  };

  getById = async (uid) => {
    try {
      return await userModel.findById(uid);
    } catch (error) {
      return error;
    }
  };

  addCart = async (email, cid) => {
    try {
      return await userModel.updateOne({ email }, { $set: { cart: cid } });
    } catch (error) {
      return error;
    }
  };
  get = async () => {
    try {
      return await userModel.find();
    } catch (error) {
      return error;
    }
  };
  update = async (email, user) => {
    try {
      return await userModel.updateOne({ email }, { $set: user });
    } catch (error) {
      return error;
    }
  };
  changeRole = async (uid, role) => {
    try {
      return await userModel.updateOne({ _id: uid }, { $set: { role } });
    } catch (error) {
      return error;
    }
  };
  updateLastConnection = async (email) => {
    try {
      return await userModel.updateOne(
        { email },
        { $set: { last_connection: Date.now() } },
      );
    } catch (error) {
      return error;
    }
  };
  uploadDocument = async (email, document) => {
    try {
      return await userModel.updateOne(
        { email },
        { $push: { documents: document } },
      );
    } catch (error) {
      return error;
    }
  };
  delete = async (email) => {
    try {
      return await userModel.deleteOne({ email });
    } catch (error) {
      return error;
    }
  };
  deleteById = async (uid) => {
    try {
      return await userModel.deleteOne({ _id: uid });
    } catch (error) {
      return error;
    }
  };
}
