import { usePopupContext } from './PopupContext';
import SetHighlightPage from './Pages/SetHighlightPage';
import MainPage from './Pages/MainPage';

export default function Popup() {
  const { page } = usePopupContext();

  return (
    <div id="popup">
      {page === 'Main' && <MainPage />}
      {page === 'PickColor' && <SetHighlightPage />}
    </div>
  );
}
