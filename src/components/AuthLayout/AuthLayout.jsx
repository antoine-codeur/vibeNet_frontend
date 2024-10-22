import React from 'react';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {

  return (
    <div className='bodyAuth'>
      <main>
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
