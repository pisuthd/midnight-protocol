interface HomeScreenProps {
  onIconClick: (action: string) => void;
}

export const HomeScreen = ({ onIconClick }: HomeScreenProps) => {
  const icons = [
    {
      id: 'supply',
      label: 'Supply',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'borrow',
      label: 'Borrow',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Midnight Protocol</h1>
        <p className="text-gray-400">Somnia Lending Hub</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
        {icons.map((item) => (
          <button
            key={item.id}
            onClick={() => onIconClick(item.id)}
            className="group flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:scale-105"
          >
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white group-hover:scale-110 transition-transform duration-200`}>
              {item.icon}
            </div>
            <span className="text-white font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};