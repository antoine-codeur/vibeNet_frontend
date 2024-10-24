import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/App/auth/Login';
import Register from './views/App/auth/Register';
import Home from './views/App/Home/Home';
import Profile from './views/App/auth/Profile/Profile';
import Blog from './views/App/Blog/Blog';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext'; // Import your SubscriptionProvider
import { BlogProvider } from './context/BlogContext';

// Import layouts
import LandingLayout from './components/LandingLayout/LandingLayout';
import AuthLayout from './components/AuthLayout/AuthLayout';
import AppLayout from './components/AppLayout/AppLayout';
import SettingsLayout from './components/SettingsLayout/SettingsLayout';

// Import pages
import Landing from './views/Landing/Landing/Landing';
import Discover from './views/Landing/Discover/Discover';
import Support from './views/Landing/Support/Support';
import Legals from './views/Landing/Legals/Legals';
import Explore from './views/App/Explore/Explore';
import CreateBlog from './views/App/Blog/CreateBlog/CreateBlog';
import UpdateBlog from './views/App/Blog/UpdateBlog/UpdateBlog';

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <BlogProvider>
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

              {/* Routes Settings */}
              <Route path="/settings/profile" element={<SettingsLayout><PrivateRoute element={<Profile />} /></SettingsLayout>} />
              <Route path="/settings/blog/create" element={<SettingsLayout><PrivateRoute element={<CreateBlog />} /></SettingsLayout>} />
              <Route path="/settings/blog/update" element={<SettingsLayout><PrivateRoute element={<UpdateBlog />} /></SettingsLayout>} />

              {/* Routes App */}
              <Route path="/home" element={<AppLayout><PrivateRoute element={<Home />} /></AppLayout>} />
              <Route path="/explore" element={<AppLayout><PrivateRoute element={<Explore />} /></AppLayout>} />
              <Route path="/blogs/:id" element={<AppLayout><PrivateRoute element={<Blog />} /></AppLayout>} />
            </Routes>
          </Router>
        </BlogProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;
