/* -------------------------------------------------------------------------- */
/*                             Set-up Dependencies                            */
/* -------------------------------------------------------------------------- */
const express = require('express');
const mongoose = require('mongoose');
/* -------------------------------------------------------------------------- */
/*                    CORS (Cross Origin Resource Sharing)                    */
/* -------------------------------------------------------------------------- */
// Allows our backend application to be available to our frontend application
const cors = require('cors');

/* -------------------------------------------------------------------------- */
/*                                Import Routes                               */
/* -------------------------------------------------------------------------- */
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

/* -------------------------------------------------------------------------- */
/*                                Server Setup                                */
/* -------------------------------------------------------------------------- */
const app = express();
const port = 4001;

/* -------------------------------------------------------------------------- */
/*                                 Middlewares                                */
/* -------------------------------------------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Allows all resources to access our backend application
app.use(cors());

/* -------------------------------------------------------------------------- */
/*            Database Connection MongoDB Atlas (Requires Internet)           */
/* -------------------------------------------------------------------------- */

mongoose.connect("connection-string", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => console.log("We're connected to the cloud database!"));

/* -------------------------------------------------------------------------- */
/*                               Backend Routes                               */
/* -------------------------------------------------------------------------- */
// To Access checkEmail Route: localhost:4000/users/checkEmail
app.use("/b1/users", userRoutes);

app.use("/b1/orders", orderRoutes);

app.use("/b1/products", productRoutes);

// Server Listening
if (require.main === module) {
    app.listen(port, () => console.log(`Server running at port ${port}`));
}

module.exports = app;