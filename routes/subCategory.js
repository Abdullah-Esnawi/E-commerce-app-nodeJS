const express = require("express");

// mergeParams Allows Us to access parameters on Parent Routes
const router = express.Router({ mergeParams: true });
const {
  createSubCategoryValidator,
  getSubCategoryByIdValidator,
  updateSubCategoryByIdValidator,
  deleteSubCategoryByIdValidator,
} = require("../utils/validators/subCategoryValidator");
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");
const setCategoryIdToBody = require("../middlewares/setCategoryIdToBody");

router
  .route("/")
  .post(setCategoryIdToBody ,createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryByIdValidator, getSubCategoryById)
  .put(updateSubCategoryByIdValidator, updateSubCategory)
  .delete(deleteSubCategoryByIdValidator, deleteSubCategory);
module.exports = router;
