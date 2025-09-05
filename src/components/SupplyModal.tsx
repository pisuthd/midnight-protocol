import { BaseModal } from './BaseModal';
import { useState } from 'react';

export const SupplyModal = () => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  const tokens = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '0.00',
      apy: '5.2%',
      icon: '🔸',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '0.00',
      apy: '4.8%',
      icon: '💰',
      gradient: 'from-green-500 to-green-600'
    },
    {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      balance: '0.00',
      apy: '3.5%',
      icon: '₿',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <BaseModal>
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Supply Assets</h2>
          <p className="text-gray-400">Earn interest by supplying your assets to the protocol</p>
        </div>

        {!selectedToken ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-900/10 to-emerald-900/10 border border-green-700/20 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-green-400 font-medium">Why Supply?</h3>
                  <p className="text-green-300 text-sm">Earn passive income while supporting the protocol</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-600 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-medium">Available Assets</span>
                <span className="text-gray-400 text-sm">Select to supply</span>
              </div>
              
              <div className="space-y-3">
                {tokens.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => setSelectedToken(token.symbol)}
                    className="w-full flex justify-between items-center p-4 bg-gray-800/30 rounded-xl hover:bg-gray-700/40 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${token.gradient} rounded-full flex items-center justify-center text-lg`}>
                        {token.icon}
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium">{token.symbol}</p>
                        <p className="text-gray-400 text-sm">{token.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">{token.apy}</p>
                      <p className="text-gray-400 text-sm">APY</p>
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
                  <h3 className="text-white font-medium">Supply {selectedToken}</h3>
                  <p className="text-green-400 text-sm">{tokens.find(t => t.symbol === selectedToken)?.apy} APY</p>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-600 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium">Amount</label>
                  <span className="text-gray-400 text-sm">
                    Balance: {tokens.find(t => t.symbol === selectedToken)?.balance} {selectedToken}
                  </span>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white text-xl font-medium placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors">
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

            {/* Transaction Summary */}
            <div className="bg-gradient-to-br from-gray-800/30 to-black/30 border border-gray-700/50 rounded-xl p-4">
              <h4 className="text-white font-medium mb-3">Transaction Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Supply Amount</span>
                  <span className="text-white">{amount || '0.0'} {selectedToken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current APY</span>
                  <span className="text-green-400">{tokens.find(t => t.symbol === selectedToken)?.apy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Gas</span>
                  <span className="text-white">~$5.00</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                disabled={!amount}
                className="w-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 text-white py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-green-500/25 disabled:shadow-none"
              >
                {amount ? `Supply ${amount} ${selectedToken}` : 'Enter Amount'}
              </button>
              
              <button className="w-full bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-black text-white py-3 rounded-xl font-medium border border-gray-700 hover:border-gray-600 transition-all duration-200">
                Approve {selectedToken} First
              </button>
            </div>
          </div>
        )}

        {!selectedToken && (
          <div className="pt-4 border-t border-gray-700">
            <button className="w-full bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-black text-white py-4 rounded-xl font-medium border border-gray-700 hover:border-gray-600 transition-all duration-200 shadow-lg">
              Connect Wallet to Continue
            </button>
          </div>
        )}
      </div>
    </BaseModal>
  );
};