import { createContext, useContext, ReactNode } from 'react';

export interface ModalState {
  isOpen: boolean;
  type: 'supply' | 'borrow' | 'learn' | 'settings' | null;
  data?: any;
}

export type ModalAction =
  | { type: 'OPEN_MODAL'; payload: { modalType: 'supply' | 'borrow' | 'learn' | 'settings'; data?: any } }
  | { type: 'CLOSE_MODAL' };

export const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        isOpen: true,
        type: action.payload.modalType,
        data: action.payload.data,
      };
    case 'CLOSE_MODAL':
      return {
        isOpen: false,
        type: null,
        data: undefined,
      };
    default:
      return state;
  }
};

export const initialModalState: ModalState = {
  isOpen: false,
  type: null,
  data: undefined,
};

export interface ModalContextType {
  state: ModalState;
  openModal: (modalType: 'agent' | 'supply' | 'borrow' | 'faq' | 'learn' | 'settings', data?: any) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};