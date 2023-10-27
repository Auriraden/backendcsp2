/* -------------------------------------------------------------------------- */
/*                          Dependencies and Modules                          */
/* -------------------------------------------------------------------------- */
const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */
const auth = require("../auth");

// Object destructuring
const { verify, verifyAdmin } = auth;

/* -------------------------------------------------------------------------- */
/*                         Route for user Registration                        */
/* -------------------------------------------------------------------------- */
router.post("/register", userController.registerUser);

/* -------------------------------------------------------------------------- */
/*                    Route for User Authentication (Login)                   */
/* -------------------------------------------------------------------------- */
router.post("/login", userController.loginUser);

/* -------------------------------------------------------------------------- */
/*                    Route for Retrieving Details of User                    */
/* -------------------------------------------------------------------------- */
router.get("/details", verify, userController.getUser);

/* -------------------------------------------------------------------------- */
/*                            Retrieving all Users                            */
/* -------------------------------------------------------------------------- */
router.get("/all", verify, userController.getAllUser);

/* -------------------------------------------------------------------------- */
/*                            Making user an Admin                            */
/* -------------------------------------------------------------------------- */
router.put("/:userId/admin", verify, verifyAdmin, userController.MakeAdmin);

/* -------------------------------------------------------------------------- */
/*                            Removing Admin Rights                           */
/* -------------------------------------------------------------------------- */
router.put("/:userId/nonadmin", verify, verifyAdmin, userController.NonAdmin);

module.exports = router;