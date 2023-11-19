const express = require("express");

const router = express.Router();
const subCategoriesRoute = require("./subCategory");
const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
// const {
//   getSubCategoriesByParentIdValidator,
// } = require("../utils/validators/subCategoryValidator");

// router.post("/", categoryController.createCategory);
// router.get("/", categoryController.getCategories);
// Alias for both lines above:

router.use("/:categoryId/sub-categories", subCategoriesRoute); //this middleware for handle any request comes with this route (categories/:categoryId/sub-categories) to move it to subCategoriesRoute

// router.use("/:categoryId/sub-categories")

router
  .route("/")
  .post(createCategoryValidator, createCategory)
  .get(getCategories);

router
  .route("/:id")
  .get(getCategoryValidator, getCategoryById)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
module.exports = router;
