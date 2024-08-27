import { usePopupContext } from '../PopupContext';
import { useHighlightColorSync } from '../hooks/useHighlightColorSync';
import GoToHomeButton from './SetColor/GoToHomeButton';
import ColorPicker from './SetColor/ColorPicker';

export default function SetHighlightPage() {
  const { highlightColor, setHighlightColor } = usePopupContext();

  useHighlightColorSync();

  return (
    <div>
      <GoToHomeButton />
      <hr />
      <h1 className="title">
        Edit <span style={{ backgroundColor: highlightColor }}>highlight</span>{' '}
        color
      </h1>
      <ColorPicker color={highlightColor} onChange={setHighlightColor} />
    </div>
  );
}
