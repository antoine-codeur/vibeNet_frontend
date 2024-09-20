import React, { useEffect, useState } from 'react';

const Explore = () => {
  const [blogs, setBlogs] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' ou 'desc'

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/explore`);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    };

    fetchBlogs();
  }, []);

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredBlogs = blogs
    .filter(blog => {
      const blogDate = new Date(blog.created_at);
      const dateMatch = filterDate ? blogDate.toISOString().split('T')[0] === filterDate : true;
      const searchMatch = blog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (blog.owner && blog.owner.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return dateMatch && searchMatch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div>
      <h2>Explore Blogs</h2>
      <input
        type="date"
        value={filterDate}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        placeholder="Search by name, description or owner"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={sortOrder} onChange={handleSortOrderChange}>
        <option value="desc">Sort by Date: Newest First</option>
        <option value="asc">Sort by Date: Oldest First</option>
      </select>
      <ul>
        {filteredBlogs.map(blog => (
          <li key={blog.id}>
            <h3>{blog.name}</h3>
            <p>{blog.description}</p>
            <p>Owner: {blog.owner.name}</p>
            <img src={`http://127.0.0.1:8000/${blog.image}`} alt={blog.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Explore;
