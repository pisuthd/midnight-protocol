interface BottomNavProps {
  activeTab: 'home' | 'portfolio' | 'wallet';
  onTabChange: (tab: 'home' | 'portfolio' | 'wallet') => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: (isActive: boolean) => (
        <svg className={`w-6 h-6 mb-1 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 1.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'portfolio' as const,
      label: 'Portfolio',
      icon: (isActive: boolean) => (
        <svg className={`w-6 h-6 mb-1 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 1.5 : 2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'wallet' as const,
      label: 'Wallet',
      icon: (isActive: boolean) => (
        <svg className={`w-6 h-6 mb-1 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 1.5 : 2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    }
  ];

  return (
    <nav className="border-t border-gray-800/50 bg-black/50 backdrop-blur-sm relative">
      {/* Active tab indicator */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="flex justify-around py-2 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center py-3 px-6 transition-all duration-300 rounded-xl ${
                isActive 
                  ? 'text-white bg-gray-800/50' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/30'
              }`}
            >
              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
              
              {tab.icon(isActive)}
              <span className={`text-xs font-medium transition-all duration-200 ${
                isActive ? 'text-white' : 'text-gray-500'
              }`}>
                {tab.label}
              </span>
              
              {/* Glow effect for active tab */}
              {isActive && (
                <div className="absolute inset-0 bg-white/5 rounded-xl blur-xl"></div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Safe area for iOS */}
      <div className="h-safe-area-inset-bottom"></div>
    </nav>
  );
};