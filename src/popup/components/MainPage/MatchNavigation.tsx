import React from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { usePopupContext } from '../../context/PopupContext';
import { useMatchNavigation } from '../../hooks/useMatchNavigation';
import { Button } from '../common/Button';

export const MatchNavigation: React.FC = () => {
  const { searchQuery, totalMatches, incrementMatch, decrementMatch } =
    usePopupContext();

  useMatchNavigation();

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
