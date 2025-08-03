import { TextField } from "@mui/material";
import { useState } from "react";

export default function Input({ name, type, cls, style }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputValue(newValue);
  }

  return (
    <TextField
      style={style}
      name={name}
      value={inputValue}
      onChange={handleChange}
      type={type}
      className={cls}
      id="outlined-basic"
      label={name}
      variant="outlined"
    />
  );
}
