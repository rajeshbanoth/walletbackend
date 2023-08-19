const Moralis = require("moralis").default;
const MORALIS_API_KEY =
  "PzxwT4cgXWM5oqFylB7v5aK86is0NV54zX4rx9JRQ6E7fTmGgXQXqNAJVZ7Nx7Pa";
// const MORALIS_API_KEY =
//   "rtwrZbqyhbQzLX7taygnZaylCEu9XXa7cpEyAWrvvKJOFGNfc2d4PYTIwRH3oBsq";

// const MORALIS_API_KEY   ="RC38ln5O0UzcwfIYt12udn08zG2RsBz5BFsv5nleZROpAEIPbrxNx8qDYkfBurz8"

Moralis.start({
  apiKey: MORALIS_API_KEY,
});

module.exports = Moralis;
