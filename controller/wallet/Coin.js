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
const { default: axios } = require("axios");

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

exports.getMarketData = async (req, res) => {
  const { id, currency } = req.body;

  const uniqueWordsArray = [...new Set(id)];

  const string = uniqueWordsArray.join(",");
  
  try {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${string}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    
     const result = await axios.get(apiUrl);
    res.status(201).json(result.data)
    // res.status(201).json([
    //     {
    //       "id": "bitcoin",
    //       "symbol": "btc",
    //       "name": "Bitcoin",
    //       "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    //       "current_price": 26069,
    //       "market_cap": 507461089170,
    //       "market_cap_rank": 1,
    //       "fully_diluted_valuation": 547545851975,
    //       "total_volume": 6932477263,
    //       "high_24h": 26248,
    //       "low_24h": 25804,
    //       "price_change_24h": 222.02,
    //       "price_change_percentage_24h": 0.85898,
    //       "market_cap_change_24h": 3459966366,
    //       "market_cap_change_percentage_24h": 0.6865,
    //       "circulating_supply": 19462631,
    //       "total_supply": 21000000,
    //       "max_supply": 21000000,
    //       "ath": 69045,
    //       "ath_change_percentage": -62.23524,
    //       "ath_date": "2021-11-10T14:24:11.849Z",
    //       "atl": 67.81,
    //       "atl_change_percentage": 38353.00007,
    //       "atl_date": "2013-07-06T00:00:00.000Z",
    //       "roi": null,
    //       "last_updated": "2023-08-20T06:51:32.678Z"
    //     },
    //     {
    //       "id": "ethereum",
    //       "symbol": "eth",
    //       "name": "Ethereum",
    //       "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    //       "current_price": 1663.9,
    //       "market_cap": 200072024018,
    //       "market_cap_rank": 2,
    //       "fully_diluted_valuation": 200072024018,
    //       "total_volume": 7760639772,
    //       "high_24h": 1692.84,
    //       "low_24h": 1654.26,
    //       "price_change_24h": 7.96,
    //       "price_change_percentage_24h": 0.48048,
    //       "market_cap_change_24h": 775387188,
    //       "market_cap_change_percentage_24h": 0.38906,
    //       "circulating_supply": 120209733.114294,
    //       "total_supply": 120209733.114294,
    //       "max_supply": null,
    //       "ath": 4878.26,
    //       "ath_change_percentage": -65.89496,
    //       "ath_date": "2021-11-10T14:24:19.604Z",
    //       "atl": 0.432979,
    //       "atl_change_percentage": 384152.60812,
    //       "atl_date": "2015-10-20T00:00:00.000Z",
    //       "roi": {
    //         "times": 84.34071480302788,
    //         "currency": "btc",
    //         "percentage": 8434.071480302788
    //       },
    //       "last_updated": "2023-08-20T06:51:37.723Z"
    //     },
    //     {
    //       "id": "tether",
    //       "symbol": "usdt",
    //       "name": "Tether",
    //       "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
    //       "current_price": 0.999229,
    //       "market_cap": 82803498986,
    //       "market_cap_rank": 3,
    //       "fully_diluted_valuation": 82803498986,
    //       "total_volume": 11085655485,
    //       "high_24h": 1.002,
    //       "low_24h": 0.997107,
    //       "price_change_24h": -0.00012385735730136,
    //       "price_change_percentage_24h": -0.01239,
    //       "market_cap_change_24h": 24110131,
    //       "market_cap_change_percentage_24h": 0.02913,
    //       "circulating_supply": 82846484080.7792,
    //       "total_supply": 82846484080.7792,
    //       "max_supply": null,
    //       "ath": 1.32,
    //       "ath_change_percentage": -24.45887,
    //       "ath_date": "2018-07-24T00:00:00.000Z",
    //       "atl": 0.572521,
    //       "atl_change_percentage": 74.57546,
    //       "atl_date": "2015-03-02T00:00:00.000Z",
    //       "roi": null,
    //       "last_updated": "2023-08-20T06:50:00.473Z"
    //     },
    //     {
    //       "id": "binancecoin",
    //       "symbol": "bnb",
    //       "name": "BNB",
    //       "image": "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
    //       "current_price": 215.73,
    //       "market_cap": 33189518640,
    //       "market_cap_rank": 4,
    //       "fully_diluted_valuation": 43143570978,
    //       "total_volume": 349963547,
    //       "high_24h": 219.21,
    //       "low_24h": 214.16,
    //       "price_change_24h": 0.609777,
    //       "price_change_percentage_24h": 0.28346,
    //       "market_cap_change_24h": 46872569,
    //       "market_cap_change_percentage_24h": 0.14143,
    //       "circulating_supply": 153856150,
    //       "total_supply": 153856150,
    //       "max_supply": 200000000,
    //       "ath": 686.31,
    //       "ath_change_percentage": -68.56817,
    //       "ath_date": "2021-05-10T07:24:17.097Z",
    //       "atl": 0.0398177,
    //       "atl_change_percentage": 541666.03294,
    //       "atl_date": "2017-10-19T00:00:00.000Z",
    //       "roi": null,
    //       "last_updated": "2023-08-20T06:51:31.539Z"
    //     }
    //   ]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
