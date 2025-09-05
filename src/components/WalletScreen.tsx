interface WalletScreenProps {}

export const WalletScreen = ({}: WalletScreenProps) => {
  const tokens = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '0.00',
      value: '$0.00',
      price: '$2,450.00',
      change: '+2.5%',
      changePositive: true,
      icon: '🔸'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '0.00',
      value: '$0.00',
      price: '$1.00',
      change: '0.0%',
      changePositive: true,
      icon: '💰'
    },
    {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      balance: '0.00',
      value: '$0.00',
      price: '$68,500.00',
      change: '+1.8%',
      changePositive: true,
      icon: '₿'
    }
  ];

  return (
    <div className="p-6 space-y-6 pb-safe">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Wallet</h2>
        <p className="text-gray-400">Manage your assets</p>
      </div>

      {/* Total Balance */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <div className="text-center space-y-3">
          <h3 className="text-gray-400 text-sm uppercase tracking-wide">Total Balance</h3>
          <p className="text-4xl font-bold text-white">$0.00</p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-green-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>+0.00%</span>
            </div>
            <span className="text-gray-500">24h</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-gray-600/70 transition-all duration-200">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-white text-sm font-medium">Receive</span>
        </button>
        
        <button className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-gray-600/70 transition-all duration-200">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <span className="text-white text-sm font-medium">Send</span>
        </button>
        
        <button className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-gray-600/70 transition-all duration-200">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <span className="text-white text-sm font-medium">Swap</span>
        </button>
      </div>

      {/* Assets List */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium">Assets</h3>
          <button className="text-gray-400 hover:text-white text-sm transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3">
          {tokens.map((token) => (
            <div key={token.symbol} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-xl">
                  {token.icon}
                </div>
                <div>
                  <p className="text-white font-medium">{token.symbol}</p>
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
      </div>

      {/* Market Prices */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-white font-medium mb-4">Market Prices</h3>
        
        <div className="space-y-3">
          {tokens.map((token) => (
            <div key={`price-${token.symbol}`} className="flex items-center justify-between p-3 bg-gray-800/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{token.icon}</span>
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
      </div>

      {/* Connection Status */}
      <div className="bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Wallet not connected</span>
          </div>
          <button className="bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-black text-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-700 hover:border-gray-600 transition-all duration-200">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};