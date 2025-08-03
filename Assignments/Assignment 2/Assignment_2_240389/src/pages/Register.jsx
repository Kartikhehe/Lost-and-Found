import { Link } from 'react-router-dom';

function Register() {
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
          <img
            src="src/assets/logo2.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: '100px' }}
          />
        </div>

        <h3 className="text-center mb-4">Create Account</h3>
        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              required
            />
          </div>
          <button className="btn btn-success w-100 mt-2" type="submit">
            Register
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