interface WalletScreenProps {}

export const WalletScreen = ({}: WalletScreenProps) => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">Wallet</h2>
        <p className="text-gray-400">Manage your assets</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-medium">ETH</h3>
              <p className="text-gray-400 text-sm">Ethereum</p>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">0.00</p>
              <p className="text-gray-400 text-sm">$0.00</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-medium">USDC</h3>
              <p className="text-gray-400 text-sm">USD Coin</p>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">0.00</p>
              <p className="text-gray-400 text-sm">$0.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};