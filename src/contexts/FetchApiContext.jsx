import { createContext, useState, useEffect } from 'react';

export const FetchApiContext = createContext();

const FetchApiProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categorias`);
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // actualizamos las categorias con el id que no coincida con el id que se pasa por parametro
  const removeCategory = (id) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
  };
  // actualizamos las categorias con el id que coincida con el id que se pasa por parametro
  const updateCategory = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };
  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  }

  return (
    <FetchApiContext.Provider value={{ categories, loading, error, removeCategory, updateCategory , addCategory}}>
      {children}
    </FetchApiContext.Provider>
  );
};

export default FetchApiProvider;
