import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search lost items..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
