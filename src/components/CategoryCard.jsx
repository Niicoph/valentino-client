import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
    const imgSrc = category.img_light.replace("public", "storage");

    return (
      <Link 
      className="w-32 h-32 rounded-lg shadow-custom flex flex-col justify-center items-center text-lg gap-3 font-indie-flower transform transition-transform duration-300 hover:scale-110 cursor-pointer z-10"
      to={`/menu/${category.nombre}`}>
        <img src={`http://localhost:8000/${imgSrc}`} alt={category.nombre} width={60} height={60}/>
        <h1> {category.nombre} </h1>
      </Link>
    );
  }
  