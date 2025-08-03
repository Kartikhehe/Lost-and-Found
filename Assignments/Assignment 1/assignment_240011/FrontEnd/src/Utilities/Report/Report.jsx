import React from "react";
import Fab from "@mui/material/Fab";

function MyButton() {
  return (
    <Fab
      variant="extended"
      sx={{
        backgroundColor: "#0d6efd",
        position: "fixed",
        bottom: 30,
        right: 30,
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        textTransform: "capitalize",
        borderRadius: "30px",
        "&:hover": {
          backgroundColor: "primary.dark",
        },
      }}
    >
      Report
    </Fab>
  );
}

export default MyButton;