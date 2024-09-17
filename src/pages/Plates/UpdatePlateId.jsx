import Header from '../../components/Header';
import AddSrc from '../../assets/Crud/Add.png';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchPlatesContext } from '../../contexts/FetchPlatesContext';

export default function UpdatePlateId({ plate, categories }) {
  const navigate = useNavigate();
  const { updatePlate } = useContext(FetchPlatesContext);
  const [newPlate, setNewPlate] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    nombre: plate.nombre,
    descripcion: plate.descripcion,
    valor: plate.valor,
    categoria_id: plate.categoria_id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitForm();
  };

  const submitForm = async () => {
    try {
      const formData = new FormData();
      formData.append('nombre', form.nombre);
      formData.append('descripcion', form.descripcion);
      formData.append('valor', form.valor);
      formData.append('categoria_id', form.categoria_id);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/platos/${plate.id}?_method=PUT`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        const updatedPlate = await response.json();
        updatePlate(updatedPlate);
        setNewPlate(true);
        setTimeout(() => {
          setNewPlate(false);
          navigate('/platos');
        }, 2000);
      } else {
        setError('Hubo un problema al procesar la solicitud.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error en la solicitud.');
    }
  };

  return (
    <main className="w-full h-screen opacity-0 animate-showUp dark:bg-valentino-red">
      <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
      <Header />
      <section className="w-full h-4/5 flex flex-col justify-center items-center p-4 gap-4">
        <h2 className="text-center text-black dark:text-white font-jetbrains-mono text-2xl font-semibold">
          Actualizar Plato
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-2/5 h-3/4 rounded-lg flex justify-center items-center flex-col p-8 gap-8 dark:shadow-card-crud-white shadow-card-crud"
        >
          <input
            type="text"
            name="nombre"
            id="nombre"
            maxLength={25}
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
          />
          <input
            type="text"
            name="descripcion"
            id="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
          />
          <input
            type="number"
            name="valor"
            id="valor"
            placeholder="Valor"
            value={form.valor}
            onChange={handleChange}
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer "
          />
          <select
            name="categoria_id"
            id="category"
            value={form.categoria_id}
            onChange={handleChange}
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
          >
            <option> </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>
          <button type="submit" className="z-20">
            <img src={AddSrc} alt="Añadir" className="w-12 h-12 cursor-pointer" />
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {newPlate && (
            <div className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-50 top-0 left-0 z-40">
              <div className="bg-white p-4 rounded-md">¡Plato actualizado! ✅</div>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
