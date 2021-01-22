import React from 'react';

// import { Container } from './styles';
type Props = {
    handleSearch: any
}
const Search: React.FC<Props> = ({ handleSearch }) => {
    return <form>
        <input type="text" className="repository__search" placeholder="Find a repository..." onChange={handleSearch} />
    </form>;
}

export default Search;