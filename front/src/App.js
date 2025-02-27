import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signupparent from './components/Signupparent';
import Admindashbord from './components/Admindashbord';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signupparent" element={<Signupparent />} />
            <Route path="/admindashbord" element={<Admindashbord />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
