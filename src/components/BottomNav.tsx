
import { Home, MessagesSquare, ChartPie, WalletMinimal } from "lucide-react"

interface BottomNavProps {
  activeTab: 'home' | 'chat' | 'portfolio' | 'wallet';
  onTabChange: (tab: 'home' | 'chat' | 'portfolio' | 'wallet') => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: (_isActive: boolean) => (
        <Home/>
      )
    },
    {
      id: 'chat' as const,
      label: 'Chat',
      icon: (_isActive: boolean) => (
        <MessagesSquare/>
      )
    }, 
    {
      id: 'portfolio' as const,
      label: 'Portfolio',
      icon: (_isActive: boolean) => (
        <ChartPie/>
      )
    }, 
    {
      id: 'wallet' as const,
      label: 'My Wallet',
      icon: (_isActive: boolean) => (
        <WalletMinimal/>
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
              className={`relative flex flex-col items-center py-3 px-6 transition-all duration-300 rounded-xl ${isActive
                  ? 'text-white bg-gray-800/50'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/30'
                }`}
            >
              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}

              {tab.icon(isActive)}
              <span className={`text-xs mt-1.5 font-medium transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-500'
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