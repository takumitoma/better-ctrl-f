import { useEffect } from 'react';
import { usePopupContext } from '../PopupContext';
import GoToHomeButton from './SetColor/GoToHomeButton';
import ColorPicker from './SetColor/ColorPicker';

export default function SetFocusPage() {
  const { focusColor, setFocusColor } = usePopupContext();

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateFocusColor',
      focusColor,
    });
  }, [focusColor]);

  return (
    <div>
      <GoToHomeButton />
      <hr />
      <h1 className="title">
        Edit <span style={{ backgroundColor: focusColor }}>focus</span> color
      </h1>
      <ColorPicker color={focusColor} onChange={setFocusColor} />
    </div>
  );
}
