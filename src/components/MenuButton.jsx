import { Link } from "react-router-dom";

export default function MenuButton() {
  return (
    <Link 
      to="/menu" 
      className="bg-valentino-red text-3xl text-white text-center p-2 w-28 font-indie-flower font-bold rounded-lg cursor-pointer inline-block z-10"
    >
      Menú
    </Link>
  );
}
