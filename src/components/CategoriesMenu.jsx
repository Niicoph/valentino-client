import { useContext } from "react"
import { FetchApiContext } from "../contexts/FetchApiContext"
import CategoryCard from "./CategoryCard";


export default function CategoriesMenu() {
  const {categories, loading, error} = useContext(FetchApiContext);

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="w-fit h-fit flex flex-wrap  gap-5 p-2 justify-center items-center">
          { categories.map (category => {
            return (
              <CategoryCard key={category.id} category={category} />
            )
          })}
      </div>
    </section>
  )
}



/*

EJEMPLO PARA ACTUALIZAR EL ESTADO DE CATEGORIAS -> tendriamos que utilizar un POST para agregar una nueva categoria 

const ComponenteActualizar = () => {
  const { categories, setCategories } = useContext(FetchApiContext);

  const actualizarCategorias = () => {
    const nuevasCategorias = [...categories, { id: 4, name: 'Nueva Categoría' }];
    setCategories(nuevasCategorias);
  };

  return (
    <div>
      <button onClick={actualizarCategorias}>Agregar Categoría</button>
    </div>
  );
};


*/