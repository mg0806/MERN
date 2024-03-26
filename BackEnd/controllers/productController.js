const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

//create Product --admin

exports.createProduct = catchAsyncError(async (req, res, next) => {

    // req.body.user= req.user.id;
    console.log(req.rawHeaders);
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });

});

//get all products
exports.getAllProducts = catchAsyncError( async (req, res) => {
const resultPerPage = 5;
const productCount = await Product.countDocuments();
const apiFeatures = new ApiFeatures(Product.find(), req.query)
.search()
.filter().pagination(resultPerPage);

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount,

    });

});
//get product details
exports.getProductDetails = catchAsyncError (async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    const productCount = await Product.countDocuments();

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    };

    res.status(200).json({
        success: true,
        product,
        productCount,
    });

});
//Update Product --admin

exports.updateProduct = catchAsyncError (async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    };


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });
});

// Delete Product --admin

exports.deleteProduct = catchAsyncError (async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    };


    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "product deleted "
    });
});