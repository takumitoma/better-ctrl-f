import './App.css';
import Popup from './popup/Popup';
import { PopupProvider } from './popup/PopupContext';

export default function App() {
  return (
    <PopupProvider>
      <Popup />
    </PopupProvider>
  );
}
