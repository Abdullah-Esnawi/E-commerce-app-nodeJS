const express = require("express");

const router = express.Router();
const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");
const {
  createBrand,
  getCategories,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

router.route("/").post(createBrandValidator, createBrand).get(getCategories);

router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);
module.exports = router;
