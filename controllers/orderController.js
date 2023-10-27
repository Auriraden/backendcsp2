/* -------------------------------------------------------------------------- */
/*                          Dependencies and Modules                          */
/* -------------------------------------------------------------------------- */
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");
const bcrypt = require("bcrypt");

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */
const auth = require("../auth");

/* -------------------------------------------------------------------------- */
/*                          Order Checkout Controller                         */
/* -------------------------------------------------------------------------- */
module.exports.checkout = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.isAdmin) {
      return res.json(false);
    }

    const product = await Product.findById(req.params.id).catch((error) => {
      console.error("Error finding product:", error);
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Accessing Product Price
    const prodPrice = product.price;

    // getting the subtotal
    const subtotal = prodPrice * req.body.quantity;

    // Create a new order
    const newOrder = new Order({
      userID: req.user.id,
      products: [
        {
          productId: product.id,
          productName: product.name,
          quantity: req.body.quantity,
          subtotal: subtotal,
        },
      ],
    });

    // Save the new order
    const savedOrder = await newOrder.save();

    // Update the user's products
    const isUserUpdated = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          orders: {
            productId: product.id,
            productName: product.name,
            quantity: req.body.quantity,
            subtotal: subtotal,
          },
        },
      },
      { new: true }
    );

    if (!isUserUpdated) {
      return res.status(500).json({ message: "Error updating user" });
    }

    // Update the Product's buyers
    const isProductUpdated = await Product.findByIdAndUpdate(
      product.id,
      {
        $push: {
          buyers: { userId: req.user.id, boughtCount: req.body.quantity },
        },
      },
      { new: true }
    );

    if (!isProductUpdated) {
      return res.status(500).json({ message: "Error updating product" });
    }

    return res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                            Retrieve All Orders                          */
/* -------------------------------------------------------------------------- */

module.exports.getAllOrder = (req, res) => {
    return Order.find({}).then(result => {
        return res.send(result);
    });
}