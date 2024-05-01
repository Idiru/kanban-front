import Button from "@mui/material/Button";


export default function mainButton(props) {
  return (
    <div>
      <Button
        onClick={props.onClick}
        variant="contained"
        sx={{
          backgroundColor: "#635fc7",
          width: "174px",
          height: "48px",
          flexShrink: "0",
          borderRadius: "24px",
          border: "none",
          boxShadow: "none",
          '&:hover': {
          bgcolor: "#635fc7",
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
