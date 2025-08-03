import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        alert("Account created! Please log in.");
        navigate("/login");
    };

    return (
        <div className="auth-container text-center">
        <img src="images/iitk_logo.png" alt="IITK Logo" className="mb-3 auth-logo" />
        <h2 className="mb-3">Sign Up</h2>
        <form onSubmit={handleSignup} className="text-start">
            <input type="text" className="form-control mb-2" placeholder="Full Name" required />
            <input type="email" className="form-control mb-2" placeholder="Email" required />
            <input type="password" className="form-control mb-3" placeholder="Password" required />
            <button className="btn btn-success w-100">Create Account</button>
        </form>
        <p className="mt-3">
            Already have an account? <Link to="/login">Login</Link>
        </p>
        </div>
    );
};

export default Signup;
