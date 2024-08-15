import SearchBar from './SearchBar';
import MatchCounter from './MatchCounter';
import Divider from './Divider';
import MatchNavigation from './MatchNavigation';
import CloseButton from './CloseButton';

export default function Popup() {
  return (
    <div id="popup">
      <SearchBar />
      <MatchCounter />
      <Divider />
      <MatchNavigation />
      <CloseButton />
    </div>
  )
}