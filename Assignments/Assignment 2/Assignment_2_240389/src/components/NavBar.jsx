import { Link } from 'react-router-dom';

function NavBar({ onResetFilters, onFilterLost, onFilterFound }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="src/assets/logo1.png"
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-middle me-2"
          />
          <span className="fs-5">Lost & Found</span>
        </a>
        <div className="d-flex order-lg-3 ms-auto">
          <Link to="/login" className="btn btn-outline-light">
            Login
          </Link>
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
              <a className="nav-link active" href="#" onClick={onResetFilters}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={onFilterLost}>Lost Items</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={onFilterFound}>Found Items</a>
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