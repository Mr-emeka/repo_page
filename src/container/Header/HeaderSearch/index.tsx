import React from 'react';

type Props = {
    handleSearch: any,
}
const HeaderSearch: React.FC<Props> = ({ handleSearch }) => {
    return <div className="search">
        <input className="search__input" placeholder="Search or jump to..." />
        <img
            className="search__icon"
            onChange={handleSearch}
            src="https://github.githubassets.com/images/search-key-slash.svg"
            alt="icon"
        />
    </div>;
}

export default HeaderSearch;