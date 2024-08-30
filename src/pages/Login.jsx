import Header from "../components/Header";
import EmailWhite from "../assets/Login/Email_white.png";
import LockWhite from "../assets/Login/Lock_white.png";
import EmailDark from "../assets/Login/Email_dark.png";
import LockDark from "../assets/Login/Lock_dark.png";

import { useContext, useState, useEffect } from "react";
import { ColorModeContext } from "../contexts/ColorMode";

export default function Login() {
  const { darkMode } = useContext(ColorModeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError] = useState('');


  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const token = getCookie('token');
    if (token) {
      window.location.href = '/menu';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        if (data.status) {
          const expires = new Date();
          expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000); 
          document.cookie = `token=${data.token}; expires=${expires.toUTCString()}; path=/`;
          window.location.href = '/menu';
        } else {
          setError(data.message)
        }
      } else {
        setError("Something went wrong (data.status error)")
      }
    } catch (error) {
      setError("Something went wrong (catch error)" + error.message)
    }

  }
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }




  return (
    <main className="relative w-full h-screen flex flex-col dark:bg-valentino-red">
      <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
      <Header />
      <section className="flex flex-col justify-center items-center w-full h-full">
        <form className="w-3/4 h-fit z-10 flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <img
              src={ darkMode ? EmailDark : EmailWhite }
              alt="email icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
            <input
              type="text"
              name="email"
              id="email"
              className="bg-valentino-red h-12 w-full rounded-md placeholder:text-white placeholder:text-md p-2 pl-12 placeholder:font-semibold dark:bg-white dark:placeholder:text-black focus:outline-none text-white"
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="relative w-full">
            <img
              src={ darkMode ? LockDark : LockWhite }
              alt="lock icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
            <input
              type="password"
              name="password"
              id="password"
              className="bg-valentino-red h-12 w-full rounded-md placeholder:text-white placeholder:text-md p-2 pl-12 placeholder:font-semibold dark:bg-white dark:placeholder:text-black focus:outline-none text-white"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="bg-black h-12 w-full rounded-md text-white font-semibold">
            Login
          </button>
        </form>
        <p className="text-red-600 font-semibold mt-10">{error}</p>
      </section>
    </main>
  );
}
