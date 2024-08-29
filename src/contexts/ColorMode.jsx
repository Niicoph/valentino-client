import {createContext, useState} from 'react';
import { useEffect } from 'react';


export const ColorModeContext = createContext();


const ColorModeProvider = ({children}) => {

    const [darkMode , setDarkMode] = useState(false);

    const handleMode = () => {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <ColorModeContext.Provider value={{darkMode, handleMode}}>
            {children}
        </ColorModeContext.Provider>
    )

};

export default ColorModeProvider;