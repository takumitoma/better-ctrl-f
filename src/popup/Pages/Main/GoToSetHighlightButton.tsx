import { usePopupContext } from '../../PopupContext';
import { useHighlightColorSync } from '../../hooks/useHighlightColorSync';

export default function GoToSetHighlightButton() {
  const { highlightColor, setPage } = usePopupContext();

  useHighlightColorSync();

  return (
    <button
      className="goto-color-button"
      style={{ backgroundColor: highlightColor }}
      onClick={() => setPage('SetHighlight')}
    />
  );
}
