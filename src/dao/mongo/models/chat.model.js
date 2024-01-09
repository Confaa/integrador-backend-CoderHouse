import mongoose from "mongoose";

const chatCollection = "chat";

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  message: { type: String, required: true },
});

chatSchema.pre("find", function () {
  this.populate("user");
});
export const chatModel = mongoose.model(chatCollection, chatSchema);
