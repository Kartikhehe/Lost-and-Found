import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useState } from "react";

export default function SearchBar({ handleOpen, setHeading }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputValue(newValue);
  }

  return (
    <div className="search-bar">
      <SearchIcon
        sx={{ height: "50px", width: "40px" }}
        className="icon"
        color="primary"
      />
      <input
        name="search"
        value={inputValue}
        onChange={handleChange}
        type="text"
        placeholder="Search for lost items.."
      />

      <Button
        onClick={() => {
          handleOpen();
          setHeading("REPORT FOUND ITEM");
        }}
        variant="contained"
        color="success"
        sx={{
          boxShadow: 0,
          ":hover": { boxShadow: 0 },
          borderRadius: 15,
          ml: 2,
          height: "50px",
        }}
      >
        Report found item
      </Button>
      <Button
        onClick={() => {
          handleOpen();
          setHeading("REQUEST LOST ITEM");
        }}
        variant="contained"
        color="error"
        sx={{
          boxShadow: 0,
          ":hover": { boxShadow: 0 },
          borderRadius: 15,
          ml: 2,
          height: "50px",
        }}
      >
        Request lost item
      </Button>
    </div>
  );
}
