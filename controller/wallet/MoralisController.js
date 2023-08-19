
const axios = require("axios");
const sharp = require("sharp");
const { getCoinList } = require("../../utils/functions");
const Moralis = require("../../config/moralisConfig");


exports.getAllTokens = async (req, res) => {
  try {
    const { address, networkData } = req.body;
    const web3ApiKey =
      "PzxwT4cgXWM5oqFylB7v5aK86is0NV54zX4rx9JRQ6E7fTmGgXQXqNAJVZ7Nx7Pa";
    const headers = { accept: "application/json", "X-API-Key": web3ApiKey };
    const allTokenData = [];

    for (const network of networkData) {
      try {
        //wallet balance

        let aa = [];
        aa.push(network.wrappedTokenAddress);

        const bal = await Moralis.EvmApi.token.getWalletTokenBalances({
          address: "0x846a0e3cbDcDeea5A56fEc8a15BC30F3b50eeE16",
          chain: network.id,
        });

        console.log(bal, "tbal");
        const balanceResponse = await axios.get(
          `https://deep-index.moralis.io/api/v2/${address}/balance?chain=${network.id}`,
          { headers }
        );
        const balance = balanceResponse.data;

        console.log(balance, "tokenbalance");

        const tokenPriceResponse = await axios.get(
          `https://deep-index.moralis.io/api/v2/erc20/${network.wrappedTokenAddress}/price?chain=${network.id}`,
          { headers }
        );

        const tokenPrice = tokenPriceResponse.data;

        console.log(toke);

        const ChainMetadata =
          await Moralis.EvmApi.token.getTokenMetadataBySymbol({
            symbols: tokenPrice.nativePrice.symbol,
          });

        console.log(tokenPrice, "token");

        let chainLogo;
        if (ChainMetadata.result.length > 0) {
          chainLogo = ChainMetadata.result[0].token.logo;
        }

        const tokenData = {
          networkName: network.name,
          // walletBalance: balance.balance / 1e18,
          tokenPrice: tokenPrice.usdPrice,
          tokenPriceSymbol: tokenPrice.nativePrice.symbol,
          tokenSymbol: tokenPrice.tokenSymbol,
          tokenName: tokenPrice.tokenName,
          tokenLogo: tokenPrice.tokenLogo,
          chainLogo,

          //   tokenLogoUrl: tokenLogoUrl,
          //   tokenDescription: tokenDescription,
          // Add more fields as needed
        };

        allTokenData.push(tokenData);
      } catch (error) {
        console.error("Error fetching data for network", network.name, error);
      }
    }

    res.status(201).json(allTokenData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error fetching token data" });
  }
};




exports.getBalance = async (req, res) => {
  try {
    const { chain, address } = req.body;
    console.log(req.body)
    const data = await Moralis.EvmApi.balance.getNativeBalance({
      chain: chain,
      address: address,
    });



  
    res.status(201).json(data.toJSON().balance/ 1e18);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
};


exports.TransferToken = async (req, res) => {
  try {
    const { chain, address } = req.body;
    console.log(req.body)
    // const data = await Moralis.EvmApi.({
    //   chain: chain,
    //   address: address,
    // });



  
    res.status(201).json(data.toJSON().balance/ 1e18);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
};

exports.getTransactionHistoryOfToken = async (req, res) => {
  try {
    const { chain, address } = req.body;
    const transationData = await Moralis.EvmApi.transaction.getWalletTransactions({
      chain: chain,
      address: address,
    });

     
    res.status(201).json(transationData.toJSON().result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.ChainList = async (req, res) => {
  const supportedChains = [
    {
      name: "Ethereum",
      chainIdHex: "0x1",
      chainIdInt: 1,
      symbol: "ETH",
    },
    {
      name: "Goerli",
      chainIdHex: "0x5",
      chainIdInt: 5,
      symbol: "GTH",
    },
    {
      name: "Sepolia",
      chainIdHex: "0xaa36a7",
      chainIdInt: 11155111,
      symbol: "SPL",
    },
    {
      name: "Polygon",
      chainIdHex: "0x89",
      chainIdInt: 137,
      symbol: "MATIC",
    },
    {
      name: "Mumbai",
      chainIdHex: "0x13881",
      chainIdInt: 80001,
      symbol: "MATIC",
    },
    {
      name: "Binance Smart Chain",
      chainIdHex: "0x38",
      chainIdInt: 56,
      symbol: "BNB",
    },
    {
      name: "BSC Testnet",
      chainIdHex: "0x61",
      chainIdInt: 97,
      symbol: "BNB",
    },
    {
      name: "Avalanche",
      chainIdHex: "0xa86a",
      chainIdInt: 43114,
      symbol: "AVAX",
    },
    {
      name: "Fantom",
      chainIdHex: "0xfa",
      chainIdInt: 250,
      symbol: "FTM",
    },
    {
      name: "Cronos",
      chainIdHex: "0x19",
      chainIdInt: 25,
      symbol: "CRO",
    },
    {
      name: "Palm",
      chainIdHex: "0x2a15c308d",
      chainIdInt: 11297108109,
      symbol: "PLM",
    },
    {
      name: "Arbitrum",
      chainIdHex: "0xa4b1",
      chainIdInt: 42161,
      symbol: "ARB",
    },
  ];

  try {
    for (const chain of supportedChains) {
      const tokenMetadata = await Moralis.EvmApi.token.getTokenMetadataBySymbol(
        {
          symbols: chain.symbol,
        }
      );

      if (tokenMetadata.length > 0) {
        const logoUrl = tokenMetadata[0].logo;
        chain.logoUrl = logoUrl;
      }
    }

    console.log(supportedChains);

    res.send(supportedChains);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCoinByPage = async (page, pageSize) => {
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const arrayData = await getCoinList();

  return arrayData.slice(startIdx, endIdx);
};

exports.getlist = async (req, res) => {
  try {
    const { page, pageSize } = req.body;
    const data = await getCoinByPage(parseInt(page), parseInt(pageSize));
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching token data" });
  }
};

exports.getImage = async (req, res) => {
  const imageUrl = decodeURIComponent(req.body.url); // The URL of the WebP image

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = response.data;

    // Convert WebP image buffer to JPEG format using Sharp
    const jpegBuffer = await sharp(imageBuffer).toFormat("jpeg").toBuffer();

    // Convert the JPEG buffer to a base64 string
    const base64Image = `data:image/jpeg;base64,${jpegBuffer.toString(
      "base64"
    )}`;
    res.send(base64Image);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.searchCoin = async (req, res) => {
  try {
    const { query } = req.query;
    const filteredCoins = coinList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
    );
    res.status(200).send(filteredCoins);
  } catch (error) {
    res.status(500).json({ error: "Error searching coins" });
  }
};
