import { useEffect } from 'react';
import { usePopupContext } from '../context/PopupContext';

export const useMatchNavigation = () => {
  const { decrementMatch } = usePopupContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && event.shiftKey) {
        decrementMatch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [decrementMatch]);
};