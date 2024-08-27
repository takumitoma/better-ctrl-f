import { usePopupContext } from '../../PopupContext';
import { useFocusColorSync } from '../../hooks/useFocusColorSync';

export default function GoToSetFocusButton() {
  const { focusColor, setPage } = usePopupContext();

  useFocusColorSync();

  return (
    <button
      className="goto-color-button"
      style={{ backgroundColor: focusColor }}
      onClick={() => setPage('SetFocus')}
    />
  );
}
