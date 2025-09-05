import { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./components/HomeScreen";
import { PortfolioScreen } from "./components/PortfolioScreen";
import { WalletScreen } from "./components/WalletScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'portfolio' | 'wallet'>('home');

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  const handleIconClick = (action: string) => {
    console.log('Icon clicked:', action);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onIconClick={handleIconClick} />;
      case 'portfolio':
        return <PortfolioScreen />;
      case 'wallet':
        return <WalletScreen />;
      default:
        return <HomeScreen onIconClick={handleIconClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      <div className="max-w-2xl mx-auto h-screen flex flex-col">
        <Header onSettingsClick={handleSettingsClick} />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;