import React from 'react';
import './index.css';

function Login() {
  return (
    <div className="register-wrapper">
      <div className="register-card">
        <img
          src="https://logowik.com/content/uploads/images/indian-institute-of-technology-kanpur-iit-kanpur9273.jpg"
          alt="IIT Logo"
          className="logo"
        />
        <label>Username</label>
        <input type="text" placeholder="Enter your username" />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
        <button className="register-btn">Login</button>
        <p className="register-text">New User? <a href="http://localhost:5175" target="_blank" rel="noopener noreferrer">Register here</a></p>
      </div>
    </div>
  );
}

export default Login;
