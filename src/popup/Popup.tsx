import SearchBar from './SearchBar';
import MatchCounter from './MatchCounter';
import Divider from './Divider';
import MatchNavigation from './MatchNavigation';
import CloseButton from './CloseButton';
import { useState } from 'react';

export default function Popup() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentMatch, setCurrentMatch] = useState<number>(0); 
  const [totalMatches, setTotalMatches] = useState<number>(0);

  function incrementMatch() {
    if (!searchQuery) return;
    setCurrentMatch(prevMatch => prevMatch !== totalMatches ? prevMatch + 1 : 1);
  }

  function decrementMatch() {
    if (!searchQuery) return;
    setCurrentMatch(prevMatch => prevMatch === 0 ? totalMatches : prevMatch - 1)
  }

  return (
    <div id="popup">
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <MatchCounter 
        searchQuery={searchQuery} 
        currentMatch={currentMatch} 
        totalMatches={totalMatches} 
        setTotalMatches={setTotalMatches} 
      />
      <Divider />
      <MatchNavigation 
        searchQuery={searchQuery} 
        incrementMatch={incrementMatch}
        decrementMatch={decrementMatch}
      />
      <CloseButton />
    </div>
  )
}
