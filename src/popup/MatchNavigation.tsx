import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { usePopupContext } from './PopupContext';

export default function MatchNavigation() {
  const { searchQuery, incrementMatch, decrementMatch } = usePopupContext();

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
