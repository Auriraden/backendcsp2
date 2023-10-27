const mongoose = require("mongoose");
const User = require('../models/UserModel'); // Import the User model (adjust the path as needed)
const Product = require('../models/ProductModel'); // Import the Product model (adjust the path as needed)

const orderSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, // Reference to the User model
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product, // Reference to the Product model
                required: true,
            },
            productName: {
                type: String,
                ref: Product, // Reference to the Product model
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            subtotal: {
                type: Number,
                required: true,
            },
        },
    ],
    purchasedOn: {
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model("Order", orderSchema);