import { useEffect } from "react";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import { usePopupContext } from "../../PopupContext";

export default function MatchNavigation() {
  const { searchQuery, totalMatches, incrementMatch, decrementMatch } = usePopupContext();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Enter" && event.shiftKey) {
        decrementMatch();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <button
        className="icon-button"
        onClick={decrementMatch}
        style={{
          pointerEvents: searchQuery && totalMatches > 0 ? "auto" : "none",
        }}
      >
        <HiChevronUp className="icon" />
      </button>
      <button
        className="icon-button"
        onClick={incrementMatch}
        style={{
          pointerEvents: searchQuery && totalMatches > 0 ? "auto" : "none",
        }}
      >
        <HiChevronDown className="icon" />
      </button>
    </>
  );
}
