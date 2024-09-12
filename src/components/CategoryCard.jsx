import { Link } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext } from "../contexts/ColorMode";
import { useLocation } from "react-router-dom";
import DeleteSrc from "../assets/Crud/Delete.png"; // Imagen de eliminación
import UpdateSrc from "../assets/Crud/Update.png"; // Imagen de actualización

export default function CategoryCard({ category, updateId }) {
  const { darkMode } = useContext(ColorModeContext);
  const location = useLocation();
  const deleteMenu = location.pathname.includes("eliminar");
  const updateMenu = location.pathname.includes("actualizar");

  // definimos una base url para las imágenes
  const baseUrl = "https://valentinomenu.com/api/"

  const imgSrc = category.img_light.replace("public", "storage");  
  const imgSrcDark = category.img_dark.replace("public", "storage"); 

  const Container = deleteMenu || updateMenu ? "div" : Link;
  const containerProps =
    deleteMenu || updateMenu
      ? {} 
      : { to: `/menu/${category.nombre}` }; 

  return (
    <Container
      className={`relative w-32 h-32 rounded-lg shadow-custom flex flex-col justify-center items-center text-lg gap-3 font-indie-flower transform transition-transform duration-300 hover:scale-110 ${
        !deleteMenu && !updateMenu ? "cursor-pointer" : ""
      } z-10 dark:shadow-custom-white dark:text-white border`}
      {...containerProps}
    >
      {/* Icono para eliminar */}
      {deleteMenu && (
        <img
          src={DeleteSrc}
          alt="Delete"
          className="absolute -top-4 -right-3 w-8 h-8 cursor-pointer"
          onClick={() => updateId(category.id)}
        />
      )}
      {/* Icono para actualizar */}
      {updateMenu && (
        <Link to={`/categoria/actualizar/${category.id}`}>
           <img
          src={UpdateSrc}
          alt="Update"
          className="absolute -top-4 -right-3 w-8 h-8 cursor-pointer"
          onClick={() => updateId(category.id)}
           />
        </Link>
      )}

      {/* Imagen principal de la categoría */}
      <img
        src={`${baseUrl}${darkMode ? imgSrcDark : imgSrc}`}
        alt={category.nombre}
        width={60}
        height={60}
      />
      <h1>{category.nombre}</h1>
    </Container>
  );
}
