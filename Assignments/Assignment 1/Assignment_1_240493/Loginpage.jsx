import React from 'react';
import { useNavigate } from 'react-router-dom';

function Loginpage(onClose,onRegister) {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };
  return (
    
    <div style={{
      height: '100vh',
      backgroundColor: '#f2f2f2',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center'
      }}>
        <img src="https://www.employeeadda.com/wp-content/uploads/2022/11/IIT-Kanpur-.png" alt="Logo" style={{ width: '80px', marginBottom: '20px' }} />
        <input type="text" placeholder="Enter your username" style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input type="password" placeholder="Enter your password" style={{ width: '100%', marginBottom: '15px', padding: '8px' }} />
        <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
        <p style={{ color: 'red', marginTop: '10px' }}>
            <span
            onClick={onRegister}
            style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
          >
            New User?</span>
             <span
            onClick={handleRegisterClick}
            style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
          >
             Register here
             </span>
             </p>
             <button onClick={onClose} className="btn-close">X</button>
      </div>
    </div>
  );
}

export default Loginpage;