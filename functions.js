exports.ChainsList =()=>{
    const supportedChains = [
        {
          name: 'Ethereum',
          chainIdHex: '0x1',
          chainIdInt: 1,
          image:null
        },
        {
          name: 'Goerli',
          chainIdHex: '0x5',
          chainIdInt: 5,
          image:null
        },
        {
          name: 'Sepolia',
          chainIdHex: '0xaa36a7',
          chainIdInt: 11155111,
          image:null
        },
        {
          name: 'Polygon',
          chainIdHex: '0x89',
          chainIdInt: 137,
          image:null
        },
        {
          name: 'Mumbai',
          chainIdHex: '0x13881',
          chainIdInt: 80001,
          image:null
        },
        {
          name: 'Binance Smart Chain',
          chainIdHex: '0x38',
          chainIdInt: 56,
          image:null
        },
        {
          name: 'BSC Testnet',
          chainIdHex: '0x61',
          chainIdInt: 97,
          image:null
        },
        {
          name: 'Avalanche',
          chainIdHex: '0xa86a',
          chainIdInt: 43114,
          image:null
        },
        {
          name: 'Fantom',
          chainIdHex: '0xfa',
          chainIdInt: 250,
          image:null
        },
        {
          name: 'Cronos',
          chainIdHex: '0x19',
          chainIdInt: 25,
          image:null
        },
        {
          name: 'Palm',
          chainIdHex: '0x2a15c308d',
          chainIdInt: 11297108109,
          image:null
        },
        {
          name: 'Arbitrum',
          chainIdHex: '0xa4b1',
          chainIdInt: 42161,
          image:null
        },
      ];
    
      return supportedChains;
}