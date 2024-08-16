import SearchBar from './SearchBar';
import MatchCounter from './MatchCounter';
import Divider from './Divider';
import MatchNavigation from './MatchNavigation';
import CloseButton from './CloseButton';
import { PopupProvider } from './PopupContext';

export default function Popup() {
  return (
    <PopupProvider>
      <div id="popup">
        <SearchBar />
        <MatchCounter />
        <Divider />
        <MatchNavigation />
        <CloseButton />
      </div>
    </PopupProvider>
  );
};
