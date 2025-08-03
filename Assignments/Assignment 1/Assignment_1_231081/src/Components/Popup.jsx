import { Modal, Box, TextField } from "@mui/material";
import Input from "./Input";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function Popup({ open, handleClose, heading }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 style={{ fontWeight: 600 }}>{heading}</h4>

          <div
            style={{
              borderTop: "1px solid black",
              display: "flex",
            }}
          >
            <div
              style={{
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                marginTop: "10px",
                paddingRight: "10px",
                borderRight: "1px solid black",
                width: "400px",
              }}
            >
              <Input style={{ height: "40px" }} name="Item name" type="text" />
              <Input style={{ height: "40px" }} name="Location" type="text" />
              <Input style={{ height: "40px" }} name="Your name" type="text" />
              <Input
                style={{ height: "40px" }}
                name="Phone number"
                type="text"
              />
              <TextField
                id="outlined-multiline-flexible"
                label="More details"
                multiline
                maxRows={4}
              />
            </div>
            <div
              style={{
                margin: "12px 10px 5px 10px",
                height: "400x",
                width: "350px",
                border: "5px dashed black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              Upload Image of the item
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
