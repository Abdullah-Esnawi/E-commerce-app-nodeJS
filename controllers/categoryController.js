const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/category");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const { deleteOne } = require("./factoryHandler");

// @desc    Get list of Categories
// @route   GET api/v1/categories
// @access   Public
exports.getCategories = expressAsyncHandler(async (req, res) => {
  const docsCount = await Category.countDocuments();
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .filter()
    .limitingFields()
    .search([{ name: { $regex: req.query.keyword, $options: "i" } }])
    .sort()
    .paginate(docsCount);

  const { mongooseQuery, paginationResult } = apiFeatures;

  const categories = await mongooseQuery;
  res
    .status(200)
    .json({ results: categories.length, paginationResult, data: categories });
});

// @desc    Get Specific Category by ID
// @route   GET api/v1/categories/:categoryId
// @access   Public
exports.getCategoryById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const category = await Category.findById(id);
  console.log(category);
  if (!category) {
    return next(new ApiError("Category not found", 404));
  }
  res.status(200).json({ data: category });
});

// @desc    Create a new Category
// @route   POST api/v1/categories
// @access  Private
exports.createCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const result = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: result }); // 201 status code indicates that the server has successfully processed the request, the new resource has been created and is now ready for interaction.
  // TODO: Handle Express Error
});

// @desc    Update Specific Category by ID
// @route   PUT api/v1/categories/:categoryId
// @access  Private
exports.updateCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const isCategoryExist = await Category.findById(id);
  if (!isCategoryExist) {
    return next(new ApiError("Category not found", 404));
  }
  const { name } = req.body;
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      name: name,
      slug: slugify(name),
    },
    { new: true }
  );

  console.log("Updated Category: \n", updatedCategory);

  res.status(200).json({ data: updatedCategory });
});

// @desc    Delete Specific Category by ID
// @route   DELETE api/v1/categories/:categoryId
// @access  Private
exports.deleteCategory = deleteOne(Category);
