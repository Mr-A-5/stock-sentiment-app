import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [company, setCompany] = useState('');
  const navigate = useNavigate();

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      navigate(`/${company}`);
    }
  }

  function handleChange(e) {
    const input = e.target.value.toUpperCase();
    setCompany(input);
  }

  return (
    <div className="relative">
      <input
        className="bg-blue-200 rounded-4xl p-3 w-75 border-3"
        placeholder="Search stock ticker (e.g. AAPL)"
        value={company}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
