import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../components/AxiosInstance';
import logo from '../assets/logo2.png';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/auth/register', { name, email, password });
      alert('Registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Try again with a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3"
      style={{
        backgroundColor: '#f1f1f1',
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/diagmonds-light.png)'
      }}
    >
      <div className="card shadow-lg p-4 rounded-4 w-100" style={{ maxWidth: '420px' }}>
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: '100px' }}
          />
        </div>

        <h3 className="text-center mb-4">Create Account</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success w-100 mt-2" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;