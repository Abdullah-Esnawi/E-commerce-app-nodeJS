const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    // stockAmount: {
    //   type: Number,
    //   default: 1,
    // },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too long Product price"],
    },
    salePrice: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Product image is required"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "Product Category is required"],
    },
    subcategories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "sub-category",
      },
    ],
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
    },
    ratingAvg: {
      type: Number,
      min: [1, "Rating Must be greater than or equal to 1.0"],
      max: [5, "Rating Must be smaller than or equal to 5.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
