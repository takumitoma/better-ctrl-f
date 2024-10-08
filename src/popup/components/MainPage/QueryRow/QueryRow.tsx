import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import MatchCounter from './MatchCounter/MatchCounter';
import MatchNavigation from './MatchNavigation/MatchNavigation';
import Divider from '../../common/Divider/Divider';
import GotoColorButton from '../../common/GotoColorButton/GotoColorButton';
import { useColorContext } from '@context';
import './QueryRow.css';

interface QueryRowProps {
  index: number;
}

const QueryRow: React.FC<QueryRowProps> = ({ index }) => {
  const { state } = useColorContext();

  return (
    <div className="search-query-row">
      <SearchBar index={index} />
      <MatchCounter index={index} />
      <Divider />
      <MatchNavigation index={index} />
      <GotoColorButton
        backgroundColor={state.highlightColors[index]}
        page={`SetHighlight-${index}`}
      />
      <GotoColorButton
        backgroundColor={state.focusColors[index]}
        page={`SetFocus-${index}`}
      />
    </div>
  );
};

export default QueryRow;
