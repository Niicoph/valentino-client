import { useContext } from "react"
import { FetchApiContext } from "../contexts/FetchApiContext"
import CategoryCard from "./CategoryCard";


export default function CategoriesMenu({updateId}) {
  const {categories, loading, error} = useContext(FetchApiContext);

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section className="w-full h-full flex justify-center items-center mt-6 mb-6">
      <div className="w-fit h-fit flex flex-wrap  gap-5 p-2 justify-center items-center">
          { categories.map (category => {
            return (
              <CategoryCard key={category.id} category={category} updateId={updateId}/>
            )
          })}
      </div>
    </section>
  )
}



