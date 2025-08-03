import React, { useState } from 'react'
import './LogInPage.css'

function LogInPage(props) {

  function handleSubmit(event) {
    props.onLogIn();
    event.preventDefault();
  }

  function closeLogInPage(event) {
    props.onClickClose();
    event.preventDefault();
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <img src="iitk_logo.png" alt="IITK logo" />
        <form>
          <p>Username</p>
          <input type="text" placeholder="Enter your username" />
          <p>Password</p>
          <input type="password" placeholder="Enter your password" />
          <input className="submit" onClick={handleSubmit} type="submit" value="Login" />
          <a class="new-user" href="registeration.html">New user? Register here</a>
        </form>
        <button className='close-login-button' onClick={closeLogInPage}>X</button>
      </div>
    </div>
  );
}

export default LogInPage;