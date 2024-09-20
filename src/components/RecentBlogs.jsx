import React, { useEffect, useState } from 'react';

const RecentBlogs = ({ limit }) => {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/v1/explore');
      const data = await response.json();
      if (data.success) {
        setRecentBlogs(data.data.slice(0, limit)); // Limite le nombre de blogs affichés
      }
    };

    fetchBlogs();
  }, [limit]);

  return (
    <div>
      <h2>Recent Blogs</h2>
      <ul>
        {recentBlogs.map(blog => (
          <li key={blog.id}>
            <h3>{blog.name}</h3>
            <p>{blog.description}</p>
            <img src={`http://127.0.0.1:8000/${blog.image}`} alt={blog.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentBlogs;
