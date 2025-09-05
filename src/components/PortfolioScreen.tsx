interface PortfolioScreenProps {}

export const PortfolioScreen = ({}: PortfolioScreenProps) => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">Portfolio</h2>
        <p className="text-gray-400">Track your positions</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 rounded-xl p-4">
          <h3 className="text-white font-medium mb-2">Total Supply</h3>
          <p className="text-2xl font-bold text-green-400">$0.00</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 rounded-xl p-4">
          <h3 className="text-white font-medium mb-2">Total Borrow</h3>
          <p className="text-2xl font-bold text-blue-400">$0.00</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 rounded-xl p-4">
          <h3 className="text-white font-medium mb-2">Net Worth</h3>
          <p className="text-2xl font-bold text-white">$0.00</p>
        </div>
      </div>
    </div>
  );
};