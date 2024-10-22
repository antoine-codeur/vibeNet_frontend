import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SubscriptionContext } from '../../../context/SubscriptionContext';
import './SubscribedBlogs.css';

const SubscribedBlogs = () => {
  const { subscribedBlogs, loading, error } = useContext(SubscriptionContext);

  if (loading) return <p>Loading subscribed blogs...</p>;
  if (error) return <p>{error}</p>;

  if (subscribedBlogs.length === 0) {
    return <p>You have no subscriptions.</p>;
  }

  return (
    <div className="subscribedBlogs">
      <Link to={`/home`} className="blogItem">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='blogImage'>
          <path className='icon' d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
        </svg>
        <div className="blogNameOverlay">Home Page</div>
      </Link>
      <Link to={`/explore`} className="blogItem">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='blogImage'>
        <path className='icon' d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7 69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
      </svg>
        <div className="blogNameOverlay">Explore Page</div>
      </Link>
      <hr />
      {subscribedBlogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id} className="blogItem">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${blog.image}`}
            alt={blog.name}
            className="blogImage"
          />
          <div className="blogNameOverlay">{blog.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default SubscribedBlogs;
