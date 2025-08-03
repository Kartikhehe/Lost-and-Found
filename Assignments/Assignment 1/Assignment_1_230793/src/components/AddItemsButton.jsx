import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// const customStyle = {
//   margine-right: "10px"
// };

function AddItemsButton(props) {
  
  function handleClick() {
    props.onClickAdd();
  }

  return (
    <button className="add-items" onClick={handleClick}><i className="fa-solid fa-plus" style={{ marginRight: '10px' }}></i>Add Items</button>
  );
}

export default AddItemsButton;