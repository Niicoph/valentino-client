import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import FetchApiProvider from "../contexts/FetchApiContext";
import CategoriesMenu from "../components/CategoriesMenu";
import Header from '../components/Header';

export default function Menu() {  
  const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedMenu');
    
    if (!hasVisited) {
      localStorage.setItem('hasVisitedMenu', 'true');
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    isLoading 
    ? <Loading /> 
    : (
      <main className="relative w-full min-h-screen flex flex-col overflow-hidden opacity-0 animate-showUp dark:bg-valentino-red">
        <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
        <Header />
          <CategoriesMenu />
      </main>
    )
  );
}

