import React from 'react';
import './AppLayout.css';
import Header from './Header';
import WrapperInfo from './WrapperInfo/WrapperInfo';

const AppLayout = ({ children }) => {
  return (
    <div className='bodyApp'>
      <Header />
      <WrapperInfo />
      <main>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
