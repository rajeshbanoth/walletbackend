exports.ChainsList =()=>{
    const supportedChains = [
        {
          name: 'Ethereum',
          chainIdHex: '0x1',
          chainIdInt: 1,
          image:"https://assets.coingecko.com/coins/images/279/large/ethereum.png"
        },
        {
          name: 'Goerli',
          chainIdHex: '0x5',
          chainIdInt: 5,
          image:'https://assets.coingecko.com/nft_contracts/images/180/small/Goerli.png'
        },
        {
          name: 'Sepolia',
          chainIdHex: '0xaa36a7',
          chainIdInt: 11155111,
          image:'https://assets.coingecko.com/nft_contracts/images/436/small/Sepolia.png' 
        },
        {
          name: 'Polygon',
          chainIdHex: '0x89',
          chainIdInt: 137,
          image:'https://assets.coingecko.com/nft_contracts/images/156/small/Polygon.png'
        },
        {
          name: 'Mumbai',
          chainIdHex: '0x13881',
          chainIdInt: 80001,
          image:'https://assets.coingecko.com/nft_contracts/images/480/small/Mumbai.png'
        },
        {
          name: 'Binance Smart Chain',
          chainIdHex: '0x38',
          chainIdInt: 56,
          image:"https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png"
        },
        {
          name: 'BSC Testnet',
          chainIdHex: '0x61',
          chainIdInt: 97,
          image:"https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png"
        },
        {
          name: 'Avalanche',
          chainIdHex: '0xa86a',
          chainIdInt: 43114,
          image:'https://assets.coingecko.com/coins/images/12559/large/avax.png'
        },
        {
          name: 'Fantom',
          chainIdHex: '0xfa',
          chainIdInt: 250,
          image: 'https://assets.coingecko.com/coins/images/4001/large/Fantom.png' 
        },
        {
          name: 'Cronos',
          chainIdHex: '0x19',
          chainIdInt: 25,
          image:'https://assets.coingecko.com/coins/images/11810/large/cronos.png'
        },
        {
          name: 'Palm',
          chainIdHex: '0x2a15c308d',
          chainIdInt: 11297108109,
          image:'https://assets.coingecko.com/coins/images/11645/large/palm.png'
        },
        {
          name: 'Arbitrum',
          chainIdHex: '0xa4b1',
          chainIdInt: 42161,
          image:'https://assets.coingecko.com/coins/images/16605/large/arbitrum.png'
        },
        {
          name: 'Bitcoin',
          chainIdHex: 'btc',
          chainIdInt: null,
          image:"https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        },
      ];   
      return supportedChains;
}