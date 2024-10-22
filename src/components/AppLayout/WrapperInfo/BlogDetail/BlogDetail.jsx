import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import apiFetch from '../../../../utils/apiFetch';
import OwnerCard from './OwnerCard/OwnerCard';
import { SubscriptionContext } from '../../../../context/SubscriptionContext';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { subscribedBlogs, subscribeToBlog, unsubscribeFromBlog } = useContext(SubscriptionContext);

  const isSubscribed = subscribedBlogs.some(blog => blog.id === parseInt(id));

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await apiFetch(`/blogs/${id}`, 'GET');
      if (response.success) {
        setBlogData(response.data.data);
      } else {
        setError('Failed to fetch blog');
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  const handleSubscriptionToggle = () => {
    if (isSubscribed) {
      unsubscribeFromBlog(id);
    } else {
      subscribeToBlog(id);
    }
  };

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blogDetail">
      <div className="Hero">
        <h2>{blogData.name}</h2>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${blogData.image}`}
          alt={blogData.name}
          className="blog-detail-image"
        />
      </div>
      <p>{blogData.description}</p>

      {blogData.owner && (
        <OwnerCard
          name={blogData.owner.name}
          image={blogData.owner.profile_picture
            ? `${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${blogData.owner.profile_picture}`
            : ''
          }
        />
      )}

      <button onClick={handleSubscriptionToggle} className="subscribe-button">
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>
    </div>
  );
};

export default BlogDetail;
