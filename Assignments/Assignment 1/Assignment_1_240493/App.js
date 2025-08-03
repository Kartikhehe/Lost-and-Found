import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LOST_FOUND from './LOST_FOUND';
import Loginpage from './Loginpage';
import Register from './Register'

function App() {
  
  return (
   
  <Router>
      <Routes>
        <Route path="/" element={<  LOST_FOUND />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Register />}/>
      </Routes>
    </Router>
  );
  
}

export default App;
