import { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(input);
    }, 500);
    return () => clearTimeout(handler);
  }, [input]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const clearInput = () => {
    setInput('');
    onSearch('');
  };

  return (
    <div className="container my-4">
      <InputGroup>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl
          placeholder="Search items..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <Button variant="outline-secondary" onClick={clearInput}>
            <FaTimes />
          </Button>
        )}
      </InputGroup>
    </div>
  );
}

export default SearchBar;