/* -------------------------------------------------------------------------- */
/*                          Dependencies and Modules                          */
/* -------------------------------------------------------------------------- */
const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController");

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */
const auth = require("../auth");

// Object destructuring
const { verify, verifyAdmin } = auth;

/* -------------------------------------------------------------------------- */
/*                  Route for Creating a Product (Admin Only)                 */
/* -------------------------------------------------------------------------- */
router.post("/add", verify, verifyAdmin, productController.addProduct);

/* -------------------------------------------------------------------------- */
/*                      Route for Retrieving all Products                     */
/* -------------------------------------------------------------------------- */
router.get("/all", productController.getAllProducts);

/* -------------------------------------------------------------------------- */
/*                     Route for Retrieving active Products                   */
/* -------------------------------------------------------------------------- */
router.get("/all-active", productController.getAllActive);

/* -------------------------------------------------------------------------- */
/*                    Route for Retrieving a Single Product                   */
/* -------------------------------------------------------------------------- */
router.get("/:productId", productController.getProduct);

/* -------------------------------------------------------------------------- */
/*                  Route for Updating a Product (Admin Only)                 */
/* -------------------------------------------------------------------------- */
router.put("/:productId", verify, verifyAdmin, productController.updateProduct);

/* -------------------------------------------------------------------------- */
/*                 Route for Archiving a Product (Admin Only)                 */
/* -------------------------------------------------------------------------- */
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

/* -------------------------------------------------------------------------- */
/*                 Route for Activating a Product (Admin Only)                */
/* -------------------------------------------------------------------------- */
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);

// Export Route System
module.exports = router;
