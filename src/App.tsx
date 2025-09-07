import { useState, useEffect } from "react";
import { ModalProvider } from "./context/ModalProvider";
import { SplashScreen } from "./components/SplashScreen";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./components/HomeScreen";
import { PortfolioScreen } from "./components/PortfolioScreen";
import { WalletScreen } from "./components/WalletScreen";
import { ChatScreen } from "./components/ChatScreen";
import { GlobalModal } from "./components/GlobalModal";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'portfolio' | 'wallet'>('home');

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'portfolio':
        return <PortfolioScreen />;
      case 'wallet':
        return <WalletScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <ModalProvider>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="max-w-2xl mx-auto h-screen flex flex-col">
          <Header />

          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>

          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <GlobalModal />
      </div>
    </ModalProvider>
  );
}

export default App;