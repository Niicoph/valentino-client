import AddSrc from "../../assets/Crud/Add.png";
import Header from "../../components/Header";
import { useContext, useState } from "react";
import { FetchApiContext } from "../../contexts/FetchApiContext"; // Traemos las categorías
import { UserAuthContext } from "../../contexts/UserAuthContext"; // Traemos el usuario autenticado

export default function AddCategory() {
  const { categories } = useContext(FetchApiContext);
  const { user } = useContext(UserAuthContext);
  const [newCategory, setNewCategory] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    img_white: "",
    img_white_selected: "",
    img_dark: "",
    img_dark_selected: "",
  });
  const [placeholder, setPlaceholder] = useState({
    name: "Nombre",
    img_white: "Imagen - modo blanco",
    img_white_selected: "Imagen - seleccionada",
    img_dark: "Imagen - modo oscuro",
    img_dark_selected: "Imagen - seleccionada",
  });

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setPlaceholder({
        ...placeholder,
        [name]: files[0].name,
      });
      setForm({
        ...form,
        [name]: files[0], 
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.img_white && form.img_white_selected && form.img_dark && form.img_dark_selected) {
        submitForm();
    } else {
        setError("Por favor, rellena todos los campos");
    }
  }

  const submitForm = async () => {
    try {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("img_white", form.img_white);
        formData.append("img_white_selected", form.img_white_selected);
        formData.append("img_dark", form.img_dark);
        formData.append("img_dark_selected", form.img_dark_selected);

        const response = await fetch ('http://localhost:8000/api/categories' , {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const responseText = await response.text();
        const data = JSON.parse(responseText);
        if (response.ok) {
            setNewCategory(true)
            setTimeout( () => {
                setNewCategory(false)
                window.location.reload();
            } , 2000)
        } else {
            setError(data.message);
        }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <>
      <main className="w-full h-screen opacity-0 animate-showUp">
      <div className="absolute top-0 left-0 w-full h-full grainy-background "></div>
        <Header />
        <section className="w-full h-4/5 flex justify-center items-center dark:bg-valentino-red">
          <div className="w-2/4 h-3/4 rounded-xl shadow-card-crud dark:shadow-card-crud-white">
            <form
              className="w-full h-full flex flex-col justify-center items-center gap-10 cursor-pointer p-4"
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                name="name"
                id="name"
                placeholder={placeholder.name}
                className="border-b border-black bg-transparent placeholder:text-black placeholder:font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
                maxLength={25}
              />
              <input
                type="file"
                name="img_white"
                id="img_white"
                className="hidden"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
              />
              <label
                htmlFor="img_white"
                className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
              >
                {placeholder.img_white}
              </label>

              <input
                type="file"
                name="img_white_selected"
                id="img_white_selected"
                className="hidden"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
              />
              <label
                htmlFor="img_white_selected"
                className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
              >
                {placeholder.img_white_selected}
              </label>

              <input
                type="file"
                name="img_dark"
                id="img_dark"
                className="hidden"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
              />
              <label
                htmlFor="img_dark"
                className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
              >
                {placeholder.img_dark}
              </label>

              <input
                type="file"
                name="img_dark_selected"
                id="img_dark_selected"
                className="hidden"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
              />
              <label
                htmlFor="img_dark_selected"
                className="border-b border-black bg-transparent font-valentino-font focus:outline-none w-3/4 dark:placeholder:text-white dark:text-white dark:border-white z-10 cursor-pointer"
              >
                {placeholder.img_dark_selected}
              </label>
              
              <button type="submit" className="z-10">
                <img src={AddSrc} alt="Añadir" width={60} height={60}/>
              </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </section>
      </main>
    </>
  );
}
