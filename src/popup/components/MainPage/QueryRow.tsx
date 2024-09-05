import React from 'react';
import SearchBar from './SearchBar';
import MatchCounter from './MatchCounter';
import Divider from '../common/Divider';
import MatchNavigation from './MatchNavigation';
import Button from '../common/Button';
import { useColorContext, useNavigationContext } from '../../context';

interface QueryRowProps {
  index: number;
}

const QueryRow: React.FC<QueryRowProps> = ({ index }) => {
  const { highlightColors, focusColors } = useColorContext();
  const { setPage } = useNavigationContext();

  return (
    <div className="search-query-row">
      <SearchBar index={index} />
      <MatchCounter index={index} />
      <Divider />
      <MatchNavigation index={index} />
      <Button
        className="goto-color-button"
        style={{ backgroundColor: highlightColors[index] }}
        onClick={() => setPage(`SetHighlight-${index}`)}
      />
      <Button
        className="goto-color-button"
        style={{ backgroundColor: focusColors[index] }}
        onClick={() => setPage(`SetFocus-${index}`)}
      />
    </div>
  );
};

export default QueryRow;
