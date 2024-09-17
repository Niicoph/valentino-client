import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { FetchPlatesContext } from "../../contexts/FetchPlatesContext";
import DeleteSrc from "../../assets/Crud/Delete.png";

export default function DeletePlate({ categories }) {
  const [error, setError] = useState(null);
  const { plates, removePlate } = useContext(FetchPlatesContext);
  const [selectedId, setSelectedId] = useState(null);

  const handleId = (e) => {
    setSelectedId(e.target.value);
  };

  const filteredPlates = plates.filter(
    (plate) => plate.categoria_id == selectedId
  );

  useEffect(() => {
    if (filteredPlates.length === 0 && selectedId) {
      setError("No hay platos disponibles para la categoría seleccionada.");
    } else {
      setError(null);
    }
  }, [filteredPlates.length, selectedId]);


  const handleClick = (id) => {
    async function deletePlate() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/platos/${id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          setError(null);
          removePlate(id);
        } else {
          setError(response.statusText);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    deletePlate();
  }


  return (
    <main className="relative w-full min-h-screen opacity-0 animate-showUp dark:bg-valentino-red">
      <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
      <Header />
      <section className="w-full h-4/5 flex flex-col items-center p-4 gap-4">
        <div className="z-20 flex flex-col justify-center items-center gap-2">
          <h2 className="text-center text-black dark:text-white font-jetbrains-mono text-2xl font-semibold">
            Seleccione una categoria
          </h2>
          <select
            name="category"
            id="category"
            className="p-2 rounded-md shadow-md w-full"
            onChange={handleId}
          >
            <option value="">Categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="w-2/5 h-fit p-2 flex flex-col gap-8">
          {filteredPlates.map((plate) => {
            return (
              <div
                key={plate.id}
                className="relative w-full h-fit p-2 border-2 border-black text-black rounded-lg flex flex-col justify-center items-center gap-4 shadow-custom dark:border-white dark:text-white"
              >
                <img
                  src={DeleteSrc}
                  alt="delete"
                  className="absolute -top-5 -right-4 w-10 h-10 cursor-pointer z-20"
                  onClick={() => handleClick(plate.id)}
                />
                <h2 className="text-center text-3xl font-bold font-indie-flower mt-5">
                  {plate.nombre.toUpperCase()}
                </h2>
                <p className="text-center font-valentino-font text-gray-500 dark:text-white overflow-scroll">
                  {plate.descripcion}
                </p>
                <p className="text-center bg-valentino-red p-2 text-white w-20 mb-5 font-semibold dark:bg-white dark:text-valentino-red">
                  ${plate.valor}
                </p>
              </div>
            );
          })}
        </div>
        {error && <p className="text-red-600 dark:text-white">{error}</p>}
      </section>
    </main>
  );
}
