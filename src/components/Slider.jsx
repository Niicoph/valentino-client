import { useContext, useRef, useEffect } from "react";
import { FetchApiContext } from "../contexts/FetchApiContext";
import { ColorModeContext } from '../contexts/ColorMode';
import { Link, useLocation } from 'react-router-dom';

export default function Slider() {
  const { darkMode } = useContext(ColorModeContext);
  const { categories } = useContext(FetchApiContext);
  const location = useLocation();
  const locationPath = location.pathname.split('/')[2];
  const slider = useRef(null);


  const sortedCategories = [...categories].sort((a, b) => {
    if (a.nombre === locationPath) return -1;
    if (b.nombre === locationPath) return 1;
    return 0;
  });

  useEffect(() => {
    if (slider.current) {
      slider.current.scrollLeft = 0;
    }
  }, [locationPath]);

  return (
    <div className="w-full h-fit overflow-x-auto z-10 p-2 mt-3" ref={slider}>
      <ul className="w-max h-full flex justify-center items-center gap-4 p-2 ">
        {sortedCategories.map((category) => {
          const imgSrc = category.img_light.replace("public", "storage");
          const imgSrcDark = category.img_dark.replace("public", "storage");
          const imgSrcSelected = category.img_light_selected.replace("public", "storage");
          const imgSrcDarkSelected = category.img_dark_selected.replace("public", "storage");

          return (
            <Link to={`/menu/${category.nombre}`} key={category.id} className="flex flex-col justify-center items-center gap-1">
              <li
                className="w-20 h-20 rounded-full border-2 border-black flex justify-center items-center dark:border-white"
              >
                {locationPath === category.nombre ? (
                  <img
                    src={darkMode ? `http://localhost:8000/${imgSrcDarkSelected}` : `http://localhost:8000/${imgSrcSelected}`}
                    alt={category.nombre}
                    className="w-10 h-10"
                  />
                ) : (
                  <img
                    src={darkMode ? `http://localhost:8000/${imgSrcDark}` : `http://localhost:8000/${imgSrc}`}
                    alt={category.nombre}
                    className="w-10 h-10"
                  />
                )}
              </li>
              <h2 className="text-center font-valentino-font dark:text-white text-sm"> {category.nombre} </h2>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
