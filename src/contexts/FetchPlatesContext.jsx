import { createContext, useState, useEffect } from "react";

export const FetchPlatesContext = createContext();

const FetchPlatesProvider = ({ children }) => {
    const [plates, setPlates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        async function fetchPlates() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/platos');
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                setPlates(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPlates();
    }, [] )

    const addPlate = (newPlate) => {
        setPlates((prevPlates) => [...prevPlates, newPlate]);
    }
    const removePlate = (id) => {
        setPlates((prevPlates) => prevPlates.filter(plate => plate.id !== id));
    }
    const updatePlate = (updatedPlate) => {
        setPlates((prevPlates) => prevPlates.map(plate => plate.id === updatedPlate.id ? updatedPlate : plate));
    }


    return (
        <FetchPlatesContext.Provider value={{plates, loading, error , addPlate, removePlate , updatePlate}}>
            {children}
        </FetchPlatesContext.Provider>
    )

};


export default FetchPlatesProvider;