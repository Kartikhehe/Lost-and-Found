import React from 'react';
import './index.css';
function Login({ onSwitch }) {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Indian_Institute_of_Technology_Kanpur_Logo.svg/1920px-Indian_Institute_of_Technology_Kanpur_Logo.svg.png"
          alt="IIT Logo"
          className="logo"
        />
        <label>Username</label>
        <input type="text" placeholder="Enter your username" />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
        <button className="login-btn">Login</button>
        <p style={{ color: 'red' }}>
          New User?{' '}
          <span style={{ cursor: 'pointer' }} onClick={onSwitch}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
