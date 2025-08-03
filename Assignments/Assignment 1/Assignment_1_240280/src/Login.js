import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        navigate("/");
    };

    return (
        <div className="auth-container text-center">
        <img src="images/iitk_logo.png" alt="IITK Logo" className="mb-3 auth-logo" />
        <h2 className="mb-3">Login</h2>
        <form onSubmit={handleLogin} className="text-start">
            <input type="email" className="form-control mb-2" placeholder="Email" required />
            <input type="password" className="form-control mb-3" placeholder="Password" required />
            <button className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3">
            Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        </div>
    );
};

export default Login;