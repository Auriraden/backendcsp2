/* -------------------------------------------------------------------------- */
/*                          Dependencies and Modules                          */
/* -------------------------------------------------------------------------- */
const Product = require('../models/ProductModel');
const bcrypt = require('bcrypt');

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */
const auth = require("../auth");



/* -------------------------------------------------------------------------- */
/*            Controller Function for Product Creation (Admin Only)           */
/* -------------------------------------------------------------------------- */
module.exports.addProduct = (req, res) => {
    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    return newProduct.save().then((course, err) => {
        if (err) {
            return res.send(false);
        }
        else {

            return res.json("Product Created.");

        }
    }).catch(error => res.send(error));
}

/* -------------------------------------------------------------------------- */
/*                            Retrieve All Products                           */
/* -------------------------------------------------------------------------- */

module.exports.getAllProducts = (req, res) => {
    return Product.find({}).then(result => {
        return res.send(result);
    });
}

/* -------------------------------------------------------------------------- */
/*                         Retrieve all Active Products                       */
/* -------------------------------------------------------------------------- */

module.exports.getAllActive = (req, res) => {
    return Product.find({ isActive: true }).then(result => {
        return res.send(result);
    });
}

/* -------------------------------------------------------------------------- */
/*                         Retrieving a Single Product                        */
/* -------------------------------------------------------------------------- */
module.exports.getProduct = (req, res) => {
    return Product.findById(req.params.productId).then(result => {
        return res.json(result);
    });
}

/* -------------------------------------------------------------------------- */
/*                       Updating a Product (Admin Only)                      */
/* -------------------------------------------------------------------------- */
module.exports.updateProduct = (req, res) => {
    let updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }
    /* Syntax
            Model.findByIdAndUpdate(documentId, updatesToBeApplied
    */
    return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((product, error) => {
        if (error) {
            return res.send(false);
        }
        else {
            return res.send(true);
        }
    });
}

/* -------------------------------------------------------------------------- */
/*                      Archiving a Product (Admin Only)                      */
/* -------------------------------------------------------------------------- */
module.exports.archiveProduct = (req, res) => {
    return Product.findByIdAndUpdate(req.params.productId, { isActive: false }).then((course, error) => {
        if (error) {
            return res.json(false);
        }
        else {
            return res.json(true);
        }
    });
}

/* -------------------------------------------------------------------------- */
/*                      Activating a Product (Admin Only)                     */
/* -------------------------------------------------------------------------- */
module.exports.activateProduct = (req, res) => {
    return Product.findByIdAndUpdate(req.params.productId, { isActive: true }).then((course, error) => {
        if (error) {
            return res.json(false);
        }
        else {
            return res.json(true);
        }
    });
}