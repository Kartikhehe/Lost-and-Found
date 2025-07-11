import React from 'react';
import './index.css';

function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img
          src="https://logowik.com/content/uploads/images/indian-institute-of-technology-kanpur-iit-kanpur9273.jpg"
          alt="IIT Logo"
          className="logo"
        />
        <label>Username</label>
        <input type="text" placeholder="Enter your username" />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
        <button className="Register-btn">Register</button>
        <p className="register-text">Already Signed in? Login here.</p>
      </div>
    </div>
  );
}

export default Login;
