import { ReactNode, useReducer } from 'react';
import { ModalContext, modalReducer, initialModalState, ModalContextType } from './ModalContext';

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, dispatch] = useReducer(modalReducer, initialModalState);

  const openModal: ModalContextType['openModal'] = (modalType, data) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { modalType, data },
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