import { useModal } from '../context/ModalContext';
import { useState, useEffect, useRef } from 'react';
import { usePrice } from '../hooks/usePrice';

const tokenConfig = [
  {
    symbol: 'USDC',
    name: 'USDC.e price',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png'
  },
  {
    symbol: 'SOMNIA',
    name: 'SOMNIA price',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/37637.png'
  },
  {
    symbol: 'ETH',
    name: 'ETH price',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
  }
];

interface HomeScreenProps { }

const formatLastUpdated = (date: Date | null): string => {
  if (!date) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffHours > 0) {
    return `${diffHours}h ago`;
  } else if (diffMins > 0) {
    return `${diffMins}m ago`;
  } else {
    return 'Just now';
  }
};

export const HomeScreen = ({ }: HomeScreenProps) => {

  const symbols = tokenConfig.map(token => token.symbol);

  const {
    prices,
    isLoading,
    error,
    getFormattedPrice,
    getFormattedChange,
    getLastUpdated
  } = usePrice({
    symbols
  });

  const { openModal } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Carousel data
  const carouselData = [
    {
      type: 'welcome',
      title: 'Welcome to Midnight',
      subtitle: 'AI Agent-Driven Lending',
      description: 'Mobile Mini App-first decentralized lending on Somnia using an AI agent to optimize your DeFi experience',
      gradient: 'from-black via-gray-950 to-black',
      accent: 'midnight'
    },
    {
      type: 'stats',
      title: 'Protocol Stats',
      items: [
        { label: 'Total Value Locked', value: '$2.4M', change: '+15.2%' },
        // { label: 'Active Wallets', value: '1,247', change: '+8.1%' },
        { label: 'AI Agents Active', value: '89', change: '+23.4%' }
      ],
      gradient: 'from-blue-900/50 via-blue-800/30 to-cyan-900/50',
      accent: 'blue'
    },
    {
      type: 'tokens',
      title: 'Supported Assets',
      gradient: 'from-green-900/50 via-emerald-800/30 to-teal-900/50',
      accent: 'green'
    }
  ];

  // Auto-rotate carousel and scroll content
  useEffect(() => {
    let slideTimer: NodeJS.Timeout;
    let scrollTimer: NodeJS.Timeout;

    const startSlideAndScroll = () => {
      // Reset scroll position
      const currentContent = contentRefs.current[currentSlide];
      console.log('Current content ref:', currentContent);
      if (currentContent) {
        currentContent.scrollTop = 0;
        console.log('Reset scroll to top');
      }

      // Start scrolling after 2 seconds
      scrollTimer = setTimeout(() => {
        const content = contentRefs.current[currentSlide];
        console.log('Starting scroll animation for:', content);
        if (content) {
          const maxScroll = content.scrollHeight - content.clientHeight;
          console.log('Max scroll available:', maxScroll);
          if (maxScroll > 0) {
            let scrolled = 0;
            const scrollStep = maxScroll / 30; // 30 steps for smooth animation

            const scrollInterval = setInterval(() => {
              scrolled += scrollStep;
              if (scrolled >= maxScroll) {
                content.scrollTop = maxScroll;
                clearInterval(scrollInterval);
                console.log('Scroll animation complete');
              } else {
                content.scrollTop = scrolled;
              }
            }, 50); // 50ms intervals for smooth scrolling
          }
        }
      }, 2000);

      // Move to next slide after 5 seconds
      slideTimer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
      }, 5000);
    };

    startSlideAndScroll();

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(scrollTimer);
    };
  }, [currentSlide, carouselData.length]);

  const icons = [
    {
      id: 'agent',
      label: 'Agent',
      icon: (
        <h1 className='text-3xl font-extrabold'>A</h1>
      ),
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'supply',
      label: 'Supply',
      icon: (
        <h1 className='text-3xl font-extrabold'>S</h1>
      ),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'borrow',
      label: 'Borrow',
      icon: (
        <h1 className='text-3xl font-extrabold'>B</h1>
      ),
      gradient: 'from-blue-500 to-cyan-600'
    },

    {
      id: 'faq',
      label: 'FAQ',
      icon: (
        <h1 className='text-3xl font-extrabold'>F</h1>
      ),
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'midnight',
      label: 'Midnight',
      icon: (
        <h1 className='text-3xl font-extrabold'>M</h1>
      ),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'quests',
      label: 'Quests',
      icon: (
        <h1 className='text-3xl font-extrabold'>Q</h1>
      ),
      gradient: 'from-teal-500 to-green-600'
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: (
        <h1 className='text-3xl font-extrabold'>L</h1>
      ),
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  const handleIconClick = (iconId: any) => {
    if (['supply', 'borrow', 'faq', 'agent'].includes(iconId)) {
      openModal(iconId);
    } else {
      alert(`${iconId} clicked - coming soon!`);
    }
  };

  const renderCarouselSlide = (slide: any, index: number) => {
    switch (slide.type) {
      case 'welcome':
        return (
          <div
            className="relative z-10 h-full flex flex-col items-center justify-center text-center"
          >
            {/* Background effects matching splash page */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="space-y-4 pb-4 relative z-10">
              {/* Logo with glow effect */}
              <div className="flex justify-center relative mb-4">
                <div className="relative">
                  <img
                    src="/logo.png"
                    alt="Midnight Protocol"
                    className="w-[60%] mx-auto object-contain"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
              <p className="text-gray-300 mx-auto text-sm leading-relaxed max-w-lg animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                {slide.description}
              </p>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div
            ref={(el) => { contentRefs.current[index] = el; }}
            className="relative z-10 h-full overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="space-y-4 pb-2">
              <h3 className="text-white font-semibold text-lg">{slide.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {slide.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-blue-200 text-sm">{item.label}</p>
                      <p className="text-white font-semibold text-lg">{item.value}</p>
                    </div>
                    <span className="text-green-400 text-sm font-medium">{item.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'tokens':
        return (
          <div
            ref={(el) => { contentRefs.current[index] = el; }}
            className="relative z-10 h-full overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="space-y-4 pb-2">
              <h3 className="text-white font-semibold text-lg">{slide.title}</h3>

              {isLoading && Object.keys(prices).length === 0 && (
                <div className='p-4 text-white'>
                  Loading prices...
                </div>
              )}
              {!isLoading && Object.keys(prices).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {tokenConfig.map((token: any, idx: number) => {
                    const price = getFormattedPrice(token.symbol);
                    const change = getFormattedChange(token.symbol);
                    const lastUpdated = getLastUpdated(token.symbol);

                    return (
                      <div key={idx} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className='w-8 h-8 rounded-full flex items-center justify-center overflow-hidden'>
                            <img src={token.icon} alt={`${token.symbol} Logo`} />
                          </div>
                          <div>
                            <p className="text-white font-medium">{token.name}</p> 
                            {lastUpdated && (
                              <p className="text-gray-400 text-xs mt-1">
                                {lastUpdated ? formatLastUpdated(lastUpdated) : ''}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{price}</p> 
                          <p className={`text-sm font-medium ${change.isPositive ? 'text-green-400' : 'text-red-400'
                            }`}> 
                            {change.text}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 pb-safe max-w-2xl  mx-auto">
      {/* Carousel */}
      <div className="relative">
        <div
          className={`bg-gradient-to-br ${carouselData[currentSlide].gradient} backdrop-blur-sm border border-gray-700/40 rounded-xl p-6 relative overflow-hidden transition-all duration-500`}
          style={{ height: '200px' }}
        >
          {renderCarouselSlide(carouselData[currentSlide], currentSlide)}

          {/* Background decoration for non-welcome slides */}
          {carouselData[currentSlide].type !== 'welcome' && (
            <>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-xl"></div>
            </>
          )}
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/40'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-white font-semibold text-lg">Quick Actions</h3>
        </div>

        {/* Action Icons Grid - 4 per row */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-lg mx-auto">
          {icons.map((item) => (
            <button
              key={item.id}
              onClick={() => handleIconClick(item.id)}
              className="group flex flex-col items-center space-y-2 p-3 md:p-4 transition-all duration-300 active:scale-95"
            >
              {/* Icon */}
              <div className={`flex items-center justify-center   p-2 md:p-3 h-[60px] w-[60px] rounded-xl bg-gradient-to-br ${item.gradient} text-white group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                {item.icon}
              </div>

              {/* Label */}
              <span className="text-white font-medium text-sm md:text-base text-center leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};