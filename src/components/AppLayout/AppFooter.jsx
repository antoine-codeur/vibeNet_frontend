import React from 'react';
import HomeLink from './AppLinks/HomeLink';
import SupportLink from './AppLinks/SupportLink';
import LegalsLink from './AppLinks/LegalsLink';

const AppFooter = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Mon Application. Tous droits réservés.</p>
      <nav>
        <SupportLink />
      </nav>
    </footer>
  );
};

export default AppFooter;
