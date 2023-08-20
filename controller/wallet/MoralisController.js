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

    if (chain !== "btc") {
      const data = await Moralis.EvmApi.balance.getNativeBalance({
        chain: chain,
        address: address,
      });

      res.status(201).json(data.toJSON().balance / 1e18);
    } else {
      res.status(201).json(0);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.TransferToken = async (req, res) => {
  try {
    const { chain, address } = req.body;
    console.log(req.body);
    // const data = await Moralis.EvmApi.({
    //   chain: chain,
    //   address: address,
    // });

    res.status(201).json(data.toJSON().balance / 1e18);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.getTransactionHistoryOfToken = async (req, res) => {
  try {
    const { chain, address } = req.body;
    const transationData =
      await Moralis.EvmApi.transaction.getWalletTransactions({
        chain: chain,
        address: address,
      });

    res.status(201).json(transationData.toJSON().result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.ChainList = async (req, res) => {
  try {
    res.status(201).json("chain list");
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
