import React from 'react';
import './Landing.css';
import Books from '../../../assets/Books.png';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <section>
        <div className='blocText'>
          <h1>Blog your life that’s all</h1>
          <p>This is where you introduce the features and benefits of your app.</p>
        </div>
        <img src={Books} alt="Books Image" className='Books' />
      </section>
      <Link to="/register" className='login'>Register here !</Link>
      <section>
        <img src={Books} alt="Books Image" className='Books' />
        <div className='blocText'>
          <h2>Create your own Blog</h2>
          <p>Write your own world, add posts, comments, share pictures to add your personality. Set your avatar and a custom bio, to show up in chat your way.</p>
        </div>
      </section>
    </>
  );
};

export default Landing;
