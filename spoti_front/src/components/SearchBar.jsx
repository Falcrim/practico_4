import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <Form inline onSubmit={handleSearch} className="mb-4">
            <FormControl
                type="text"
                placeholder="Buscar género, artista, álbum o canción"
                className="mr-sm-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-primary">Buscar</Button>
        </Form>
    );
};
SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;