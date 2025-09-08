import { ReactNode, useReducer } from 'react';
import { ModalContext, modalReducer, initialModalState, ModalContextType } from './ModalContext';

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, dispatch] = useReducer(modalReducer, initialModalState);

  const openModal: ModalContextType['openModal'] = (modalType, data) => {
    // Map frontend modal types to backend modal types
    let mappedModalType: 'supply' | 'borrow' | 'learn' | 'settings' | 'faucet';
    
    switch (modalType) {
      case 'agent':
        mappedModalType = 'learn'; // Map agent to learn for now
        break;
      case 'faq':
        mappedModalType = 'learn'; // Map faq to learn for now
        break;
      case 'faucet':
        mappedModalType = 'faucet';
        break;
      default:
        mappedModalType = modalType as 'supply' | 'borrow' | 'learn' | 'settings';
    }
    
    dispatch({
      type: 'OPEN_MODAL',
      payload: { modalType: mappedModalType, data },
    });
  };

  const closeModal: ModalContextType['closeModal'] = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const contextValue: ModalContextType = {
    state,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};