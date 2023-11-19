const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createCategoryValidator = [
  check("name")
    .isLength({ max: 32, min: 3 })
    .withMessage("Category must be between 3 and 32 character")
    .notEmpty()
    .withMessage("Category name is required"),
  validatorMiddleware,
];


exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID Format"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID Format"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID Format"),
  validatorMiddleware,
];
