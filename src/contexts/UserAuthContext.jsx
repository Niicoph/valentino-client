import { useState, createContext, useEffect } from "react";

export const UserAuthContext = createContext();

const UserAuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/isAuth", {
          method: "GET",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const data = await response.json();
        if (response.ok && data.status) {
          setUser(true);
        }
      } catch (error) {
        setError("Error al verificar la autenticación: " + error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
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
      if (response.ok && data.status) {
        setUser(true); 
      } else {
        setError(data.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      setError("Error al conectar con el servidor: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
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
    } finally {
      setLoading(false);
    }
  };


  return (
    <UserAuthContext.Provider value={{ error, user, login, logout, loading }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
