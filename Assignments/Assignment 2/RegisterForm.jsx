import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Redirect to home page on successful registration
      navigate('/');
    } catch (error) {
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center font-sans">
      <div className="bg-gray-300 p-8 rounded-xl shadow-lg w-80 text-center">
        <div className="mb-5">
          <img 
            src="/src/assets/image.png" 
            alt="User Avatar" 
            className="w-24 mx-auto rounded-full"
          />
        </div>
        
        <h2 className="mb-6 text-2xl font-semibold">Register here!!</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your Username"
              required
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              required
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="text-left">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              required
              minLength="6"
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="text-left">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your Password"
              required
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="flex items-center text-left">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="remember" className="text-sm">
              I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2.5 bg-blue-600 text-white text-base border-none rounded-md cursor-pointer mt-2.5 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <div className="mt-3 space-y-2">
            <Link 
              to="/forgot-password" 
              className="text-red-600 text-sm block hover:underline"
            >
              Forgot password?
            </Link>
            <Link 
              to="/login" 
              className="text-red-600 text-sm block hover:underline"
            >
              Already have an account? Login!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

