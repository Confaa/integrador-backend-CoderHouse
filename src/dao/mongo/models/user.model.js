import mongoose from "mongoose";

const userCollection = "users";

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reference: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin", "premium"],
  },
  documents: {
    type: [documentSchema],
    default: [],
  },
  last_connection: { type: Date, default: Date.now },
});

userSchema.pre("findOne", function () {
  this.populate("cart");
});
export const userModel = mongoose.model(userCollection, userSchema);
