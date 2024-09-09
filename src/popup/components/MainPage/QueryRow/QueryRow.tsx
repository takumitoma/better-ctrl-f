import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import MatchCounter from './MatchCounter/MatchCounter';
import Divider from '../../common/Divider/Divider';
import MatchNavigation from './MatchNavigation/MatchNavigation';
import GotoColorButton from '../../common/GotoColorButton/GotoColorButton';
import { useColorContext, useNavigationContext } from '../../../context';
import './QueryRow.css';

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
