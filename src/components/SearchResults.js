import React from 'react';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { q } = useParams();

  // You can perform actions related to searching here
  // For now, let's just display the search query
  return (
    <div>
      <h2>Search Results for: {q}</h2>
      {/* Add your actual search results UI or logic here */}
    </div>
  );
};

export default SearchResults;
