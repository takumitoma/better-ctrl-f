import React from 'react';
import SearchBar from './SearchBar';
import MatchCounter from './MatchCounter';
import Divider from '../common/Divider';
import MatchNavigation from './MatchNavigation';
import GotoColorButton from '../common/GotoColorButton';
import { useColorContext, useNavigationContext } from '../../context';

interface QueryRowProps {
  index: number;
}

const QueryRow: React.FC<QueryRowProps> = ({ index }) => {
  const { state } = useColorContext();
  const { setPage } = useNavigationContext();

  return (
    <div className="search-query-row">
      <SearchBar index={index} />
      <MatchCounter index={index} />
      <Divider />
      <MatchNavigation index={index} />
      <GotoColorButton
        backgroundColor={state.highlightColors[index]}
        onClick={() => setPage(`SetHighlight-${index}`)}
      />
      <GotoColorButton
        backgroundColor={state.focusColors[index]}
        onClick={() => setPage(`SetFocus-${index}`)}
      />
    </div>
  );
};

export default QueryRow;
