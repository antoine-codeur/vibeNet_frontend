import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/AppLayout/Header';
import Footer from './components/AppLayout/AppFooter';
import Login from './views/App/auth/Login';
import Register from './views/App/auth/Register';
import Home from './views/App/Home/Home';
import Profile from './views/App/auth/Profile/Profile';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

// Import du layout pour la landing page
import LandingLayout from './components/LandingLayout/LandingLayout';
import AuthLayout from './components/AuthLayout/AuthLayout';

// Import des pages statiques pour la landing page
import Landing from './views/Landing/Landing/Landing';
import Discover from './views/Landing/Discover/Discover';
import Support from './views/Landing/Support/Support';
import Legals from './views/Landing/Legals/Legals';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes Landing */}
          <Route path="/" element={<LandingLayout><Landing /></LandingLayout>} />
          <Route path="/discover" element={<LandingLayout><Discover /></LandingLayout>} />
          <Route path="/support" element={<LandingLayout><Support /></LandingLayout>} />
          <Route path="/legals" element={<LandingLayout><Legals /></LandingLayout>} />

          {/* Routes Auth */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

          {/* Routes App */}
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
