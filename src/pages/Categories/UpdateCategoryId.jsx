import Header from '../../components/Header';
import AddSrc from '../../assets/Crud/Add.png';
import { useState, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import { FetchApiContext } from '../../contexts/FetchApiContext';

export default function UpdateCategoryId({categoryId, categoryName}) {
  const {updateCategory} = useContext(FetchApiContext);
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: categoryName,
    img_white: '',
    img_white_selected: '',
    img_dark: '',
    img_dark_selected: ''
  });
  const [fileNames, setFileNames] = useState({
    img_white: 'vacio',
    img_white_selected: 'vacio',
    img_dark: 'vacio',
    img_dark_selected: 'vacio'
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
      setFileNames(prevState => ({
        ...prevState,
        [name]: files[0].name
      }));
    } else {
      setForm(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitForm();
  };

  const submitForm = async () => {
    try {
      const formData = new FormData();
      formData.append('nombre', form.name);
      formData.append('img_light', form.img_white);
      formData.append('img_light_selected', form.img_white_selected);
      formData.append('img_dark', form.img_dark);
      formData.append('img_dark_selected', form.img_dark_selected);

      const response = await fetch(`http://localhost:8000/api/categorias/${categoryId}?_method=PUT`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      });
      try {
        if (response.ok) {
          const updatedCategory = await response.json();
          updateCategory(updatedCategory);
          setNewCategory(true);
          setTimeout(() => {
            setNewCategory(false);
            navigate('/menu'); 
          }, 2000);
        } else {
          setError('Hubo un problema al procesar la solicitud.');
        }
      } catch (jsonError) {
        console.error('Error al analizar JSON:', jsonError);
        setError('Error al procesar la respuesta del servidor.');
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
        <h2 className="text-center text-black dark:text-white font-jetbrains-mono text-2xl font-semibold">Actualizar Categoria</h2>
        <form
          onSubmit={handleSubmit}
          className="w-2/5 h-3/4  rounded-lg flex justify-center items-center flex-col p-8 gap-8 dark:shadow-card-crud-white shadow-card-crud"
        >
          <input
            type="text"
            name="name"
            id="name"
            maxLength={25}
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer  placeholder:text-black"
          />
          <label
            htmlFor="img_white"
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
          >
            {fileNames.img_white === 'vacio' ? 'Imagen - modo blanco' : fileNames.img_white}
          </label>
          <input
            type="file"
            name="img_white"
            id="img_white"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            className="hidden"
          />
          <label
            htmlFor="img_white_selected"
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
          >
            {fileNames.img_white_selected === 'vacio' ? 'Imagen - seleccionada' : fileNames.img_white_selected}
          </label>
          <input
            type="file"
            name="img_white_selected"
            id="img_white_selected"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            className="hidden"
          />
          <label
            htmlFor="img_dark"
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
          >
            {fileNames.img_dark === 'vacio' ? 'Imagen - modo oscuro' : fileNames.img_dark}
          </label>
          <input
            type="file"
            name="img_dark"
            id="img_dark"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            className="hidden"
          />
          <label
            htmlFor="img_dark_selected"
            className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
          >
            {fileNames.img_dark_selected === 'vacio' ? 'Imagen - seleccionada' : fileNames.img_dark_selected}
          </label>
          <input
            type="file"
            name="img_dark_selected"
            id="img_dark_selected"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            className="hidden"
          />
          <button type="submit" className='z-20'>
            <img src={AddSrc} alt="Añadir" className="w-12 h-12 cursor-pointer" />
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {newCategory && (
            <div className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-50 top-0 left-0 z-40">
              <div className="bg-white p-4 rounded-md">
                ¡Categoría actualizada! ✅
              </div>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}


