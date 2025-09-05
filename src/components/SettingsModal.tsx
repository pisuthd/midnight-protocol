import { BaseModal } from './BaseModal';

export const SettingsModal = () => {
  return (
    <BaseModal>
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
          <p className="text-gray-400">Configure your app preferences</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-600 rounded-xl p-4">
            <h3 className="text-white font-medium mb-4">App Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">Dark Mode</p>
                  <p className="text-gray-400 text-sm">Use dark theme</p>
                </div>
                <div className="relative">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="w-10 h-6 bg-gray-600 rounded-full shadow-inner"></div>
                  <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 bg-white rounded-full shadow transform translate-x-4 transition-transform"></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">Notifications</p>
                  <p className="text-gray-400 text-sm">Push notifications</p>
                </div>
                <div className="relative">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="w-10 h-6 bg-blue-600 rounded-full shadow-inner"></div>
                  <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 bg-white rounded-full shadow transform translate-x-4 transition-transform"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-600 rounded-xl p-4">
            <h3 className="text-white font-medium mb-4">About</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Network</span>
                <span>Somnia Testnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Protocol</span>
                <span>Compound v2 Fork</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-black text-white py-3 rounded-xl font-medium border border-gray-700 hover:border-gray-600 transition-all duration-200 shadow-lg">
              Documentation
            </button>
            <button className="w-full bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-black text-white py-3 rounded-xl font-medium border border-gray-700 hover:border-gray-600 transition-all duration-200 shadow-lg">
              Support
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};