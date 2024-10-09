import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import DataInput from './components/DataInput';
import DataManagement from './components/DataManagement';
import { Element, Field } from './types';

const App: React.FC = () => {
  const [searchResult, setSearchResult] = useState<Element | null>(null);
  const [selectedField, setSelectedField] = useState<Field>('investment');
  const [activeTab, setActiveTab] = useState<'search' | 'input' | 'manage'>('search');
  const [elements, setElements] = useState<Element[]>([]);

  useEffect(() => {
    const storedElements = localStorage.getItem('elements');
    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);

  const saveElements = (newElements: Element[]) => {
    setElements(newElements);
    localStorage.setItem('elements', JSON.stringify(newElements));
  };

  const handleSearch = (field: Field, category: string, elementName: string) => {
    const foundElement = elements.find(
      (el) => el.name.toLowerCase() === elementName.toLowerCase() && el.category === category
    );
    setSelectedField(field);
    setSearchResult(foundElement || null);
  };

  const handleDataSubmit = (data: Element) => {
    const newElements = [...elements, data];
    saveElements(newElements);
    alert('Dữ liệu đã được lưu thành công!');
  };

  const handleDataUpdate = (updatedElement: Element) => {
    const newElements = elements.map((el) =>
      el.name === updatedElement.name && el.category === updatedElement.category ? updatedElement : el
    );
    saveElements(newElements);
  };

  const handleDataDelete = (elementToDelete: Element) => {
    const newElements = elements.filter(
      (el) => !(el.name === elementToDelete.name && el.category === elementToDelete.category)
    );
    saveElements(newElements);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Bí Kíp Lục Hào</h1>
        {activeTab === 'search' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <SearchForm onSearch={handleSearch} />
            </div>
            <div>
              <SearchResults result={searchResult} field={selectedField} />
            </div>
          </div>
        )}
        {activeTab === 'input' && (
          <DataInput onSubmit={handleDataSubmit} />
        )}
        {activeTab === 'manage' && (
          <DataManagement
            elements={elements}
            onUpdate={handleDataUpdate}
            onDelete={handleDataDelete}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;