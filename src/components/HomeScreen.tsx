import { useModal } from '../context/ModalContext';
import { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';

interface HomeScreenProps { }

export const HomeScreen = ({ }: HomeScreenProps) => {
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
        { label: 'Active Users', value: '1,247', change: '+8.1%' },
        { label: 'AI Agents Active', value: '89', change: '+23.4%' }
      ],
      gradient: 'from-blue-900/50 via-blue-800/30 to-cyan-900/50',
      accent: 'blue'
    },
    {
      type: 'tokens',
      title: 'Supported Assets',
      tokens: [
        { symbol: 'SOMI', name: 'Somnia Token', price: '$0.0234', apy: '12.5%', change: '+12.5%' },
        { symbol: 'USDC.e', name: 'USD Coin', price: '$1.00', apy: '8.2%', change: '+0.01%' },
        { symbol: 'ETH', name: 'Ethereum', price: '$2,456', apy: '6.8%', change: '+2.3%' }
      ],
      gradient: 'from-green-900/50 via-emerald-800/30 to-teal-900/50',
      accent: 'green'
    },
    {
      type: 'rates',
      title: 'Interest Rates',
      subtitle: 'Current market rates',
      rates: [
        { asset: 'SOMI', supply: '12.5%', borrow: '15.2%' },
        { asset: 'USDC.e', supply: '8.2%', borrow: '11.8%' },
        { asset: 'ETH', supply: '6.8%', borrow: '9.4%' }
      ],
      gradient: 'from-orange-900/50 via-red-800/30 to-pink-900/50',
      accent: 'orange'
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
      label: 'Add Agent',
      icon: (
        <Plus size={32}/>
      ),
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'borrow',
      label: 'Borrow',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'supply',
      label: 'Supply',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'midnight',
      label: 'MIDNIGHT',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'quests',
      label: 'Quests',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      gradient: 'from-teal-500 to-green-600'
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'send',
      label: 'Send',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      gradient: 'from-rose-500 to-pink-600'
    }
  ];

  const handleIconClick = (iconId: string) => {
    if (['supply', 'borrow', 'faq', 'agent'].includes(iconId)) {
      openModal(iconId);
    } else {
      console.log(`${iconId} clicked - coming soon!`);
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
            <div className="space-y-4 pb-4">
              <h3 className="text-white font-semibold text-lg">{slide.title}</h3>
              <div className="space-y-3">
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
            <div className="space-y-4 pb-4">
              <h3 className="text-white font-semibold text-lg">{slide.title}</h3>
              <div className="space-y-3">
                {slide.tokens.map((token: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{token.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{token.symbol}</p>
                        <p className="text-green-200 text-sm">{token.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{token.price}</p>
                      <p className="text-green-400 text-sm">{token.apy} APY</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'rates':
        return (
          <div
            ref={(el) => { contentRefs.current[index] = el; }}
            className="relative z-10 h-full overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="space-y-4 pb-4">
              <div>
                <h3 className="text-white font-semibold text-lg">{slide.title}</h3>
                <p className="text-orange-200 text-sm">{slide.subtitle}</p>
              </div>
              <div className="space-y-3">
                {slide.rates.map((rate: any, idx: number) => (
                  <div key={idx} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-medium">{rate.asset}</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-300">Live</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="text-center">
                        <p className="text-green-400 font-semibold">{rate.supply}</p>
                        <p className="text-green-300 text-xs">Supply APY</p>
                      </div>
                      <div className="text-center">
                        <p className="text-red-400 font-semibold">{rate.borrow}</p>
                        <p className="text-red-300 text-xs">Borrow APY</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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