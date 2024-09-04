import React, { useEffect } from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { usePopupContext } from '../../context/PopupContext';
import Button from '../common/Button';

interface MatchNavigationProps {
  index: number;
}

const MatchNavigation: React.FC<MatchNavigationProps> = ({ index }) => {
  const { searchQueries, totalMatches, incrementMatch, decrementMatch } =
    usePopupContext();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault();
        decrementMatch(index);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [decrementMatch]);

  const isEnabled = searchQueries[index] && totalMatches[index] > 0;

  return (
    <>
      <Button
        onClick={() => decrementMatch(index)}
        disabled={!isEnabled}
        icon={<HiChevronUp />}
      />
      <Button
        onClick={() => incrementMatch(index)}
        disabled={!isEnabled}
        icon={<HiChevronDown />}
      />
    </>
  );
};

export default MatchNavigation;
