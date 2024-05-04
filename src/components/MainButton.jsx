import Button from "@mui/material/Button";

export default function mainButton({ onClick, state, text }) {
  return (
    <div>
      <button
        className="primary-button"
        onClick={onClick}
        disabled={state}
      >
        {text}
      </button>
    </div>
  );
}
