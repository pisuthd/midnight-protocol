import { useState, useEffect } from 'react';
import { PRICE_API_CONFIG, ALL_TOKENS, getPriceSymbol, getAllPriceSymbols } from "../utils/tokenConfig"

interface TokenPriceData {
  symbol: string;
  price: number;
  percent_change_24h: number;
  market_cap: number;
  volume_24h: number;
  last_updated: string;
  timestamp: string;
}

interface ApiResponse {
  success: boolean;
  data: TokenPriceData[];
  count: number;
}

interface TokenPrice {
  symbol: string;
  price: number;
  change24h: number;
  market_cap: number;
  volume_24h: number;
  lastUpdated: Date;
}

interface PortfolioMetrics {
  totalValue: number;
  totalChange24h: number;
  totalChangePercent: number;
  topGainer: { symbol: string; change: number } | null;
  topLoser: { symbol: string; change: number } | null;
}

interface UsePriceUpdatesOptions {
  symbols?: string[];
  updateInterval?: number;
  enableRealTimeUpdates?: boolean;
  includePortfolioMetrics?: boolean;
  balances?: Record<string, { balance: string; raw: bigint }>;
}

const API_ENDPOINT = PRICE_API_CONFIG.endpoint;

export const usePrice = ({ 
  symbols,
  updateInterval = 30000,
  enableRealTimeUpdates = false,
  includePortfolioMetrics = false,
  balances
}: UsePriceUpdatesOptions) => {

  const [prices, setPrices] = useState<Record<string, TokenPrice>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Use provided symbols or default to all supported tokens
  const targetSymbols = symbols || getAllPriceSymbols();

  // Fetch prices from backend API
  const fetchRealPrices = async (): Promise<Record<string, TokenPrice>> => {
    try {
      const response = await fetch(API_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiData: ApiResponse = await response.json();
      
      if (!apiData.success || !apiData.data) {
        throw new Error('Invalid API response format');
      }

      // Convert API data to our format
      const priceMap: Record<string, TokenPrice> = {};

      // Process API data and map symbols
      apiData.data.forEach((tokenData: TokenPriceData) => {
        let mappedSymbol = tokenData.symbol;
        
        if (targetSymbols.includes(mappedSymbol)) {
          priceMap[mappedSymbol] = {
            symbol: mappedSymbol,
            price: tokenData.price,
            change24h: tokenData.percent_change_24h,
            market_cap: tokenData.market_cap,
            volume_24h: tokenData.volume_24h,
            lastUpdated: new Date(tokenData.last_updated)
          };
        }
      });

      // Add USDC as stable coin if not in API (always $1.00)
      if (targetSymbols.includes('USDC') && !priceMap['USDC']) {
        priceMap['USDC'] = {
          symbol: 'USDC',
          price: 1.0001,
          change24h: 0.01,
          market_cap: 0,
          volume_24h: 0,
          lastUpdated: new Date()
        };
      }
 
      return priceMap;
    } catch (err) {
      console.error('Error fetching prices from API:', err);
      throw err;
    }
  };

  const updatePrices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const newPrices = await fetchRealPrices();
      
      setPrices(newPrices);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-update prices
  useEffect(() => {
    updatePrices();
    
    if (enableRealTimeUpdates && updateInterval > 0) {
      const interval = setInterval(updatePrices, updateInterval);
      return () => clearInterval(interval);
    }
  }, [targetSymbols.join(','), enableRealTimeUpdates, updateInterval]);

  const getFormattedPrice = (symbol: string): string => {
    const priceSymbol = getPriceSymbol(symbol);
    const price = prices[priceSymbol];
    if (!price) return '$0.00';
    
    // Format based on price range for better readability
    if (price.price >= 1) {
      return `$${price.price.toFixed(4)}`;
    } else if (price.price >= 0.1) {
      return `$${price.price.toFixed(4)}`;
    } else {
      return `$${price.price.toFixed(6)}`;
    }
  };

  const getFormattedChange = (symbol: string): { text: string; isPositive: boolean } => {
    const priceSymbol = getPriceSymbol(symbol);
    const price = prices[priceSymbol];
    if (!price) return { text: '0.00%', isPositive: true };
    
    const isPositive = price.change24h >= 0;
    return {
      text: `${isPositive ? '+' : ''}${price.change24h.toFixed(2)}%`,
      isPositive
    };
  };

  const getLastUpdated = (symbol: string): Date | null => {
    const priceSymbol = getPriceSymbol(symbol);
    const price = prices[priceSymbol];
    return price ? price.lastUpdated : null;
  };

  const getMarketData = (symbol: string) => {
    const priceSymbol = getPriceSymbol(symbol);
    const price = prices[priceSymbol];
    if (!price) return null;
    
    return {
      marketCap: price.market_cap,
      volume24h: price.volume_24h,
      lastUpdated: price.lastUpdated
    };
  };

  const getTokenPrice = (symbol: string): number => {
    const priceSymbol = getPriceSymbol(symbol);
    return prices[priceSymbol]?.price || 0;
  };

  // Portfolio metrics calculation
  const calculatePortfolioMetrics = (): PortfolioMetrics => {
    if (!includePortfolioMetrics || !balances) {
      return {
        totalValue: 0,
        totalChange24h: 0,
        totalChangePercent: 0,
        topGainer: null,
        topLoser: null
      };
    }

    let totalValue = 0;
    let totalValueYesterday = 0;
    let topGainer: { symbol: string; change: number } | null = null;
    let topLoser: { symbol: string; change: number } | null = null;

    Object.entries(ALL_TOKENS).forEach(([symbol, token]) => {
      const balance = balances[symbol];
      if (!balance) return;

      const price = getTokenPrice(symbol);
      const change24h = prices[getPriceSymbol(symbol)]?.change24h || 0;
      
      if (price > 0) {
        const balanceNum = parseFloat(balance.balance.replace(/[MK]$/, '')) * 
          (balance.balance.endsWith('M') ? 1000000 : balance.balance.endsWith('K') ? 1000 : 1);
        
        const currentValue = balanceNum * price;
        const yesterdayPrice = price / (1 + change24h / 100);
        const yesterdayValue = balanceNum * yesterdayPrice;
        
        totalValue += currentValue;
        totalValueYesterday += yesterdayValue;

        // Track top gainer/loser
        if (!topGainer || change24h > topGainer.change) {
          topGainer = { symbol, change: change24h };
        }
        if (!topLoser || change24h < topLoser.change) {
          topLoser = { symbol, change: change24h };
        }
      }
    });

    const totalChange24h = totalValue - totalValueYesterday;
    const totalChangePercent = totalValueYesterday > 0 ? (totalChange24h / totalValueYesterday) * 100 : 0;

    return {
      totalValue,
      totalChange24h,
      totalChangePercent,
      topGainer,
      topLoser
    };
  };

  const portfolioMetrics = calculatePortfolioMetrics();

  const refetch = async () => {
    await updatePrices();
  };

  return {
    prices,
    isLoading,
    error,
    lastUpdated,
    getFormattedPrice,
    getFormattedChange,
    getLastUpdated,
    getMarketData,
    getTokenPrice,
    portfolioMetrics,
    refetch
  };
};

export type { TokenPrice, UsePriceUpdatesOptions, TokenPriceData, ApiResponse, PortfolioMetrics };
