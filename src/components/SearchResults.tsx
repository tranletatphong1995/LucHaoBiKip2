import React from 'react';
import { Element, Field, fieldTranslations } from '../types';

interface SearchResultsProps {
  result: Element | null;
  field: Field;
}

const SearchResults: React.FC<SearchResultsProps> = ({ result, field }) => {
  if (!result) {
    return null;
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{result.name}</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Mô tả chung:</h3>
        <p>{result.generalDescription}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Ý nghĩa trong {fieldTranslations[field]}:</h3>
        <p>{result.meanings[field]}</p>
      </div>
    </div>
  );
};

export default SearchResults;