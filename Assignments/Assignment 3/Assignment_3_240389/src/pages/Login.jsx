import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../components/AxiosInstance';
import logo from '../assets/logo2.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', { email: email.trim(), password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3"
      style={{
        backgroundColor: '#f1f1f1',
        backgroundImage: 'url(http://www.transparenttextures.com/patterns/diagmonds-light.png)'
      }}
    >
      <div className="card shadow-lg p-4 rounded-4 w-100" style={{ maxWidth: '420px' }}>
        <div className="text-center mb-4">
        <img src={logo} alt="Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
        </div>

        <h3 className="text-center mb-4">Welcome Back</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              autoComplete="email"
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
              autoComplete="current-password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button className="btn btn-primary w-100 mt-2" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;