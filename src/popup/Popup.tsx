import SearchBar from './SearchBar';
import MatchCounter from './MatchCounter';
import MatchNavigation from './MatchNavigation';
import CloseButton from './CloseButton';

export default function Popup() {
  return (
    <h1>
      <SearchBar />
      <MatchCounter />
      <MatchNavigation />
      <CloseButton />
    </h1>
  )
}