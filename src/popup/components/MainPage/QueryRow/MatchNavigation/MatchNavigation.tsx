import React from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import IconButton from '../../../common/IconButton/IconButton';
import { useSearchContext } from '@context';

interface MatchNavigationProps {
  index: number;
}

const MatchNavigation: React.FC<MatchNavigationProps> = ({ index }) => {
  const { state, dispatch } = useSearchContext();

  const isEnabled = state.searchQueries[index] && state.totalMatches[index] > 0;

  return (
    <>
      <IconButton
        onClick={() => dispatch({ type: 'DECREMENT_MATCH', payload: index })}
        disabled={!isEnabled}
        icon={<HiChevronUp />}
      />
      <IconButton
        onClick={() => dispatch({ type: 'INCREMENT_MATCH', payload: index })}
        disabled={!isEnabled}
        icon={<HiChevronDown />}
      />
    </>
  );
};

export default MatchNavigation;
