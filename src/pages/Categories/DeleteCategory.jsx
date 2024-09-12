import Header from "../../components/Header";
import { useEffect, useState, useContext } from "react";
import CategoriesMenu from "../../components/CategoriesMenu";
import { FetchApiContext } from "../../contexts/FetchApiContext";

export default function DeleteCategory() {
  const [error, setError] = useState(null);
  const [id, setId] = useState(null); 
  const { removeCategory } = useContext(FetchApiContext);

  const updateId = (id) => {
    setId(id);
  }

  useEffect(() => {
    if (id) {
      async function deleteCat() {
        try {
          const response = await fetch(`http://localhost:8000/api/categorias/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            setError(null);
            removeCategory(id); 
          } else {
            setError(response.statusText);
          }
        } catch (error) {
          setError(error.message);
        }
      }
      deleteCat();
    }
  }, [id, removeCategory]); 

  return (
    <main className="relative w-full min-h-screen flex flex-col overflow-hidden opacity-0 animate-showUp dark:bg-valentino-red" id="test">
      <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
      <Header />
      <CategoriesMenu updateId={updateId} />
      {error && <p className="text-white text-center text-2xl">{error}</p>}
    </main>
  );
}
