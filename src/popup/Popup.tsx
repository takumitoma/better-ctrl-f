import { usePopupContext } from './PopupContext';
import SetHighlightPage from './SetHighlightPage';
import MainPage from './MainPage';

export default function Popup() {
  const { view } = usePopupContext();

  return (
    <div id="popup">
      {view === 'Main' && <MainPage />}
      {view === 'PickColor' && <SetHighlightPage />}
    </div>
  );
}
