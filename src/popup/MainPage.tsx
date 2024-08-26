import SearchBar from './SearchBar';
import MatchCounter from './MatchCounter';
import Divider from './Divider';
import MatchNavigation from './MatchNavigation';
import GoToSetHighlightButton from './GoToSetHighlightButton';

export default function Home() {
  return (
    <div id="main">
      <SearchBar />
      <MatchCounter />
      <Divider />
      <MatchNavigation />
      <GoToSetHighlightButton />
    </div>
  );
}
