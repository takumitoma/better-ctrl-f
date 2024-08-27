import { usePopupContext } from './PopupContext';
import MainPage from './Pages/MainPage';
import SetHighlightPage from './Pages/SetHighlightPage';
import SetFocusPage from './Pages/SetFocusPage';

export default function Popup() {
  const { page } = usePopupContext();

  return (
    <div id="popup">
      {page === 'Main' && <MainPage />}
      {page === 'SetHighlight' && <SetHighlightPage />}
      {page === 'SetFocus' && <SetFocusPage />}
    </div>
  );
}
