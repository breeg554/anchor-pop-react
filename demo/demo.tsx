import ReactDOM from "react-dom/client";
import { useAnchorPop } from "../src/index";

function Example() {
  const { anchorProps, popoverProps, isOpen } = useAnchorPop({ side: "auto" });

  return (
    <>
      <button {...anchorProps} className="px-3 py-2 border">
        🗑
      </button>
      <div
        {...popoverProps}
        style={{
          background: "#333",
          color: "#fff",
          padding: ".3rem .5rem",
          borderRadius: 4,
          opacity: isOpen ? 1 : 0,
          transition: "opacity 150ms",
        }}
      >
        Delete forever
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Example />);
