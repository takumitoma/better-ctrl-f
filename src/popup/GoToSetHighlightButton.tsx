import { usePopupContext } from './PopupContext';

export default function GoToSetHighlightButton() {
  const { highlightColor, setView } = usePopupContext();
  return (
    <button
      className="goto-color-button"
      style={{ backgroundColor: highlightColor }}
      onClick={() => setView('PickColor')}
    />
  );
}
