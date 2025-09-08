import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { useTokenBalances } from '../hooks/useTokenBalances';
import { usePrice } from '../hooks/usePrice';
import { useModal } from '../context/ModalContext';
import { ALL_TOKENS, formatUSDValue, getPriceSymbol, validateNetwork, getNetworkInfo } from '../utils/tokenConfig';

interface WalletScreenProps {}

export const WalletScreen = ({}: WalletScreenProps) => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { openModal } = useModal();
  
  const isCorrectNetwork = validateNetwork(chainId);
  const networkInfo = getNetworkInfo();
  
  const { 
    balances, 
    isLoading: balancesLoading, 
    calculateUSDValue, 
    getTotalUSDValue,
    getPortfolioChange,
    refetchAll
  } = useTokenBalances();
  
  const {
    prices,
    isLoading: pricesLoading,
    getFormattedPrice,
    getFormattedChange,
    getTokenPrice,
    portfolioMetrics,
    lastUpdated
  } = usePrice({ 
    includePortfolioMetrics: true,
    balances: balances
  });

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Get simple price map for calculations
  const priceMap = Object.keys(ALL_TOKENS).reduce((acc, symbol) => {
    acc[getPriceSymbol(symbol)] = getTokenPrice(symbol);
    return acc;
  }, {} as Record<string, number>);

  const totalValue = getTotalUSDValue(priceMap);
  const portfolioChange = getPortfolioChange(prices);
  const isLoading = balancesLoading || pricesLoading;

  const tokenList = Object.entries(ALL_TOKENS).map(([symbol, token]) => {
    const balance = balances[symbol];
    const price = getTokenPrice(symbol);
    const priceSymbol = getPriceSymbol(symbol);
    const formattedPrice = getFormattedPrice(symbol);
    const change = getFormattedChange(symbol);
    
    const usdValue = balance ? calculateUSDValue(balance.raw, token.decimals, price) : 0;
    
    return {
      symbol,
      name: token.name,
      balance: balance?.balance || '0.00',
      value: formatUSDValue(usdValue),
      price: formattedPrice,
      change: change.text,
      changePositive: change.isPositive,
      icon: token.icon,
      hasFaucet: 'hasFaucet' in token ? token.hasFaucet : false,
      hasBalance: balance ? balance.formatted > 0 : false
    };
  });

  const handleConnect = () => {
    const firstConnector = connectors[0];
    if (firstConnector) {
      connect({ connector: firstConnector });
    }
  };

  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: networkInfo.chainId } as any);
    }
  };

  const formatLastUpdated = (date: Date | null): string => {
    if (!date) return '';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };
 

  // Show network warning if not on correct network
  if (!isCorrectNetwork) {
    return (
      <div className="p-6 space-y-6 pb-safe">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Network Error</h2>
        </div>

        <div className="bg-gradient-to-br from-red-900/60 to-orange-900/60 backdrop-blur-sm border border-red-700/50 rounded-2xl p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5C3.962 16.333 4.924 18 6.464 18z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Wrong Network</h3>
              <p className="text-gray-300 mb-4">
                Please switch to {networkInfo.name} to use this app.
              </p> 
              <button 
                onClick={handleSwitchNetwork}
                className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Switch to {networkInfo.name}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">
                Connected to wrong network (Chain ID: {chainId})
              </span>
            </div>
            <button 
              onClick={() => disconnect()}
              className="bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-black text-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-700 hover:border-gray-600 transition-all duration-200"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 pb-safe">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">My Wallet</h2>  
      </div>

      {/* Total Balance */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <div className="text-center space-y-3">
          <h3 className="text-gray-400 text-sm uppercase tracking-wide">Total Portfolio Value</h3>
          {isLoading ? (
            <div className="space-y-2">
              <div className="w-32 h-8 bg-gray-700 rounded mx-auto animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-700 rounded mx-auto animate-pulse"></div>
            </div>
          ) : (
            <>
              <p className="text-4xl font-bold text-white">{formatUSDValue(totalValue)}</p>
               
            </>
          )}
        </div>
      </div>
 

      {/* Assets List */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium">Assets</h3>
          <button 
            onClick={() => balances && Object.keys(balances).length > 0 && refetchAll()}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        {!isConnected ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Connect your wallet to view assets</p>
            <div className="space-y-3">
              <button 
                onClick={handleConnect}
                className="bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                Connect Wallet
              </button> 
            </div>
          </div>
        ) : isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                  <div>
                    <div className="w-16 h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="w-24 h-3 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="w-12 h-3 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {tokenList.map((token) => (
              <div key={token.symbol} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-gray-700">
                    <img 
                      src={token.icon} 
                      alt={`${token.symbol} Logo`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = token.symbol.charAt(0);
                      }}
                    />
                  </div>
                  <div>
                <div className="flex items-center space-x-2">
                      <p className="text-white font-medium">{token.symbol}</p>
                      {token.hasFaucet && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal('faucet');
                          }}
                          className="text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 px-2 py-1 rounded transition-colors"
                        >
                          Get Tokens
                        </button>
                      )} 
                    </div>
                    <p className="text-gray-400 text-sm">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{token.balance}</p>
                  <p className="text-gray-400 text-sm">{token.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Market Prices */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-white font-medium mb-4">Market Prices</h3>
        
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-800/20 rounded-lg animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-700 rounded"></div>
                  <div className="w-12 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="text-right">
                  <div className="w-16 h-4 bg-gray-700 rounded mb-1"></div>
                  <div className="w-12 h-3 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {tokenList.map((token) => (
              <div key={`price-${token.symbol}`} className="flex items-center justify-between p-3 bg-gray-800/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img 
                    src={token.icon} 
                    alt={`${token.symbol} Logo`} 
                    className="w-6 h-6 rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-sm">${token.symbol.charAt(0)}</span>`;
                    }}
                  />
                  <span className="text-white font-medium">{token.symbol}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{token.price}</p>
                  <p className={`text-sm ${token.changePositive ? 'text-green-400' : 'text-red-400'}`}>
                    {token.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connection Status */}
      <div className="bg-gradient-to-br  from-gray-900/40 to-black/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected && isCorrectNetwork ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-gray-400 text-sm">
              {isConnected ? 
                `Connected: ${formatAddress(address!)} (${networkInfo.name})` : 
                'Wallet not connected'
              }
            </span>
          </div>
          <button 
            onClick={isConnected ? () => disconnect() : handleConnect}
            className="bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-black text-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-700 hover:border-gray-600 transition-all duration-200"
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
};
