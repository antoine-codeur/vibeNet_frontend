import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Profile from './views/auth/Profile/Profile';
import PrivateRoute from './routes/PrivateRoute';
import Explore from './views/Explore';
import Blog from './views/Blog/Blog';
import InfoWrapper from './components/deepPage/infoWrapper/infoWrapper';
import BlogWrapper from './components/BlogWrapper/BlogWrapper';

const MainLayout = () => {
  const location = useLocation(); // Now useLocation is within Router
  const [blogData, setBlogData] = useState(null); // Store blog data for InfoWrapper

  // Determine which component to use in InfoWrapper based on the current route
  const getInfoWrapperParam = () => {
    if (location.pathname.includes('/blog/')) {
      return { paramettre: 'blogInfo', blog: blogData }; // Pass blog data to InfoWrapper
    }
    return { paramettre: null };
  };

  return (
    <>
      <BlogWrapper />
      <InfoWrapper {...getInfoWrapperParam()} /> {/* Pass the correct parameter */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/blog/:id" element={<Blog setBlogData={setBlogData} />} /> {/* Pass setBlogData to Blog */}
      </Routes>
      <Footer />
    </>
  );
};

export default MainLayout;
