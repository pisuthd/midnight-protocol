import { useEffect, useState } from 'react';
import { useModal } from '../context/ModalContext';

interface BaseModalProps {
  children: React.ReactNode;
}

export const BaseModal = ({ children }: BaseModalProps) => {
  const { state, closeModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (state.isOpen) {
      setIsVisible(true);
      // Small delay to ensure the element is rendered before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [state.isOpen]);

  if (!isVisible) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleBackdropClick}
      />
      
      {/* Modal Content */}
      <div
        className={`
          relative w-full max-w-2xl mx-auto bg-gradient-to-b from-gray-900 to-black border border-gray-700 shadow-2xl
          md:rounded-2xl md:max-h-[90vh] md:m-4
          transition-all duration-300 ease-out
          ${isAnimating 
            ? 'translate-y-0 opacity-100 md:scale-100' 
            : 'translate-y-full opacity-0 md:translate-y-8 md:scale-95'
          }
          ${state.isOpen ? 'rounded-t-3xl h-[90vh] md:h-auto' : 'h-0'}
        `}
      >
        {/* Handle bar for mobile */}
        <div className="flex justify-center pt-3 pb-2 md:hidden">
          <div className="w-12 h-1 bg-gray-500 rounded-full"></div>
        </div>

        {/* Close button for desktop */}
        <button
          onClick={handleClose}
          className="hidden md:block absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal body */}
        <div className="h-full overflow-y-auto overscroll-contain pb-safe">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};