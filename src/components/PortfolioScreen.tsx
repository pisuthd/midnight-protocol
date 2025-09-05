interface PortfolioScreenProps {}

export const PortfolioScreen = ({}: PortfolioScreenProps) => {
  return (
    <div className="p-6 space-y-6 pb-safe">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Portfolio</h2>
        <p className="text-gray-400">Track your positions and earnings</p>
      </div>
      
      {/* Net Worth Card */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <div className="text-center space-y-3">
          <h3 className="text-gray-400 text-sm uppercase tracking-wide">Net Worth</h3>
          <p className="text-4xl font-bold text-white">$0.00</p>
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-sm">+0.00% (24h)</span>
          </div>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-green-400 font-medium">Supply Balance</h3>
          </div>
          <p className="text-2xl font-bold text-white">$0.00</p>
          <p className="text-green-400 text-sm mt-1">+$0.00 earned</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-700/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h3 className="text-blue-400 font-medium">Borrow Balance</h3>
          </div>
          <p className="text-2xl font-bold text-white">$0.00</p>
          <p className="text-blue-400 text-sm mt-1">$0.00 interest</p>
        </div>
      </div>

      {/* Borrowing Power */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium">Borrowing Power</h3>
          <span className="text-gray-400 text-sm">Used: 0%</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Available</span>
            <span className="text-white">$0.00</span>
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

      {/* Positions */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-white font-medium mb-4">Your Positions</h3>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-gray-400 mb-2">No positions yet</p>
          <p className="text-gray-500 text-sm">Supply or borrow assets to get started</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-white font-medium mb-4">Recent Activity</h3>
        
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">No activity yet</p>
        </div>
      </div>
    </div>
  );
};