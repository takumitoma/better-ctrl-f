import { HiChevronUp } from 'react-icons/hi';
import { HiChevronDown } from 'react-icons/hi';

export default function MatchNavigation() {
  return (
    <>
      <button className="icon-button" id="temp">
        <HiChevronUp className="icon" />
      </button>
      <button className="icon-button">
        <HiChevronDown className="icon" />
      </button>
    </>
  )
}