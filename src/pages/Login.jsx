import { useContext, useState, useEffect } from "react";
import { ColorModeContext } from "../contexts/ColorMode";
import { UserAuthContext } from "../contexts/UserAuthContext";
import Header from "../components/Header";
import EmailWhite from "../assets/Login/Email_white.png";
import LockWhite from "../assets/Login/Lock_white.png";
import EmailDark from "../assets/Login/Email_dark.png";
import LockDark from "../assets/Login/Lock_dark.png";
import Loading from "../components/Loading";

export default function Login() {
  const { darkMode } = useContext(ColorModeContext);
  const { login, error, loading, user } = useContext(UserAuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [locallyLoading, setLocallyLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setLocallyLoading(false);
        window.location.href = "/menu";
      }, 2000);
    }
  }, [user]);

  return (
    locallyLoading ? <Loading /> :
    <main className="relative w-full h-screen flex flex-col dark:bg-valentino-red">
      <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
      <Header />
      <section className="flex flex-col justify-center items-center w-full h-full">
        <form
          className="w-3/4 h-fit z-10 flex flex-col justify-center items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <img
              src={darkMode ? EmailDark : EmailWhite}
              alt="email icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
            <input
              type="text"
              name="email"
              id="email"
              className="bg-valentino-red h-12 w-full rounded-md placeholder:text-white placeholder:text-md p-2 pl-12 placeholder:font-semibold dark:bg-white dark:placeholder:text-black focus:outline-none text-white"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative w-full">
            <img
              src={darkMode ? LockDark : LockWhite}
              alt="lock icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
            <input
              type="password"
              name="password"
              id="password"
              className="bg-valentino-red h-12 w-full rounded-md placeholder:text-white placeholder:text-md p-2 pl-12 placeholder:font-semibold dark:bg-white dark:placeholder:text-black focus:outline-none text-white"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-black h-12 w-full rounded-md text-white font-semibold"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-600 font-semibold mt-10">{error}</p>}
      </section>
    </main>
  );
}


