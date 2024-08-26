import { usePopupContext } from "../PopupContext";
import GoToHomeButton from "./SetColor/GoToHomeButton";
import ColorPicker from "./SetColor/ColorPicker";

export default function SetHighlightPage() {
  const { highlightColor, setHighlightColor } = usePopupContext();

  return (
    <div>
      <GoToHomeButton />
      <hr />
      <h1 className="title">
        Edit&nbsp;
        <span style={{ backgroundColor: highlightColor }}>highlight</span>&nbsp; color
      </h1>
      <ColorPicker color={highlightColor} onChange={setHighlightColor} />
    </div>
  );
}
