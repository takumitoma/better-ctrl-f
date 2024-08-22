import { HiX } from 'react-icons/hi';

export default function PopupClose() {
  function closePopup() {
    window.close();
  }

  return (
    <button className="icon-button" onClick={closePopup}>
      <HiX className="icon" />
    </button>
  );
}
