const express = require("express");
const bodyParser = require("body-parser");
const walletRoutes = require("./routes/walletRoutes");
const cors = require("cors");
import 'dotenv/config'
require('dotenv').config()

const app = express();
const port = 80; // Change this to the desired port number

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(express.json());

// Use the walletRoutes for handling wallet-related APIs
app.use("/api", walletRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
