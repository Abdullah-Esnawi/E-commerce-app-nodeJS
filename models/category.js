const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is Required"],
      unique: [true, "Category Must Be Unique"],
      minlength: [2, "Too Short SubCategory Name"],
      maxlength: [32, "Too Long SubCategory Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
