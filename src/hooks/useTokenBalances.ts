import { useAccount, useBalance, useReadContracts } from 'wagmi';
import { TESTNET_TOKENS, ERC20_ABI, formatBalance, isNativeToken } from '../utils/tokenConfig';
import { formatUnits } from 'viem';

export const useTokenBalances = () => {
  const { address, isConnected } = useAccount();

  // Get native STT balance
  const { data: nativeBalance, isLoading: nativeLoading, refetch: refetchNative } = useBalance({
    address,
    query: {
      enabled: !!address && isConnected
    }
  });

  // Get ERC20 token balances
  const tokenContracts = Object.values(TESTNET_TOKENS).map(token => ({
    address: token.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address],
  }));

  const { data: tokenBalances, isLoading: tokenLoading, refetch: refetchTokens } = useReadContracts({
    contracts: tokenContracts,
    query: {
      enabled: !!address && isConnected
    }
  });

  const formatTokenBalance = (balance: bigint | undefined, decimals: number): string => {
    if (!balance) return '0.00';
    const formatted = formatUnits(balance, decimals);
    const num = parseFloat(formatted);
    return formatBalance(num, 4);
  };

  const getTokenBalances = () => {
    const balances: Record<string, { balance: string; raw: bigint; formatted: number }> = {};

    // Add native STT balance
    const sttRaw = nativeBalance?.value || 0n;
    const sttFormatted = parseFloat(formatUnits(sttRaw, 18));
    balances['STT'] = {
      balance: formatTokenBalance(sttRaw, 18),
      raw: sttRaw,
      formatted: sttFormatted
    };

    // Add ERC20 token balances
    if (tokenBalances) {
      Object.entries(TESTNET_TOKENS).forEach(([symbol, token], index) => {
        const result = tokenBalances[index];
        const balance = result?.status === 'success' ? result.result as bigint : 0n;
        const formatted = parseFloat(formatUnits(balance, token.decimals));
        
        balances[symbol] = {
          balance: formatTokenBalance(balance, token.decimals),
          raw: balance,
          formatted
        };
      });
    }

    return balances;
  };

  const calculateUSDValue = (balance: bigint, decimals: number, price: number): number => {
    if (!balance || !price) return 0;
    const formatted = parseFloat(formatUnits(balance, decimals));
    return formatted * price;
  };

  const getTotalUSDValue = (prices: Record<string, number>): number => {
    const balances = getTokenBalances();
    let total = 0;
    
    Object.entries(balances).forEach(([symbol, balance]) => {
      if (balance.formatted > 0) {
        const priceSymbol = symbol === 'STT' ? 'SOMNIA' : symbol;
        const price = prices[priceSymbol] || 0;
        total += balance.formatted * price;
      }
    });
    
    return total;
  };

  const getPortfolioChange = (prices: Record<string, { price: number; change24h: number }>): { change: number; changePercent: number } => {
    const balances = getTokenBalances();
    let currentValue = 0;
    let previousValue = 0;
    
    Object.entries(balances).forEach(([symbol, balance]) => {
      if (balance.formatted > 0) {
        const priceSymbol = symbol === 'STT' ? 'SOMNIA' : symbol;
        const priceData = prices[priceSymbol];
        
        if (priceData) {
          const currentPrice = priceData.price;
          const previousPrice = currentPrice / (1 + priceData.change24h / 100);
          
          currentValue += balance.formatted * currentPrice;
          previousValue += balance.formatted * previousPrice;
        }
      }
    });
    
    const change = currentValue - previousValue;
    const changePercent = previousValue > 0 ? (change / previousValue) * 100 : 0;
    
    return { change, changePercent };
  };

  const refetchAll = () => {
    refetchNative();
    refetchTokens();
  };

  return {
    balances: getTokenBalances(),
    isLoading: nativeLoading || tokenLoading,
    isConnected,
    address,
    calculateUSDValue,
    getTotalUSDValue,
    getPortfolioChange,
    refetchAll
  };
};
