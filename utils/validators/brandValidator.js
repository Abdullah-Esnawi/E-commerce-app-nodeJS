const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createBrandValidator = [
  check("name")
    .isLength({ max: 32, min: 3 })
    .withMessage("Brand must be between 3 and 32 character")
    .notEmpty()
    .withMessage("Brand name is required"),
  validatorMiddleware,
];


exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID Format"),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID Format"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID Format"),
  validatorMiddleware,
];
