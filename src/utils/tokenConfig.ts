// Network validation utility
export const validateNetwork = (chainId: number): boolean => {
  return chainId === 50312;
};

// Get network info
export const getNetworkInfo = () => {
  return {
    chainId: 50312,
    name: 'Somnia Testnet',
    symbol: 'STT',
    rpcUrl: 'https://dream-rpc.somnia.network',
    blockExplorer: 'https://shannon-explorer.somnia.network',
    isTestnet: true
  };
};

// Check if address is valid for current network
export const isValidAddress = (address: string, chainId: number): boolean => {
  return validateNetwork(chainId) && /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Token configuration for Somnia Testnet
export const TESTNET_TOKENS = {
    USDC: {
      address: '0x2acbd49d618dca9f23b069184fc411d734061381',
      name: 'Mock USDC',
      symbol: 'USDC',
      decimals: 6,
      icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
      iconType: 'image' as const,
      hasFaucet: true,
      chainId: 50312
    },
    SOMNIA: {
      address: '0xf3ec24960f5922255a77c2936076ad7188fe7641',
      name: 'Mock Somnia Token',
      symbol: 'SOMNIA',
      decimals: 18,
      icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/37637.png',
      iconType: 'image' as const,
      hasFaucet: true,
      chainId: 50312
    },
    ETH: {
      address: '0xfed8ebb0e71f5d39faca7b405686e1f23e4e308a',
      name: 'Mock Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      iconType: 'image' as const,
      hasFaucet: true,
      chainId: 50312
    }
  } as const;

// Native token configuration
export const NATIVE_TOKEN = {
  symbol: 'STT',
  name: 'Somnia Test Token',
  decimals: 18,
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/37637.png',
  iconType: 'image' as const,
  hasFaucet: false,
  priceSymbol: 'SOMNIA', // Use SOMNIA price for STT
  chainId: 50312,
  isNative: true
} as const;

// All supported tokens (ERC20 + Native)
export const ALL_TOKENS = {
  STT: NATIVE_TOKEN,
  ...TESTNET_TOKENS
} as const;
  
  export type TokenSymbol = keyof typeof ALL_TOKENS;
  
  export const TOKEN_LIST = Object.values(TESTNET_TOKENS);
  export const ALL_TOKEN_LIST = Object.values(ALL_TOKENS);
  
  export const getTokenBySymbol = (symbol: TokenSymbol) => ALL_TOKENS[symbol];
  
  export const getTokenByAddress = (address: string) => {
    return TOKEN_LIST.find(token => token.address.toLowerCase() === address.toLowerCase());
  };

  // Balance formatting utilities
  export const formatBalance = (balance: string | number, decimals: number = 4): string => {
    const num = typeof balance === 'string' ? parseFloat(balance) : balance;
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else if (num >= 1) {
      return num.toFixed(decimals);
    } else {
      return num.toFixed(6);
    }
  };

  // USD value calculation utility
  export const calculateUSDValue = (balance: number, price: number): number => {
    return balance * price;
  };

  // Format USD value with proper decimals
  export const formatUSDValue = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    } else if (value >= 1) {
      return `${value.toFixed(2)}`;
    } else {
      return `${value.toFixed(4)}`;
    }
  };

  // Get price symbol for token (handles STT -> SOMNIA mapping)
  export const getPriceSymbol = (tokenSymbol: string): string => {
    return tokenSymbol === 'STT' ? 'SOMNIA' : tokenSymbol;
  };

  // Check if token is native
  export const isNativeToken = (symbol: string): boolean => {
    return symbol === 'STT';
  };

  // Get all supported symbols for price fetching
  export const getAllPriceSymbols = (): string[] => {
    return Object.keys(ALL_TOKENS).map(symbol => getPriceSymbol(symbol));
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
  export const ERC20_ABI = [
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [{"name": "", "type": "string", "internalType": "string"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [{"name": "", "type": "string", "internalType": "string"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint8", "internalType": "uint8"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalSupply",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [{"name": "owner", "type": "address", "internalType": "address"}],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transfer",
      "inputs": [
        {"name": "to", "type": "address", "internalType": "address"},
        {"name": "amount", "type": "uint256", "internalType": "uint256"}
      ],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        {"name": "from", "type": "address", "internalType": "address"},
        {"name": "to", "type": "address", "internalType": "address"},
        {"name": "amount", "type": "uint256", "internalType": "uint256"}
      ],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        {"name": "spender", "type": "address", "internalType": "address"},
        {"name": "amount", "type": "uint256", "internalType": "uint256"}
      ],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "allowance",
      "inputs": [
        {"name": "owner", "type": "address", "internalType": "address"},
        {"name": "spender", "type": "address", "internalType": "address"}
      ],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "mint",
      "inputs": [
        {"name": "to", "type": "address", "internalType": "address"},
        {"name": "amount", "type": "uint256", "internalType": "uint256"}
      ],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    }
  ] as const;
   