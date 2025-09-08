import { useModal } from '../context/ModalContext';
import { SupplyModal } from './SupplyModal';
import { BorrowModal } from './BorrowModal';
import { LearnModal } from './LearnModal';
import { SettingsModal } from './SettingsModal';
import { FaucetModal } from './FaucetModal';

export const GlobalModal = () => {
  
  const { state, closeModal } = useModal();

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
      case 'faucet':
        return (
          <FaucetModal 
            isOpen={true} 
            onClose={closeModal}
            onSuccess={() => {
              // Optionally refresh balances or show success message
              // setTimeout(() => {
              //   window.location.reload();
              // }, 2000);
            }}
          />
        );
      default:
        return null;
    }
  };

  return renderModal();
};