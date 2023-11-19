const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/product");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./factoryHandler");

// @desc    Get list of Products
// @route   GET api/v1/products
// @access   Public
exports.getProducts = expressAsyncHandler(async (req, res) => {
  const docsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .filter()
    .limitingFields()
    .search([
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ])
    .sort()
    .paginate(docsCount);

  const { mongooseQuery, paginationResult } = apiFeatures;

  const products = await mongooseQuery;
  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});

// @desc    Get Specific Product by ID
// @route   GET api/v1/products/:productId
// @access   Public
exports.getProductById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findById(id);
  console.log(product);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({ data: product });
});

// @desc    Create a new Product
// @route   POST api/v1/products
// @access  Private
exports.createProduct = expressAsyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.slug);
  const result = await Product.create(req.body);
  res.status(201).json({ data: result }); // 201 status code indicates that the server has successfully processed the request, the new resource has been created and is now ready for interaction.
});

// @desc    Update Specific Product by ID
// @route   PUT api/v1/products/:productId
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete Specific Product by ID
// @route   DELETE api/v1/products/:productId
// @access  Private
exports.deleteProduct =  factory.deleteOne(Product);
