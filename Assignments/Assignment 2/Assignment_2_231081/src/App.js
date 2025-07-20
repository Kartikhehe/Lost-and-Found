import LoginPage from "./Pages/login";
import RegisterPage from "./Pages/register";
import Home from "./Pages/home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Popup from "./Components/Popup";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
      <Popup />
    </>
  );
}
