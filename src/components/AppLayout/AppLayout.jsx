import React from 'react';
import './AppLayout.css';
import WrapperInfo from './WrapperInfo/WrapperInfo';
import SubscribedBlogs from './SubscribedBlogs/SubscribedBlogs';

const AppLayout = ({ children }) => {
  return (
    <div className='bodyApp'>
      <SubscribedBlogs />
      <WrapperInfo />
      <main className='height100'>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
