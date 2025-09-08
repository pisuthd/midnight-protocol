import { useState } from 'react';
import { useFaucet } from '../hooks/useFaucet';
import { TESTNET_TOKENS } from '../utils/tokenConfig';

interface FaucetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const FaucetModal = ({ isOpen, onClose, onSuccess }: FaucetModalProps) => {
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedToken, setSelectedToken] = useState<keyof typeof TESTNET_TOKENS | null>(null);

  const { claimTokens, getFaucetInfo, isLoading, hash, isPending, isConfirming } = useFaucet({
    onSuccess: () => {
      const txHash = hash ? ` (TX: ${hash.slice(0, 8)}...)` : '';
      setNotification({ type: 'success', message: `Tokens claimed successfully!${txHash}` });
      onSuccess?.();
      setTimeout(() => {
        setNotification(null);
        setSelectedToken(null);
      }, 5000);
    },
    onError: (error) => {
      setNotification({ type: 'error', message: error });
      setSelectedToken(null);
      setTimeout(() => setNotification(null), 5000);
    }
  });

  const handleClaim = async (tokenSymbol: keyof typeof TESTNET_TOKENS) => {
    setSelectedToken(tokenSymbol);
    await claimTokens(tokenSymbol);
  };

  const clearNotification = () => {
    setNotification(null);
    setSelectedToken(null);
  };

  if (!isOpen) return null;

  const faucetTokens = Object.entries(TESTNET_TOKENS).filter(([_, token]) => token.hasFaucet);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
          <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-white font-medium">
              {isPending ? 'Confirm Transaction in Wallet...' : isConfirming ? 'Transaction Confirming...' : 'Processing Transaction...'}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {isPending ? 'Please check your wallet' : isConfirming ? 'Waiting for network confirmation' : 'Please wait'}
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Token Faucet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          

          {/* Notification */}
          {notification && (
            <div className={`p-4 rounded-lg border animate-in slide-in-from-top duration-300 ${
              notification.type === 'success' 
                ? 'bg-green-900/20 border-green-700/50 text-green-300'
                : 'bg-red-900/20 border-red-700/50 text-red-300'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2">
                  {notification.type === 'success' ? (
                    <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <p className="text-sm">{notification.message}</p>
                </div>
                <button
                  onClick={clearNotification}
                  className="text-gray-400 hover:text-white ml-2 flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Token List */}
          <div className="space-y-3">
            {faucetTokens.map(([symbol, token]) => {
              const faucetInfo = getFaucetInfo(symbol as keyof typeof TESTNET_TOKENS);
              const isClaimingThis = isLoading && selectedToken === symbol;
              
              return (
                <div key={symbol} className={`bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 transition-all duration-200 ${
                  isClaimingThis ? 'ring-2 ring-blue-500/50 bg-blue-900/10' : ''
                }`}>
                  <div className="flex items-center justify-between">
                    {/* Token Info */}
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-gray-700">
                        <img 
                          src={token.icon} 
                          alt={`${symbol} Logo`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = symbol.charAt(0);
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-white font-medium">{symbol}</p>
                          <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                            Testnet
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{token.name}</p>
                        <p className="text-green-400 text-sm font-medium">
                          {faucetInfo.amount} {symbol}
                        </p>
                      </div>
                    </div>

                    {/* Claim Button */}
                    <div className="text-right">
                      <button
                        onClick={() => handleClaim(symbol as keyof typeof TESTNET_TOKENS)}
                        disabled={isLoading}
                        className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed"
                      >
                        {isClaimingThis ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            <span>Claiming...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Claim</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warning */}
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-yellow-400 mt-0.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5C3.962 16.333 4.924 18 6.464 18z" />
                </svg>
              </div>
              <div>
                <p className="text-yellow-300 text-sm font-medium mb-1">Testnet Only</p>
                <p className="text-yellow-200 text-xs">
                  These tokens have no real value and are only for testing purposes on Somnia Testnet.
                </p>
              </div>
            </div>
          </div>
 
        </div>

         
      </div>
    </div>
  );
};
