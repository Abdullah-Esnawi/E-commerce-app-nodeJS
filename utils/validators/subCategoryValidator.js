const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createSubCategoryValidator = [
  check("category")
    .notEmpty()
    .withMessage("Sub-Category must be belong to Category")
    .isMongoId()
    .withMessage("Invalid Parent Category ID Format"),
  check("name")
    .isLength({ max: 32, min: 3 })
    .withMessage("SubCategory name must be between 3 and 32 character")
    .notEmpty()
    .withMessage("SubCategory name is required"),
  validatorMiddleware,
];
exports.getSubCategoryByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Sub-Category Id is Required")
    .isMongoId()
    .withMessage("Invalid Sub-Category ID Format"),

  validatorMiddleware,
];

exports.getSubCategoriesByParentIdValidator = [
  check("parentId")
    .notEmpty()
    .withMessage("Parent Id is Required")
    .isMongoId()
    .withMessage("Invalid Parent Category ID Format"),

  validatorMiddleware,
];

exports.updateSubCategoryByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Sub-Category Id is Required")
    .isMongoId()
    .withMessage("Invalid Sub-Category ID Format"),
  check("category")
    .notEmpty()
    .withMessage("Sub-Category must be belong to Category")
    .isMongoId()
    .withMessage("Invalid Parent Category ID Format"),
  check("name")
    .isLength({ max: 32, min: 3 })
    .withMessage("SubCategory name must be between 3 and 32 character")
    .notEmpty()
    .withMessage("SubCategory name is required"),
  validatorMiddleware,
];

exports.deleteSubCategoryByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Sub-Category Id is Required")
    .isMongoId()
    .withMessage("Invalid Sub-Category ID Format"),

  validatorMiddleware,
];
