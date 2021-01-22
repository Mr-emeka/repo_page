import React from 'react';

type Props = {
	isMenuOpen: boolean
}
const HeaderNav: React.FC<Props> = ({ isMenuOpen }) => {
	const openClass = isMenuOpen ? "open" : "";
	return <nav className={`nav ${openClass}`}>

		<a href="" className="nav__item">Pull requests </a>

		<a href="" className="nav__item"> Issues </a>

		<a href="" className="nav__item">Marketplace </a>

		<a href="" className="nav__item">Explore </a>

	</nav>;
}

export default HeaderNav;