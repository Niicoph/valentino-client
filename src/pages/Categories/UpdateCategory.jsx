import { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import CategoriesMenu from '../../components/CategoriesMenu';
import { FetchApiContext } from '../../contexts/FetchApiContext';


export default function UpdateCategory() {
  const [error, setError] = useState(null);
  const [id, setId] = useState(null); 
  const { removeCategory } = useContext(FetchApiContext);

  const updateId = (id) => {
    setId(id);
  }

  return (
    <main className="relative w-full min-h-screen flex flex-col overflow-hidden opacity-0 animate-showUp dark:bg-valentino-red" id="test">
      <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
      <Header />
      <CategoriesMenu updateId={updateId} />
    </main>
  );
}