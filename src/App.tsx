import Popup from './popup/Popup';
import {
  SearchProvider,
  ColorProvider,
  SettingsProvider,
  NavigationProvider,
} from './popup/context';

export default function App() {
  return (
    <NavigationProvider>
      <SettingsProvider>
        <SearchProvider>
          <ColorProvider>
            <Popup />
          </ColorProvider>
        </SearchProvider>
      </SettingsProvider>
    </NavigationProvider>
  );
}
