const express = require("express");
// const walletController = require('../controllers/walletController');
const {
  generateMnemonic,
  createWallet,
  verifyphrase,
  restoreWallet,
  getChainList,
} = require("../controller/wallet/walletController");
const {
  getAllTokens,
  getlist,
  getTransactionHistoryOfToken,
  getImage,
  getBalance,
} = require("../controller/wallet/MoralisController");
const { getNFTTokens } = require("../controller/wallet/MoralisNftController");
const { CreateAddress, getMarketData } = require("../controller/wallet/Coin");
const router = express.Router();

// Route to generate a new mnemonic
router.get("/wallet/generate-mnemonic", generateMnemonic);
router.post("/wallet/verify-mnemonic", verifyphrase);

// Route to verify a given mnemonic and create a wallet
router.post("/wallet/create-wallet", createWallet);
router.post("/wallet/restore-wallet", restoreWallet);

router.post("/wallet/token/getbalance",getBalance)
router.post("/wallet/token/gethistory",getTransactionHistoryOfToken)

router.post("/wallet/getlist", getlist);
router.get("/wallet/chainlist", getChainList);
router.post(
  "/wallet/token/get-transaction-history",
  getTransactionHistoryOfToken
);

router.post("/wallet/coin/getimage", getImage);
router.post("/wallet/token/marketdata",getMarketData)

router.post("/wallet/create/address", CreateAddress);

//nft

// router.post("/wallet/get-nftlist",getNFTTokens)

module.exports = router;
