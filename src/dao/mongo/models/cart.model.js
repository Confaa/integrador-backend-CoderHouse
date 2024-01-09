import mongoose from "mongoose";

const cartCollection = "carts";

const itemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  products: { type: [itemsSchema], required: true },
  purchased: { type: Boolean, default: false },
});

//Populate the products field with the product data
cartSchema.pre("findOne", function () {
  this.populate("products.product");
});
export const cartModel = mongoose.model(cartCollection, cartSchema);
