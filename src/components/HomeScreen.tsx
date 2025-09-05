import { useModal } from '../context/ModalContext';

interface HomeScreenProps { }

export const HomeScreen = ({ }: HomeScreenProps) => {
  const { openModal } = useModal();

  const icons = [
    {
      id: 'supply',
      label: 'Supply',
      description: 'Earn interest',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-600',
      shadowColor: 'shadow-green-500/20'
    },
    {
      id: 'borrow',
      label: 'Borrow',
      description: 'Access liquidity',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-600',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      id: 'learn',
      label: 'Learn',
      description: 'DeFi basics',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-600',
      shadowColor: 'shadow-purple-500/20'
    },
    {
      id: 'farcaster',
      label: 'Share',
      description: 'Farcaster frames',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-purple-600',
      shadowColor: 'shadow-indigo-500/20'
    }
  ];

  const handleIconClick = (iconId: string) => {
    if (iconId === 'supply' || iconId === 'borrow' || iconId === 'learn') {
      openModal(iconId);
    } else {
      // Placeholder for other actions
      console.log(`${iconId} clicked - coming soon!`);
    }
  };

  return (
    <div className="p-6 space-y-6 pb-safe">
      {/* Feature Cards */}
      <div className="grid grid-cols-2 gap-4" style={{ height: '220px' }}>
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-indigo-900/50 backdrop-blur-sm border border-purple-700/40 rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-500/30 rounded-xl">
                  <span className="text-purple-300 font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Welcome</h3>
                  <p className="text-purple-200 text-sm">to Midnight</p>
                </div>
              </div>
              <p className="text-purple-200 text-sm leading-relaxed">Start earning with our Somnia lending protocol. Supply assets to earn interest or borrow against your collateral.</p>
            </div>
            <div className="space-y-2">
              <p className="text-purple-300 text-xs font-medium uppercase tracking-wide">Get Started</p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/15 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-full blur-xl"></div>
        </div>

        {/* SOMNIA Token Price Card */}
        <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 flex items-center justify-center bg-orange-500/30 rounded-xl">
                  <span className="text-orange-300 font-bold text-lg">S</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">SOMNIA</h3>
                  <p className="text-gray-400 text-sm">Token Price</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">$0.0234</div>
                <div className="flex items-center space-x-2 text-green-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+12.5% (24h)</span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-gray-400 text-xs uppercase tracking-wide">Market Cap</p>
              <p className="text-white font-semibold">$2.4M</p>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-yellow-500/5 to-transparent rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="space-y-4">
        {/* Quick Actions Header */}
        <div className="text-center">
          <h3 className="text-white font-semibold text-lg">Quick Actions</h3>
          <p className="text-gray-400 text-sm">Choose what you'd like to do</p>
        </div>

        {/* Action Icons Grid */}
        <div className="grid grid-cols-4 gap-4">
          {icons.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => handleIconClick(item.id)}
              className={`group relative flex flex-col items-center space-y-3 p-4 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300  ${item.shadowColor} hover:shadow-xl active:scale-95`}
            >
              <div className={`relative p-3 rounded-xl bg-gradient-to-br ${item.gradient} text-white group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                {item.icon}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
              </div>
              <div className="text-center">
                <span className="text-white font-medium text-sm">{item.label}</span>
              </div>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};