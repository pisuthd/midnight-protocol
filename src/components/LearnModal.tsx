import { BaseModal } from './BaseModal';

export const LearnModal = () => {
  return (
    <BaseModal>
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Learn DeFi</h2>
          <p className="text-gray-400">Understanding lending and borrowing protocols</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-600 rounded-xl p-4">
            <h3 className="text-white font-medium mb-3">How it Works</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium">Supply Assets</p>
                  <p className="text-gray-400 text-sm">Deposit your crypto to earn interest</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium">Use as Collateral</p>
                  <p className="text-gray-400 text-sm">Your supplied assets can be used as collateral</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium">Borrow Against Collateral</p>
                  <p className="text-gray-400 text-sm">Borrow other assets up to your borrowing limit</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-600 rounded-xl p-4">
            <h3 className="text-white font-medium mb-3">Key Features</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                <p className="text-green-400 font-bold text-lg">5.2%</p>
                <p className="text-gray-400 text-sm">Supply APY</p>
              </div>
              <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                <p className="text-blue-400 font-bold text-lg">80%</p>
                <p className="text-gray-400 text-sm">Max LTV</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-700/50 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-yellow-400 font-medium">Risk Warning</p>
                <p className="text-yellow-100 text-sm mt-1">
                  DeFi protocols carry smart contract and liquidation risks. Always do your own research.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};