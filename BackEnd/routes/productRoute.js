const express = require("express");
const bodyParser = require("body-parser");

const { getAllProducts,
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProductDetails 
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");


const router = express.Router();

router
.route("/products")
.get(isAuthenticatedUser ,authorizeRoles("admin"),getAllProducts);


router.route("/products/new").post(isAuthenticatedUser ,authorizeRoles("admin"),createProduct);


router
.route("/products/:id")
.put(isAuthenticatedUser ,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser ,authorizeRoles("admin"),deleteProduct)
.get(getProductDetails);









module.exports = router;

