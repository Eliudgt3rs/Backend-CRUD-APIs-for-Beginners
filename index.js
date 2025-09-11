const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const prouductRoute = require("./routes/product.route.js");
require("dotenv").config();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/product", prouductRoute);
app.use("/api/user", require("./routes/user.route.js"));


// Connect to MongoDB and start the server
mongoose
  .connect(
    "mongodb+srv://admin:kc91ALq2rS7zwAMM@cluster0.li9fa25.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("God has answered your prayers, DB is connected");
    app.listen(1999, () => {
      console.log(
        "Mambo iko sawa and Server is running on http://localhost:1999"
      );
    });
  })
  .catch(() => {
    console.log("Try again, DB is not connected");
  });
