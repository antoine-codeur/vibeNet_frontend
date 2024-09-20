import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Home from './views/Home';
import { AuthProvider } from './context/AuthContext';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <>
          <Header />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          <Footer />
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
