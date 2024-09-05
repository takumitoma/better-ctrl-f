import React from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { useSearchContext } from '../../context';
import Button from '../common/Button';

interface MatchNavigationProps {
  index: number;
}

const MatchNavigation: React.FC<MatchNavigationProps> = ({ index }) => {
  const { state, dispatch } = useSearchContext();

  const isEnabled = state.searchQueries[index] && state.totalMatches[index] > 0;

  return (
    <>
      <Button
        onClick={() => dispatch({ type: 'DECREMENT_MATCH', payload: index })}
        disabled={!isEnabled}
        icon={<HiChevronUp />}
      />
      <Button
        onClick={() => dispatch({ type: 'INCREMENT_MATCH', payload: index })}
        disabled={!isEnabled}
        icon={<HiChevronDown />}
      />
    </>
  );
};

export default MatchNavigation;
