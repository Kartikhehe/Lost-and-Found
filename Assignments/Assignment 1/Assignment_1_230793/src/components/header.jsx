import React from 'react';
import ReactDOM from 'react-dom/client';

function Header(props) {

  function handleClick(event){
    props.onLogIn();
    event.preventDefault();
  }

  return (
    <header>
    <div id="navbar">
      <p>Lost and Found</p>
      <button  onClick={handleClick}>
        {props.name}
      </button>
    </div>
  </header>
  );
}

export default Header;