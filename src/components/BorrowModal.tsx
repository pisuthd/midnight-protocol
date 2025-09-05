import { BaseModal } from './BaseModal';
import { useState } from 'react';

export const BorrowModal = () => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  const tokens = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      available: '0.00',
      apr: '6.2%',
      icon: '🔸',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      available: '0.00',
      apr: '5.8%',
      icon: '💰',
      gradient: 'from-green-500 to-green-600'
    },
    {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      available: '0.00',
      apr: '7.1%',
      icon: '₿',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <BaseModal>
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Borrow Assets</h2>
          <p className="text-gray-400">Borrow assets against your collateral</p>
        </div>

        {/* Borrowing Power Overview */}
        <div className="bg-gradient-to-br from-blue-900/10 to-cyan-900/10 border border-blue-700/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-blue-400 font-medium">Borrowing Power</h3>
            <span className="text-blue-300 text-sm">$0.00 Available</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Used</span>
              <span className="text-white">$0.00 (0%)</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Safe</span>
              <span>Liquidation Risk</span>
            </div>
          </div>
        </div>

        {!selectedToken ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-yellow-900/10 to-orange-900/10 border border-yellow-700/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-yellow-400 font-medium">Need Collateral</h3>
                  <p className="text-yellow-300 text-sm">Supply assets first to unlock borrowing power</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-600 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-medium">Available to Borrow</span>
                <span className="text-gray-400 text-sm">APR</span>
              </div>
              
              <div className="space-y-3">
                {tokens.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => setSelectedToken(token.symbol)}
                    className="w-full flex justify-between items-center p-4 bg-gray-800/30 rounded-xl hover:bg-gray-700/40 transition-all duration-200 hover:scale-[1.02] opacity-50 cursor-not-allowed"
                    disabled
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${token.gradient} rounded-full flex items-center justify-center text-lg`}>
                        {token.icon}
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium">{token.symbol}</p>
                        <p className="text-gray-400 text-sm">Available: {token.available}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-bold">{token.apr}</p>
                      <p className="text-gray-400 text-sm">APR</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Selected Token Header */}
            <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl">
              <button
                onClick={() => setSelectedToken(null)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${tokens.find(t => t.symbol === selectedToken)?.gradient} rounded-full flex items-center justify-center text-lg`}>
                  {tokens.find(t => t.symbol === selectedToken)?.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium">Borrow {selectedToken}</h3>
                  <p className="text-blue-400 text-sm">{tokens.find(t => t.symbol === selectedToken)?.apr} APR</p>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-600 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium">Amount</label>
                  <span className="text-gray-400 text-sm">
                    Available: {tokens.find(t => t.symbol === selectedToken)?.available} {selectedToken}
                  </span>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white text-xl font-medium placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors">
                    MAX
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {['25%', '50%', '75%', 'MAX'].map((percentage) => (
                    <button
                      key={percentage}
                      className="py-2 bg-gray-800/50 text-gray-400 rounded-lg text-sm hover:bg-gray-700/50 hover:text-white transition-colors"
                    >
                      {percentage}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Health Factor */}
            <div className="bg-gradient-to-br from-red-900/10 to-orange-900/10 border border-red-700/20 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-red-400 font-medium">Health Factor</span>
                <span className="text-red-300">∞</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-1 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-gray-400 text-xs mt-2">Values below 1.0 are subject to liquidation</p>
            </div>

            {/* Transaction Summary */}
            <div className="bg-gradient-to-br from-gray-800/30 to-black/30 border border-gray-700/50 rounded-xl p-4">
              <h4 className="text-white font-medium mb-3">Transaction Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Borrow Amount</span>
                  <span className="text-white">{amount || '0.0'} {selectedToken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current APR</span>
                  <span className="text-blue-400">{tokens.find(t => t.symbol === selectedToken)?.apr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">New Health Factor</span>
                  <span className="text-green-400">∞</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                disabled
                className="w-full bg-gradient-to-br from-gray-700 to-gray-800 text-gray-500 py-4 rounded-xl font-medium cursor-not-allowed"
              >
                Supply Collateral First
              </button>
            </div>
          </div>
        )}

        {!selectedToken && (
          <div className="pt-4 border-t border-gray-700">
            <button className="w-full bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-black text-white py-4 rounded-xl font-medium border border-gray-700 hover:border-gray-600 transition-all duration-200 shadow-lg">
              Supply Assets First
            </button>
          </div>
        )}
      </div>
    </BaseModal>
  );
};