import mongoose, { Schema } from "mongoose";

const productSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  SerialNumber: {
    type: String,
  },
  ModelNumber: {
    type: String,
  },
  company: {
    type: String,
  },
  stock: {
    type: Number,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    requried: true,
    default: Date.now,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
