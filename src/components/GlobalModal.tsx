import { useModal } from '../context/ModalContext';
import { SupplyModal } from './SupplyModal';
import { BorrowModal } from './BorrowModal';
import { LearnModal } from './LearnModal';
import { SettingsModal } from './SettingsModal';

export const GlobalModal = () => {
  const { state } = useModal();

  if (!state.isOpen || !state.type) return null;

  const renderModal = () => {
    switch (state.type) {
      case 'supply':
        return <SupplyModal />;
      case 'borrow':
        return <BorrowModal />;
      case 'learn':
        return <LearnModal />;
      case 'settings':
        return <SettingsModal />;
      default:
        return null;
    }
  };

  return renderModal();
};