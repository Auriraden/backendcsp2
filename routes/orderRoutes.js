/* -------------------------------------------------------------------------- */
/*                          Dependencies and Modules                          */
/* -------------------------------------------------------------------------- */
const express = require('express');
const router = express.Router();

const orderController = require("../controllers/orderController");

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */
const auth = require("../auth");

// Object destructuring
const { verify, verifyAdmin } = auth;

/* -------------------------------------------------------------------------- */
/*                           Route for User Checkout                          */
/* -------------------------------------------------------------------------- */
router.post("/checkout/:id", verify, orderController.checkout);

/* -------------------------------------------------------------------------- */
/*                        Route for Getting all Orders                        */
/* -------------------------------------------------------------------------- */
router.get("/all", verify, verifyAdmin, orderController.getAllOrder);

module.exports = router;