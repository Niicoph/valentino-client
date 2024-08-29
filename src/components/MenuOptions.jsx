import { useState, useEffect } from "react";
import ReturnButton from "./ReturnButton";

export default function MenuOptions({ categoryId }) {
  const [placeholder, setPlaceholder] = useState('Buscar Producto. Ej: Pizza');
  const [searchValue, setSearchValue] = useState('');
  const [categoriesVisited, setCategoriesVisited] = useState([]); 
  const [plates, setPlates] = useState([]);  
  const [error, setError] = useState(null);      

  useEffect(() => {
    async function fetchPlates() {
      try {
        if (!categoriesVisited.includes(categoryId)) {
          const response = await fetch(`http://localhost:8000/api/platos/categoria/${categoryId}`);
          const data = await response.json();
          setPlates(prevPlates => [...prevPlates, ...data]);
          setCategoriesVisited(prevVisited => [...prevVisited, categoryId]);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPlates();
  }, [categoryId]);

  const sanitizeInput = (input) => {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const handleSearch = (e) => {
    e.preventDefault(); 
    const inputValue = e.target.value;
    const sanitizedValue = sanitizeInput(inputValue);  
    setSearchValue(sanitizedValue);
  };

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (searchValue === '') {
      setPlaceholder('Buscar Producto. Ej: Pizza');
    }
  };

  const filteredPlates = plates.filter((plate) => {
    return (
      plate.categoria_id === categoryId && (
        plate.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
        plate.descripcion.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  });

  return (
    <>
      <section className="w-full h-fit p-2 z-10 mb-12">
        <form className="w-full h-fit p-2 z-10" onSubmit={(e) => e.preventDefault()}> 
          <input 
            type="text" 
            name="search-input" 
            id="search-input" 
            className="w-full h-12 bg-valentino-red rounded-2xl placeholder:text-white placeholder:text-center text-center text-white font-extralight border border-transparent focus:border-red-950 focus:border-2 focus:outline-none dark:bg-white dark:placeholder:text-black" 
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder} 
          />
        </form>
        <div className="w-full h-fit p-2 flex flex-col gap-8">
          {filteredPlates.map((plate) => {
            return (
              <div key={plate.id} className="w-full h-fit p-2 border-2 border-black text-black rounded-lg flex flex-col justify-center items-center gap-4 shadow-custom dark:border-white dark:text-white">
                <h2 className="text-center text-3xl font-bold font-indie-flower mt-5">{plate.nombre.toUpperCase()}</h2>
                <p className="text-center font-valentino-font text-gray-500 dark:text-white overflow-scroll">{plate.descripcion}</p>
                <p className="text-center bg-valentino-red p-2  text-white w-20 mb-5 font-semibold dark:bg-white dark:text-valentino-red">${plate.valor}</p>
              </div>
            );
          })}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </section>
      <ReturnButton />
    </>
  );
}
