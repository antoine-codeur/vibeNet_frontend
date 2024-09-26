import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Home from './views/Home';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Profile from './views/auth/Profile/Profile';
import PrivateRoute from './routes/PrivateRoute';
import Explore from './views/Explore';
import Blog from './views/Blog/Blog';
import MainLayout from './MainLayout.jsx';
import InfoWrapper from './components/deepPage/infoWrapper/infoWrapper';
import BlogWrapper from './components/BlogWrapper/BlogWrapper.jsx';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <MainLayout />
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
