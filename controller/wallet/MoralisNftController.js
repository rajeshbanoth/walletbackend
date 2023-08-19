
const axios = require("axios");
const { ChainsList } = require("../../functions");

const MORALIS_API_KEY =
  "PzxwT4cgXWM5oqFylB7v5aK86is0NV54zX4rx9JRQ6E7fTmGgXQXqNAJVZ7Nx7Pa";
// const MORALIS_API_KEY =
//   "rtwrZbqyhbQzLX7taygnZaylCEu9XXa7cpEyAWrvvKJOFGNfc2d4PYTIwRH3oBsq";
    
// const MORALIS_API_KEY   ="RC38ln5O0UzcwfIYt12udn08zG2RsBz5BFsv5nleZROpAEIPbrxNx8qDYkfBurz8"

// Moralis.start({
//     apiKey: MORALIS_API_KEY,
//   });


  exports.getNFTTokens =async(req,res)=>{

    
    const headers = { accept: 'application/json', 'X-API-Key': web3ApiKey };
   
    const { contract, tokenId } = req.body;
  
    
    const allNFTData = [];

    const chains = ChainsList();


     for(var i=0;i<chains.length;i++)
     {
        const url = `https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}?chain=${chains[i].chainIdHex}`;
     }
    
    
    
    // 
    
    // try {
    //   const response = await axios.get(url, { headers });
    //   res.json(response.data);
    // } catch (error) {
    //   res.status(500).json({ error: 'An error occurred' });
    // }
  }