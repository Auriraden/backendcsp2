/* -------------------------------------------------------------------------- */
/*                          Dependencies and Modules                          */
/* -------------------------------------------------------------------------- */
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');
const bcrypt = require('bcrypt');

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */
const auth = require("../auth");

/* -------------------------------------------------------------------------- */
/*                        User Registration Controller                        */
/* -------------------------------------------------------------------------- */
/* 
    Steps:
        1. Create  a new user object using the mongoose model and the information from the request body
            - email
            - password
        2. Make sure that the password is encrypted
        3. Save the new User to the database
*/

module.exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, mobileNo, email, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            mobileNo: mobileNo,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        return res.json("User successfully registered.");
    } catch (error) {
        console.error(error);
        return false;
    }
};

/* -------------------------------------------------------------------------- */
/*                       User Authentication Controller                       */
/* -------------------------------------------------------------------------- */
/* 
    Steps:
        1. Check the database if the user email exists
        2. Compare the password provided in the login form with the password stored in the database. 
        3. Generate/return a JSON webtoken (access token) if the user has successfully logged in; return false if not.
*/
module.exports.loginUser = (req, res) => {
    return User.findOne({ email: req.body.email }).then(result => {
        // If User does exist
        if (result == null) {
            return res.send("No User Found.");
        }
        // If user exists
        else { //req.body.password is the password inputted by user; result.password is the password in the document that the findOne() function found.
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

            if (isPasswordCorrect) {
                res.send({
                    access: auth.createAccessToken(result)
                });
            }
            else {
                return res.send(false);
            }
        }
    });
}

/* -------------------------------------------------------------------------- */
/*                            Getting User Details                            */
/* -------------------------------------------------------------------------- */
module.exports.getUser = (req, res) => {

    return User.findById(req.user.id).then(result => {

        result.password = "";

        return res.send(result);
    })
        .catch(error => res.send(error));
}

/* -------------------------------------------------------------------------- */
/*                            Getting User Details                            */
/* -------------------------------------------------------------------------- */
module.exports.getUser = (req, res) => {

    return User.findById(req.user.id).then(result => {

        result.password = "";

        return res.send(result);
    })
        .catch(error => res.send(error));
}

/* -------------------------------------------------------------------------- */
/*                         Retrieve all Active Users                          */
/* -------------------------------------------------------------------------- */

module.exports.getAllUser = (req, res) => {
    return User.find({}).then(result => {
        return res.json(result);
    });
}

/* -------------------------------------------------------------------------- */
/*                            Making User an Admin                            */
/* -------------------------------------------------------------------------- */
module.exports.MakeAdmin = (req, res) => {
    return User.findByIdAndUpdate(req.params.userId, { isAdmin: true }).then((user, error) => {
        if (error) {
            return res.json(false);
        }
        else {
            return res.json(true);
        }
    });
}

/* -------------------------------------------------------------------------- */
/*                            Removing Admin Rights                           */
/* -------------------------------------------------------------------------- */
module.exports.NonAdmin = (req, res) => {
    return User.findByIdAndUpdate(req.params.userId, { isAdmin: false }).then((user, error) => {
        if (error) {
            return res.json(false);
        }
        else {
            return res.json(true);
        }
    });
}