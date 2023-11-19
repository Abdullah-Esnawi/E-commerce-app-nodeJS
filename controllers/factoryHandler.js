const expressAsyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");

exports.deleteOne = (Model) => {
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const isDocExist = await Model.findById(id);
    if (!isDocExist) {
      return next(new ApiError("Document not found", 404));
    }

    await Model.findByIdAndDelete(id);
    res.status(204).send(); // 204 means that the server successfully processed the client's request, and that the server is not returning any content.
  });
};

exports.updateOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const updatedModel = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedModel) {
      return next(new ApiError("Document not found", 404));
    }

    console.log("Updated Document: \n", updatedModel);

    res.status(200).json({ data: updatedModel });
  });
