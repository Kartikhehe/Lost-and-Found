import { TextField } from "@mui/material";
import { useState } from "react";

export default function Input({
  InputLabelProps,
  value,
  read,
  name,
  label,
  type,
  cls,
  style,
}) {
  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      style={style}
      name={name}
      value={value}
      type={type}
      className={cls}
      id="outlined-basic"
      label={label}
      variant="outlined"
      slotProps={read}
    />
  );
}
