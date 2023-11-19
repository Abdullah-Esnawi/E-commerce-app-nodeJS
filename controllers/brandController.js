const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const Brand = require("../models/brand");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const { deleteOne } = require("./factoryHandler");

// @desc    Get list of Categories
// @route   GET api/v1/brands
// @access   Public
exports.getBrands = expressAsyncHandler(async (req, res) => {
  const docsCount = await Brand.countDocuments();
  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .filter()
    .limitingFields()
    .search([{ name: { $regex: req.query.keyword, $options: "i" } }])
    .sort()
    .paginate(docsCount);

  const { mongooseQuery, paginationResult } = apiFeatures;

  const brands = await mongooseQuery;
  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});

// @desc    Get Specific Brand by ID
// @route   GET api/v1/brands/:brandId
// @access   Public
exports.getBrandById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const brand = await Brand.findById(id);
  console.log(brand);
  if (!brand) {
    return next(new ApiError("Brand not found", 404));
  }
  res.status(200).json({ data: brand });
});

// @desc    Create a new Brand
// @route   POST api/v1/brands
// @access  Private
exports.createBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const result = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: result }); // 201 status code indicates that the server has successfully processed the request, the new resource has been created and is now ready for interaction.
  // TODO: Handle Express Error
});

// @desc    Update Specific Brand by ID
// @route   PUT api/v1/brands/:brandId
// @access  Private
exports.updateBrand = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const isBrandExist = await Brand.findById(id);
  if (!isBrandExist) {
    return next(new ApiError("Brand not found", 404));
  }
  const { name } = req.body;
  const updatedBrand = await Brand.findByIdAndUpdate(
    id,
    {
      name: name,
      slug: slugify(name),
    },
    { new: true }
  );

  console.log("Updated Brand: \n", updatedBrand);

  res.status(200).json({ data: updatedBrand });
});

// @desc    Delete Specific Brand by ID
// @route   DELETE api/v1/brands/:brandId
// @access  Private
exports.deleteBrand = deleteOne(Brand);
