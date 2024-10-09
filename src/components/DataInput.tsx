import React, { useState } from 'react';
import { Field, fields, fieldTranslations } from '../types';

interface DataInputProps {
  onSubmit: (data: {
    category: string;
    name: string;
    generalDescription: string;
    meanings: { [key in Field]: string };
  }) => void;
}

const DataInput: React.FC<DataInputProps> = ({ onSubmit }) => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [generalDescription, setGeneralDescription] = useState('');
  const [meanings, setMeanings] = useState<{ [key in Field]: string }>(
    fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {} as { [key in Field]: string })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ category, name, generalDescription, meanings });
    // Reset form
    setCategory('');
    setName('');
    setGeneralDescription('');
    setMeanings(fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {} as { [key in Field]: string }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div>
        <label htmlFor="category" className="block mb-1">Danh mục:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Chọn danh mục</option>
          <option value="lucThan">Lục Thân</option>
          <option value="lucThu">Lục Thú</option>
          <option value="nguHanh">Ngũ Hành</option>
        </select>
      </div>
      <div>
        <label htmlFor="name" className="block mb-1">Tên:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
          placeholder="Nhập tên yếu tố"
        />
      </div>
      <div>
        <label htmlFor="generalDescription" className="block mb-1">Mô tả chung:</label>
        <textarea
          id="generalDescription"
          value={generalDescription}
          onChange={(e) => setGeneralDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
          rows={3}
          placeholder="Nhập mô tả chung"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Ý nghĩa theo từng lĩnh vực:</h3>
        {fields.map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block mb-1">{fieldTranslations[field]}:</label>
            <textarea
              id={field}
              value={meanings[field]}
              onChange={(e) => setMeanings({ ...meanings, [field]: e.target.value })}
              className="w-full p-2 border rounded"
              rows={2}
              placeholder={`Nhập ý nghĩa cho ${fieldTranslations[field]}`}
            />
          </div>
        ))}
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Lưu dữ liệu
      </button>
    </form>
  );
};

export default DataInput;