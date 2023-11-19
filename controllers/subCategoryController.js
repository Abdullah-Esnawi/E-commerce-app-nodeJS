/// Continue

const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategory");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const {deleteOne} = require("./factoryHandler");

// @desc    Get list of Specific SubCategories belong to Specific Category or get all subCategories depend on categoryId
// @route   GET api/v1/categories/:categoryId/sub-categories
// @access   Public
exports.getSubCategories = expressAsyncHandler(async (req, res, next) => {
  const docsCount = await SubCategory.countDocuments();
  const apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
    .filter()
    .limitingFields()
    .search([{ name: { $regex: req.query.keyword, $options: "i" } }])
    .sort()
    .paginate(docsCount);

  const { mongooseQuery, paginationResult } = apiFeatures;

  const subcategories = await mongooseQuery;
  res.status(200).json({
    results: subcategories.length,
    paginationResult,
    data: subcategories,
  });
});

// @desc    Get Specific SubCategory by ID
// @route   GET api/v1/sub-categories/:sub-categoryId
// @access   Public
exports.getSubCategoryById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const subCategory = await SubCategory.findById(id).populate(
    "parent",
    "name -_id"
  );
  console.log(subCategory);
  if (!subCategory) {
    return next(new ApiError("SubCategory not found", 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc    Create a new SubCategory
// @route   POST api/v1/categories
// @access  Private
exports.createSubCategory = expressAsyncHandler(async (req, res) => {
  // if (!req.body.categoryId) req.body.category = req.params.categoryId;

  const { name, category } = req.body;

  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    parent: category,
  });
  res.status(201).json({ data: subCategory }); // 201 status code indicates that the server has successfully processed the request, the new resource has been created and is now ready for interaction.
});

// @desc    Update Specific SubCategory by ID
// @route   PUT api/v1/sub-categories/:categoryId
// @access  Private
exports.updateSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const isSubCategoryExist = await SubCategory.findById(id);
  if (!isSubCategoryExist) {
    return next(new ApiError("SubCategory not found", 404));
  }
  const { name, category } = req.body;
  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
      parent: category,
    },

    { new: true }
  );

  console.log("Updated SubCategory: \n", updatedSubCategory);

  res.status(200).json({ data: updatedSubCategory });
});

// @desc    Delete Specific SubCategory by ID
// @route   DELETE api/v1/sub-categories/:categoryId
// @access  Private
exports.deleteSubCategory =  deleteOne(SubCategory);
