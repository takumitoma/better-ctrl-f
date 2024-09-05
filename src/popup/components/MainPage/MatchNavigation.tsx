import React from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { useSearchContext } from '../../context';
import Button from '../common/Button';

interface MatchNavigationProps {
  index: number;
}

const MatchNavigation: React.FC<MatchNavigationProps> = ({ index }) => {
  const { searchQueries, totalMatches, incrementMatch, decrementMatch } =
    useSearchContext();

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
