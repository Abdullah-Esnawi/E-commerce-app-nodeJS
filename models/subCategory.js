const mongoose = require("mongoose");

const {Schema} = mongoose;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "SubCategory is Required"],
      unique: [true, "SubCategory Must Be Unique"],
      minlength: [2, "Too Short SubCategory Name"],
      maxlength: [32, "Too Long SubCategory Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: [true, "SubCategory must be belong to parent Category"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("sub-category", subCategorySchema);
