const mongoose = require("mongoose");

const { Schema } = mongoose;

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Brand Name is Required"],
      unique: [true, "Brand Must Be Unique"],
      minlength: [2, "Too Short Brand Name"],
      maxlength: [32, "Too Long Brand Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
