import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-black text-white flex justify-between items-center text-2xl px-10 py-4">
      <div className="text-2xl font-bold">🧭 Lost & Found</div>
      <nav className="flex space-x-4">
        <Link to="/" className="text-white hover:text-gray-300 font-medium">Home</Link>
        <Link to="/blog" className="text-white hover:text-gray-300 font-medium">Blog</Link>
        <Link to="/lost" className="text-white hover:text-gray-300 font-medium">Lost</Link>
        <Link to="/found" className="text-white hover:text-gray-300 font-medium">Found</Link>
        <Link to="/contact" className="text-white hover:text-gray-300 font-medium">Contact</Link>
        <Link to="/about" className="text-white hover:text-gray-300 font-medium">About us</Link>
      </nav>
      
      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <span className="text-lg">Welcome, {user?.username}!</span>
          <button 
            onClick={handleLogout}
            className="bg-red-600 border border-red-600 px-3 py-1.5 text-white rounded-md text-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link 
          to="/login" 
          className="bg-transparent border border-white px-3 py-1.5 text-white rounded-md text-2xl hover:bg-white hover:text-black transition-colors cursor-pointer"
        >
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;

