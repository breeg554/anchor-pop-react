import ReactDOM from "react-dom/client";
import { useAnchorPop } from "../src/index";

function Example() {
  const { anchorProps, popoverProps, isOpen } = useAnchorPop<HTMLButtonElement, HTMLDivElement>({
    side: "auto",
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <button {...anchorProps} style={{ width: "100px", height: "100px" }}>
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
          width: "fit-content",
          height: "300px",
          whiteSpace: "nowrap",
        }}
      >
        Delete forever
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Example />);
