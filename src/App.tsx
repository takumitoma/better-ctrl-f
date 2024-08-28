import Popup from './popup/Popup';
import { PopupProvider } from './popup/context/PopupContext';

export default function App() {
  return (
    <PopupProvider>
      <Popup />
    </PopupProvider>
  );
}
