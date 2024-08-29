import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ColorModeContext } from '../contexts/ColorMode';

export default function CategoryCard({ category }) {
    const { darkMode } = useContext(ColorModeContext);

    const imgSrc = category.img_light.replace("public", "storage");
    const imgSrcDark = category.img_dark.replace("public", "storage");

    return (
      <Link 
      className="w-32 h-32 rounded-lg shadow-custom flex flex-col justify-center items-center text-lg gap-3 font-indie-flower transform transition-transform duration-300 hover:scale-110 cursor-pointer z-10 dark:shadow-custom-white dark:text-white border"
      to={`/menu/${category.nombre}`}>
        <img src={  darkMode  ?  `http://localhost:8000/${imgSrcDark}` : `http://localhost:8000/${imgSrc}`} alt={category.nombre} width={60} height={60}/>
        <h1> {category.nombre} </h1>
      </Link>
    );
  }
  