import Button from "@mui/material/Button";

export default function mainButton(props) {
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "var(--Main-Purple)",
          width: "174px",
          height: "48px",
          flexShrink: "0",
          borderRadius: "24px",
          border: "none",
          boxShadow: "none",
          '&:hover': {
          bgcolor: "var(--Main-Purple)",
          opacity: "0.5",
          boxShadow: "none",
          border: "none",
        },
        '&:focus': {
            outline: 'none',
            border: 'none',
            boxShadow: 'none'
        }
        }}
      >{props.text}
      </Button>
    </div>
  );
}
