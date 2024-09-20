import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Home from './views/Home';
import { AuthProvider } from './context/AuthContext';
import Profile from './views/auth/Profile/Profile';
import PrivateRoute from './routes/PrivateRoute';
import Explore from './views/Explore';

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
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
          <Footer />
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;