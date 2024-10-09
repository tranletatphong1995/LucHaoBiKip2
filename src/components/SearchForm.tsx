import React, { useState } from 'react';
import { Field, fields, fieldTranslations } from '../types';

interface SearchFormProps {
  onSearch: (field: Field, category: string, element: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [field, setField] = useState<Field>('investment');
  const [category, setCategory] = useState('');
  const [element, setElement] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(field, category, element);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="field" className="block mb-1">Lĩnh vực:</label>
        <select
          id="field"
          value={field}
          onChange={(e) => setField(e.target.value as Field)}
          className="w-full p-2 border rounded"
        >
          {fields.map((f) => (
            <option key={f} value={f}>{fieldTranslations[f]}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="category" className="block mb-1">Danh mục:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Chọn danh mục</option>
          <option value="lucThan">Lục Thân</option>
          <option value="lucThu">Lục Thú</option>
          <option value="nguHanh">Ngũ Hành</option>
        </select>
      </div>
      <div>
        <label htmlFor="element" className="block mb-1">Yếu tố:</label>
        <input
          type="text"
          id="element"
          value={element}
          onChange={(e) => setElement(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Nhập tên yếu tố"
        />
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Tra cứu
      </button>
    </form>
  );
};

export default SearchForm;