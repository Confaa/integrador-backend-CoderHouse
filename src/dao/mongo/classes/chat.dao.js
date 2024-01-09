import { chatModel } from "../models/chat.model.js";

export class Chat {
  add = async (chatItem) => {
    try {
      return await chatModel.create(chatItem);
    } catch (error) {
      console.log(error);
    }
  };
  get = async () => {
    try {
      return await chatModel.find();
    } catch (error) {
      console.log(error);
    }
  };
}
