import { IoIosArrowRoundBack } from 'react-icons/io';
import { usePopupContext } from './PopupContext';

export default function GoToHomeButton() {
  const { setView } = usePopupContext();

  return (
    <button id="goto-home" type="button" onClick={() => setView('Main')}>
      <IoIosArrowRoundBack className="icon" />
      <p>Go Back</p>
    </button>
  );
}
