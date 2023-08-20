const Moralis = require("moralis").default;
require("dotenv").config();

const MORALIS_API_KEY = process.env.MORALIS_KEY

Moralis.start({
  apiKey: MORALIS_API_KEY,
});

module.exports = Moralis;
