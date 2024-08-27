import SearchBar from './Main/SearchBar';
import MatchCounter from './Main/MatchCounter';
import Divider from './Main/Divider';
import MatchNavigation from './Main/MatchNavigation';
import GoToSetHighlightButton from './Main/GoToSetHighlightButton';
import GoToSetFocusButton from './Main/GoToSetFocusButton';

export default function Home() {
  return (
    <div id="main">
      <SearchBar />
      <MatchCounter />
      <Divider />
      <MatchNavigation />
      <GoToSetHighlightButton />
      <GoToSetFocusButton />
    </div>
  );
}
