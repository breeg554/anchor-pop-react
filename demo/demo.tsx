import ReactDOM from "react-dom/client";
import { useAnchorPop } from "../src/index";

function Example() {
  const { anchorProps, popoverProps, isOpen } = useAnchorPop<HTMLButtonElement, HTMLDivElement>({
    side: "auto",
    trigger: "hover",
  });

  return (
    <div
      style={{
        display: "flex",
        height: "200vh",
        width: "300vh",
        overflow: "auto",
      }}
    >
      <button {...anchorProps} style={{ width: "100px", height: "100px", marginLeft: "200px", marginTop: "200px" }}>
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
          transition: "opacity 350ms",
          width: "fit-content",
          height: "100px",
          whiteSpace: "nowrap",
        }}
      >
        Delete forever
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Example />);
