const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: [true, "First Name is required."]
    },

    lastName: {
        type: String,
        required: [true, "Last Name is required."]
    },

    email: {
        type: String,
        required: [true, "email is required"]
    },

    mobileNo: {
        type: String,
        required: [true, "Mobile No. is required."]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    orders: [
        {
            productId: {
                type: String,
                required: [true, "Product ID is required."]
            },
            productName: {
                type: String,
                required: [true, "Product Name is required."]
            },
            productPrice: {
                type: Number,
                required: [true, "Product Price is required."]
            },
            boughtOn: {
                type: Date,
                default: new Date()
            },
            quantity: {
                type: Number,
                required: true,
            },
            subtotal: {
                type: Number,
                required: true,
            }
        }
    ]
});

module.exports = mongoose.model("User", userSchema);