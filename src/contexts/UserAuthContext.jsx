import { useState, createContext, useEffect } from "react";

export const UserAuthContext = createContext();

const UserAuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/isAuth", {
          method: "GET",
          credentials: "include", 
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();
        if (response.status === 200 && data) {
          setUser(true);
        } else {
          setUser(null);
        }
      } catch (error) {
        setError("Error al verificar la autenticación: " + error.message);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setUser(true);
      } else if (response.status === 422)  {
          setError("Porfavor, rellene todos los campos");
      } else if (response.status === 401) {
          setError("Usuario o contraseña incorrectos");
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setError("Error al conectar con el servidor: " + error.message);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (response.ok && data.status) {
        setUser(null);
      } else {
        setError(data.message || "Error al cerrar sesión");
      }
    } catch (error) {
      setError("Error al conectar con el servidor: " + error.message);
    }
  };


  return (
    <UserAuthContext.Provider value={{ error, setError,  user, login, logout}}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
