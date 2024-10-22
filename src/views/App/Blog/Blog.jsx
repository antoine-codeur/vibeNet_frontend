import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import apiFetch from '../../../utils/apiFetch';
import PostCard from '../../../components/AppLayout/Posts/PostCard/PostCard';
import CreatePost from '../../../components/AppLayout/Posts/CreatePost/CreatePost';
import { BlogContext } from '../../../context/BlogContext'; // Import BlogContext
import './Blog.css';

const Blog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null); // Store the current blog's data
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ownerBlogId } = useContext(BlogContext); // Get ownerBlogId from BlogContext

  useEffect(() => {
    const fetchBlogData = async () => {
      const blogResponse = await apiFetch(`/blogs/${id}`, 'GET'); // Fetch the blog data for the current page
      if (blogResponse.success) {
        setBlogData(blogResponse.data.data); // Set the current blog's data
      } else {
        setError('Failed to fetch blog data');
      }
    };

    const fetchBlogPosts = async () => {
      const postsResponse = await apiFetch(`/blogs/${id}/posts`, 'GET');
      if (postsResponse.success) {
        setPosts(postsResponse.data.data);
      } else {
        setError('Failed to fetch posts');
      }
      setLoading(false);
    };

    // Fetch blog data and posts when component mounts or when the id changes
    fetchBlogData();
    fetchBlogPosts();
  }, [id]);

  const handleDeletePost = async (postId) => {
    const response = await apiFetch(`/posts/${postId}`, 'DELETE');
    if (response.success) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]); // Add the new post to the top of the posts list
  };

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p>{error}</p>;

  // Check if the logged-in user is the owner of the current blog page
  const isOwner = ownerBlogId === parseInt(id, 10); // Compare ownerBlogId with the current blog page ID

  return (
    <>
      <div className="blogPage">
        {blogData ? (
          <>
            <h1>{blogData.name}</h1>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${blogData.image}`}
              alt={blogData.name}
              className="blog-image"
            />
            <p>{blogData.description}</p>
          </>
        ) : (
          <p>No blog data available</p>
        )}

        <div className="posts-section">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isOwner={isOwner} // Pass isOwner to PostCard
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      </div>
      {isOwner && <CreatePost blogId={blogData?.id} onCreate={handleCreatePost} />} {/* Render CreatePost if the user is the owner */}
    </>
  );
};

export default Blog;
