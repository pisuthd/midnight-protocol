import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-950 to-black z-50 flex items-center justify-center transition-opacity duration-300">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <img 
            src="/logo.png" 
            alt="Midnight Protocol" 
            className="w-[180px] object-contain"
          />
        </div>
        <div className="space-y-2"> 
          <p className="text-gray-400 text-lg">Welcome to Somnia lending hub</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};