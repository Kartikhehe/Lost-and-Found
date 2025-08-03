import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png'

function NavBar({ onResetFilters, onFilterLost, onFilterFound, onToggleMyItems }) {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-middle me-2"
          />
          <span className="fs-5">Lost & Found</span>
        </Link>
        <div className="d-flex order-lg-3 ms-auto">
          {token ? (
            <>
            <button onClick={onToggleMyItems} className="btn btn-outline-light me-2">
              My Items
            </button>
              <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/register" className="btn btn-outline-light">Register</Link>
            </>
          )}
        </div>
        <button
          className="navbar-toggler order-lg-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center order-lg-2" id="navbarContent">
        <ul className="navbar-nav gap-3">
          <li className="nav-item">
            <Link className="nav-link active" to="/" onClick={onResetFilters}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={onFilterLost}>Lost Items</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={onFilterFound}>Found Items</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#contact">Contact</a>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;