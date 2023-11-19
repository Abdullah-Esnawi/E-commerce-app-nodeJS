const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

router.route("/").post(createProductValidator, createProduct).get(getProducts);

router
  .route("/:id")
  .get(getProductValidator, getProductById)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);
module.exports = router;
