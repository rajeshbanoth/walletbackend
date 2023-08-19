const { Wallet } = require("ethers");
const bip39 = require("bip39");
const HDKey = require('hdkey');
const { ChainsList } = require("../../functions");
const Moralis = require("moralis").default;
const ethUtil = require('ethereumjs-util');

// Generate a new mnemonic
exports.generateMnemonic = (req, res) => {
  try {
    const mnemonic = bip39.generateMnemonic();
    res.status(201).json({ mnemonic });
  } catch (error) {
    console.error("Error generating mnemonic:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyphrase = async (req, res) => {
  try {
    const { mnemonic } = req.body;
    const isValidMnemonic = bip39.validateMnemonic(mnemonic);
    if (isValidMnemonic) {
      res.status(201).json({ valid: true });
    } else {
      res.status(201).json({ valid: false });
    }
  } catch (error) {
    console.error("Error verifying mnemonic:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify a given mnemonic and create a wallet

exports.createWallet = (req, res) => {
  try {
    const { mnemonic, walletName } = req.body;

    const isValidMnemonic = bip39.validateMnemonic(mnemonic);
    if (isValidMnemonic) {
      const seed = bip39.mnemonicToSeedSync(mnemonic);

      const masterSeed = HDKey.fromMasterSeed(seed);
    
 
      if (masterSeed ) {
        const ethRoot = masterSeed.derive("m/44'/60'/0'/0");
        const ethPrivateKey = ethRoot.privateKey.toString('hex');        
        // Derive Ethereum address from private key
        const ethAddress = ethUtil.privateToAddress(Buffer.from(ethPrivateKey, 'hex')).toString('hex');
        
        const walletData = {
          walletName: walletName,
          address: ethAddress,
          privateKey: ethPrivateKey,
          mnemonic: mnemonic,
          root:masterSeed,
          seed:seed
        };
        console.log(walletData)
        res.status(201).json(walletData);
      }
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Restore a wallet using key phrases
exports.restoreWallet = (req, res) => {
  try {
    const { mnemonic, walletName } = req.body;

    const isValidMnemonic = bip39.validateMnemonic(mnemonic);
    if (isValidMnemonic) {
      const seed = bip39.mnemonicToSeedSync(mnemonic);

      const masterSeed = HDKey.fromMasterSeed(seed);
    
 
      if (masterSeed ) {
        const ethRoot = masterSeed.derive("m/44'/60'/0'/0");
        const ethPrivateKey = ethRoot.privateKey.toString('hex');        
        // Derive Ethereum address from private key
        const ethAddress = ethUtil.privateToAddress(Buffer.from(ethPrivateKey, 'hex')).toString('hex');
        
        const walletData = {
          walletName: walletName,
          address: ethAddress,
          privateKey: ethPrivateKey,
          mnemonic: mnemonic,
          root:masterSeed,
          seed:seed
        };
        console.log(walletData)
        res.status(201).json(walletData);
      }
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error("Error restoring wallet:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getChainList = async (req, res) => {
  try {
    res.status(201).json(ChainsList());
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
