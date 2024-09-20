import RecentBlogs from '../components/RecentBlogs';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Blog</h1>
      <RecentBlogs limit={3} />
    </div>
  );
};

export default Home;
