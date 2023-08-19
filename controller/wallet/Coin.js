const ethUtil = require("ethereumjs-util");
const bitcoin = require("bitcoinjs-lib");
const solanaWeb3 = require("@solana/web3.js");
const HDKey = require("hdkey");
const bip39 = require("bip39");
const { BIP32Factory } = require("bip32");
const ecc = require("tiny-secp256k1");
const Moralis = require("moralis").default;
const bip32 = require("bip32");
const tronweb = require("tronweb");

exports.CreateAddress = async (req, res) => {
  const { chain, coin, mnemonic } = req.body;

  let address, privateKey;

  const seed = bip39.mnemonicToSeedSync(mnemonic);

  const rootVal = HDKey.fromMasterSeed(seed);

  try {
    switch (chain) {
      case "Ethereum":
        const ethDerivationPath = "m/44'/60'/0'/0";
        const ethRoot = rootVal.derive(ethDerivationPath);
        privateKey = ethRoot.privateKey.toString("hex");
        address = ethUtil
          .privateToAddress(Buffer.from(privateKey, "hex"))
          .toString("hex");
        break;

      case "Binance Smart Chain":
        const bnbDerivationPath = "m/44'/60'/0'/0"; // BSC's derivation path might be different, verify this
        const bnbRoot = rootVal.derivePath(bnbDerivationPath);
        privateKey = bnbRoot.privateKey.toString("hex");
        address = ethUtil
          .privateToAddress(Buffer.from(privateKey, "hex"))
          .toString("hex");
        break;

      case "Bsc Testnet":
        const bscDerivationPath = "m/44'/60'/0'/0"; // BIP-44 path for BSC Testnet
        const bscRoot = rootVal.derive(bscDerivationPath);
        privateKey = bscRoot.privateKey.toString("hex");
        address = ethUtil
          .privateToAddress(Buffer.from(privateKey, "hex"))
          .toString("hex");

        break;
      case "Polygon":
        const polygonDerivationPath = "m/44'/800'/0'/0"; // Derivation path for Polygon (MATIC)
        const polygonRoot = rootVal.derivePath(polygonDerivationPath);
        privateKey = polygonRoot.privateKey.toString("hex");
        address = ethUtil
          .privateToAddress(Buffer.from(privateKey, "hex"))
          .toString("hex");

        break;
      case "Avalanche":
        const avalancheDerivationPath = "m/44'/9000'/0'/0"; // Derivation path for Avalanche
        const avalancheRoot = rootVal.derivePath(avalancheDerivationPath);
        privateKey = avalancheRoot.privateKey.toString("hex");
        address = ethUtil
          .privateToAddress(Buffer.from(privateKey, "hex"))
          .toString("hex");

        break;
      case "TRON":
        const rootNode = bip32.fromSeed(seed);
        const tronDerivationPath = "m/44'/195'/0'/0/0"; // TRON
        const tronKeyPair = rootNode.derivePath(tronDerivationPath);
        privateKey = tronKeyPair.privateKey.toString("hex");
        address = tronweb.address.fromPrivateKey(privateKey);
      case "Fantom":
        const fantomDerivationPath = "m/44'/400'/0'/0"; // Derivation path for Fantom
        const fantomRoot = rootVal.derivePath(fantomDerivationPath);
        privateKey = fantomRoot.privateKey.toString("hex");
        address = ethUtil
          .privateToAddress(Buffer.from(privateKey, "hex"))
          .toString("hex");

        break;

      case "Bitcoin":
        const bip32 = BIP32Factory(ecc);
        const network = bitcoin.networks.bitcoin; // For Bitcoin mainnet

        // Derive the key pair from the seed using BitcoinJS library
        let root = bip32.fromSeed(seed, network);
        const childNode = root.derivePath("m/44'/0'/0'/0/0");
        privateKey = childNode.privateKey.toString("hex");

        // Create a Bitcoin address from the derived private key
        address = bitcoin.payments.p2pkh({
          pubkey: childNode.publicKey,
          network,
        }).address;

        break;

      case "Solana":
        const derivedSeed = seed.slice(0, 32);
        const keyPair = solanaWeb3.Keypair.fromSeed(derivedSeed);
        address = keyPair.publicKey.toBase58();
        privateKey = keyPair.secretKey.toString("hex");

        break;

      case "Cronos":
        if (coin === "Cronos") {
          // Derive the Ethereum private key and address
          const ethDerivationPath = "m/44'/60'/0'/0/0"; // Ethereum's BIP-44 derivation path
          const ethRoot = rootVal.derivePath(ethDerivationPath);
          privateKey = ethRoot.getPrivateKey();
          address = ethUtil.privateToAddress(privateKey).toString("hex");
        }
        break;
      case "Arbitrum":
        // Derive the Arbitrum node using Ethereum's derivation path
        const arbitrumDerivationPath = "m/44'/60'/0'/0/0";
        const arbitrumNode = rootVal.derivePath(arbitrumDerivationPath);
        // Derive the private key and address from the Arbitrum node
        privateKey = arbitrumNode.getPrivateKey();
        address = ethUtil.privateToAddress(privateKey).toString("hex");
        break;
      case "Goerli":
        const goerliDerivationPath = "m/44'/60'/0'/0"; // Goerli's BIP-44 derivation path
        const goerliRoot = rootVal.derive(goerliDerivationPath);
        privateKey = goerliRoot.privateKey.toString("hex");
        address = ethUtil
          .privateToAddress(Buffer.from(privateKey, "hex"))
          .toString("hex");
        break;

      case "Ropsten":
        const ropstenDerivationPath = "m/44'/1'/0'/0"; // Ropsten's BIP-44 derivation path
        const ropstenRoot = rootVal.derive(ropstenDerivationPath);
        privateKey = ropstenRoot.privateKey.toString("hex");
        address = ethUtil
          .privateToAddress(Buffer.from(privateKey, "hex"))
          .toString("hex");
        break;

      case "Mumbai":
        console.log("mub");
        const mumbaiDerivationPath = "m/44'/800'/0'/0"; // Mumbai's BIP-44 derivation path
        const mumbaiRoot = rootVal.derive(mumbaiDerivationPath);
        privateKey = mumbaiRoot.privateKey.toString("hex");
        address = ethUtil
          .privateToAddress(Buffer.from(privateKey, "hex"))
          .toString("hex");
        break;
      case "BSC Testnet":
        const bscTestnetDerivationPath = "m/44'/1'/0'/0"; // BSC Testnet's BIP-44 derivation path
        const bscTestnetRoot = rootVal.derive(bscTestnetDerivationPath);
        privateKey = bscTestnetRoot.privateKey.toString("hex");
        address = ethUtil
          .privateToAddress(Buffer.from(privateKey, "hex"))
          .toString("hex");
        break;
      default:
        res.status(400).json({ message: "Not supported coin" });
        break;
    }

    res.status(201).json({ address, privateKey });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
