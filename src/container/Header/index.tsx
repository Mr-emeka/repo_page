import React, { useState } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav'
import HeaderBurger from './HeaderBurger'
import HeaderSearch from './HeaderSearch';
import HeaderActivity from './HeaderActivity'

type Props = {
  logo: any,
  navPosition: string,
  avatar: string,
  handleSearch: any,
}

const Header: React.FC<Props> = ({ avatar, handleSearch, navPosition = "center", logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return <header className="header">
    <div className="header__wrapper" data-nav-position={navPosition}>
      <HeaderBurger toggleNav={toggleNav} isMenuOpen={isMenuOpen} />
      <HeaderLogo logo={logo} />
      <div className="container">
        <HeaderSearch
          handleSearch={handleSearch} />
        <HeaderNav isMenuOpen={isMenuOpen} />
      </div>
      <HeaderActivity avatar={avatar} />
    </div>
  </header>;
}

export default Header;
