import React from 'react';


type Props = {
  toggleNav: () => void,
  isMenuOpen:boolean
}
const HeaderBurger: React.FC<Props> = ({toggleNav, isMenuOpen}) => {
   const openClass = isMenuOpen ? `open` : "";
  return (
    <div className={`burger ${openClass}`} onClick={() => toggleNav()}>
      <span className="burger__line" />
      <span className="burger__line" />
      <span className="burger__line" />
    </div>
  );
}

export default HeaderBurger;


