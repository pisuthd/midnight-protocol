import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400); // Wait for fade out animation
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-950 to-black z-50 flex items-center justify-center transition-opacity duration-400 opacity-0 pointer-events-none">
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-950 to-black z-50 flex items-center justify-center transition-opacity duration-300">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center space-y-8 z-10">
        {/* Logo with animation */}
        <div className="flex justify-center relative">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="Midnight Protocol" 
              className="w-[80%] mx-auto object-contain "
            />
            {/* Glow effect */}
            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
          </div>
        </div>

        {/* Text content with staggered animation */}
        <div className="space-y-4">
           
          <p className="text-gray-400 text-xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Somnia Lending Hub
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-3 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="w-64 mx-auto">
            <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
              <div 
                className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <p className="text-gray-600 text-xs">
            {progress < 100 ? 'Loading...' : 'Ready!'}
          </p>
        </div>
 
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};