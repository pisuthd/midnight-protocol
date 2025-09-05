import { useModal } from '../context/ModalContext';

interface HomeScreenProps {}

export const HomeScreen = ({}: HomeScreenProps) => {
  const { openModal } = useModal();

  const icons = [
    {
      id: 'supply',
      label: 'Supply',
      description: 'Earn interest',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-purple-600',
      shadowColor: 'shadow-indigo-500/20'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      description: 'Track performance',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-600',
      shadowColor: 'shadow-orange-500/20'
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
    <div className="p-6 space-y-8 pb-safe">
      
      
       
      {/* Main Action Icons */}
      <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
        {icons.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => handleIconClick(item.id)}
            className={`group relative flex flex-col items-center space-y-4 p-6 rounded-3xl bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${item.shadowColor} hover:shadow-2xl active:scale-95`}
          >
            <div className={`relative p-5 rounded-2xl bg-gradient-to-br ${item.gradient} text-white group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
              {item.icon}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
            </div>
            <div className="text-center space-y-1">
              <span className="text-white font-semibold text-lg">{item.label}</span>
              <p className="text-gray-400 text-sm leading-tight">{item.description}</p>
            </div>
            
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
          </button>
        ))}
      </div>

      {/* Secondary Actions */}
      <div className="flex justify-center">
        <button
          onClick={() => handleIconClick('analytics')}
          className={`group relative flex items-center space-x-3 px-6 py-4 rounded-2xl bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:scale-105 ${icons[4].shadowColor} hover:shadow-xl`}
        >
          <div className={`p-3 rounded-xl bg-gradient-to-br ${icons[4].gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
            {icons[4].icon}
          </div>
          <div className="text-left">
            <span className="text-white font-semibold">{icons[4].label}</span>
            <p className="text-gray-400 text-sm">{icons[4].description}</p>
          </div>
        </button>
      </div>
 
    </div>
  );
};