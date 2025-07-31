import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/blog" element={<div className="p-8 text-center">Blog page coming soon!</div>} />
            <Route path="/lost" element={<HomePage />} />
            <Route path="/found" element={<HomePage />} />
            <Route path="/contact" element={<div className="p-8 text-center">Contact page coming soon!</div>} />
            <Route path="/about" element={<div className="p-8 text-center">About page coming soon!</div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

