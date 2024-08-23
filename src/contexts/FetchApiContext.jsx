import {createContext, useState} from 'react';
import { useEffect } from 'react';

export const FetchApiContext = createContext();


const FetchApiProvider = ({children}) => {

    const [categories , setCategories] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(null);


    useEffect( () => {
        async function fetchCategories() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/categorias');
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    },[] )
    console.log(categories);
    return (
        <FetchApiContext.Provider value={{categories, loading, error}}>
            {children}
        </FetchApiContext.Provider>
    )

};


export default FetchApiProvider;