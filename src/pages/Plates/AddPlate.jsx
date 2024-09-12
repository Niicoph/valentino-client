import Header from "../../components/Header";
import { useState } from "react";
import AddSrc from "../../assets/Crud/Add.png";
import { useNavigate } from "react-router-dom";

export default function AddPlate({ categories }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [newPlate, setNewPlate] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    valor: "",
    categoria_id: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.descripcion || !form.valor || !form.categoria_id) {
      setError("Todos los campos son obligatorios");
    } else {
      setError(null);
      submitForm();
    }
  }

  const submitForm = async () => {
    try {

      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("descripcion", form.descripcion);
      formData.append("valor", form.valor);
      formData.append("categoria_id", form.categoria_id);

      const response = await fetch("http://localhost:8000/api/platos", {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
        body: formData
      });
      if (response.ok) {
        const newPlate = await response.json();
        setNewPlate(newPlate);
        setTimeout( () => {
          setNewPlate(false)
          navigate('/platos')
        }, 2000)
      }
    } catch (error) {
      setError(error.message);
    }
  }


  return (
    <main className="w-full h-screen bg-bg-main bg-contain opacity-0 animate-showUp dark:bg-bg-main-red">
      <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
      <Header />
      <section className="w-full h-4/5 flex flex-col justify-center items-center p-4 gap-4">
        <h2 className="text-center text-black dark:text-white font-jetbrains-mono text-2xl font-semibold">
          Agregar Plato
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-2/5 h-3/4 rounded-lg flex justify-center items-center flex-col p-8 gap-8 dark:border-white shadow-card-crud"
        >
          <input
            type="text"
            name="nombre"
            id="nombre"
            maxLength={25}
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer placeholder:text-black"
          />
          <input
            type="text"
            name="descripcion"
            id="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer placeholder:text-black"
          />
          <input
            type="text"
            name="valor"
            id="valor"
            placeholder="Valor"
            value={form.valor}
            onChange={handleChange}
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer placeholder:text-black"
          />
          <select
            name="categoria_id"
            value={form.categoria_id || ""}
            onChange={handleChange}
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer placeholder:text-black"
          >
            <option value="" disabled>
              Seleccionar categoría
            </option>
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
              <div className="bg-white p-4 rounded-md">
                ¡Plato cargado! ✅
              </div>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}


