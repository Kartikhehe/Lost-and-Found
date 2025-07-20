import { Modal, Box, TextField } from "@mui/material";
import Input from "./Input";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 560,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  height: "40px",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Popup({ open, handleClose, heading }) {
  // const navigate = useNavigate();
  const formRef = useRef(null);
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  // const handleFileChange = async (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) setFile(selectedFile);

  //   const uploadedUrl = await handleUpload();
  //   setURL(uploadedUrl);
  // };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please attach a file");
      setURL("");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wtlx4dxr");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqqnefplu/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("Cloudinary response:", JSON.stringify(data, null, 2));
      if (data.secure_url) {
        setURL(data.secure_url);
        console.log(data.secure_url);
        return data.secure_url;
      } else {
        console.error("Upload failed:", data);
        alert("Upload failed");
        return null;
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload error");
      return null;
    }
  };

  let status;
  if (heading === "REPORT FOUND ITEM") status = "Found";
  else status = "Lost";

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

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: "100%",
            }}
            ref={formRef}
            onSubmit={async (e) => {
              // e.preventDefault();

              const formData = new FormData(formRef.current);
              const formValues = Object.fromEntries(formData);
              formValues["status"] = status;

              console.log("Form values before POST:", formValues);

              const res = await fetch("http://localhost:5000/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues),
              });

              let data;
              try {
                data = await res.json();
              } catch (err) {
                const fallbackText = await res.text();
                console.error("❌ Could not parse JSON:", fallbackText);
                alert("❌ Server didn't return valid JSON.");
                return;
              }
              handleClose();
            }}
          >
            <Input
              style={{ height: "40px" }}
              name="itemName"
              label="Item name"
              type="text"
            />
            <Input
              style={{ height: "40px" }}
              name="location"
              label="Location"
              type="text"
            />
            <Input
              style={{ height: "40px" }}
              name="personName"
              label="Your name"
              type="text"
            />
            <Input
              style={{ height: "40px" }}
              name="phone"
              label="Phone number"
              type="text"
            />
            <TextField
              id="outlined-multiline-flexible"
              label="More details"
              multiline
              maxRows={4}
              name="details"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                height: "56px",
              }}
            >
              <Button
                style={{ height: "100%", width: "25%" }}
                disableElevation
                component="label"
                // role={undefined}
                variant="outlined"
                tabIndex={-1}
              >
                Upload
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleUpload}
                  multiple
                />
              </Button>
              <Input
                value={url}
                style={{ width: "75%" }}
                read={{ input: { readOnly: true } }}
                name="imgURL"
                label="Image URL"
              />
            </div>

            <Button type="submit" disableElevation variant="contained">
              SUBMIT
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
