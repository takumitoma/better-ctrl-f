import { HiChevronUp } from 'react-icons/hi';
import { HiChevronDown } from 'react-icons/hi';

type MatchNavigationProps = {
  searchQuery: string;
  incrementMatch: () => void;
  decrementMatch: () => void;
};

export default function MatchNavigation({
  searchQuery,
  incrementMatch,
  decrementMatch,
}: MatchNavigationProps) {
  return (
    <>
      <button 
        className="icon-button" 
        onClick={incrementMatch}
        style={{ pointerEvents: searchQuery ? 'auto' : 'none' }}
      >
        <HiChevronUp className="icon" />
      </button>
      <button 
        className="icon-button" 
        onClick={decrementMatch}
        style={{ pointerEvents: searchQuery ? 'auto' : 'none' }}
      >
        <HiChevronDown className="icon" />
      </button>
    </>
  )
}