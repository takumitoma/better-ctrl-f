import { usePopupContext } from "../../PopupContext";

export default function GoToSetHighlightButton() {
  const { highlightColor, setPage } = usePopupContext();
  return (
    <button
      className="goto-color-button"
      style={{ backgroundColor: highlightColor }}
      onClick={() => setPage("PickColor")}
    />
  );
}
