import React, { useEffect } from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { usePopupContext } from '../../context/PopupContext';
import Button from '../common/Button';

const MatchNavigation: React.FC = () => {
  const { searchQuery, totalMatches, incrementMatch, decrementMatch } =
    usePopupContext();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault();
        decrementMatch();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [decrementMatch]);

  const isEnabled = searchQuery && totalMatches > 0;

  return (
    <>
      <Button
        onClick={decrementMatch}
        disabled={!isEnabled}
        icon={<HiChevronUp />}
      />
      <Button
        onClick={incrementMatch}
        disabled={!isEnabled}
        icon={<HiChevronDown />}
      />
    </>
  );
};

export default MatchNavigation;
