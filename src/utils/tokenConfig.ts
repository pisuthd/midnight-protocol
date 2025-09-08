// Token configuration for Somnia Testnet
export const TESTNET_TOKENS = {
    USDC: {
      address: '0x2acbd49d618dca9f23b069184fc411d734061381',
      name: 'Mock USDC',
      symbol: 'USDC.e',
      decimals: 6,
      icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
      iconType: 'image' as const
    },
    SOMNIA: {
      address: '0xf3ec24960f5922255a77c2936076ad7188fe7641',
      name: 'Mock Somnia Token',
      symbol: 'SOMI',
      decimals: 18,
      icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/37637.png',
      iconType: 'image' as const
    },
    ETH: {
      address: '0xfed8ebb0e71f5d39faca7b405686e1f23e4e308a',
      name: 'Mock Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      iconType: 'image' as const
    }
  } as const;
  
  export type TokenSymbol = keyof typeof TESTNET_TOKENS;
  
  export const TOKEN_LIST = Object.values(TESTNET_TOKENS);
  
  export const getTokenBySymbol = (symbol: TokenSymbol) => TESTNET_TOKENS[symbol];
  
  export const getTokenByAddress = (address: string) => {
    return TOKEN_LIST.find(token => token.address.toLowerCase() === address.toLowerCase());
  };
  
  // Faucet configuration - tokens available for testnet faucet
  export const FAUCET_TOKENS = ['USDT', 'SIX', 'BORA', 'MBX'] as const;
  export type FaucetTokenSymbol = typeof FAUCET_TOKENS[number];
  
  export const FAUCET_CONFIG = {
    amounts: {
      USDT: '1000', // 1000 USDT
      SIX: '10000', // 10000 SIX
      BORA: '5000', // 5000 BORA
      MBX: '2000'   // 2000 MBX
    }
  };
  
  // Price API configuration
  export const PRICE_API_CONFIG = {
    endpoint: 'https://kvxdikvk5b.execute-api.ap-southeast-1.amazonaws.com/prod/prices'
  };
  
  // ERC20 ABI for token interactions
  export const ERC20_ABI: any = [
    "function name() view returns (string)",
    "function symbol() view returns (string)", 
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function transferFrom(address from, address to, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    // Mock token specific function for faucet
    "function mint(address to, uint256 amount) returns (bool)"
  ];
   