import { Link } from "react-router-dom"

export default function ReturnButton() {
  return (
    <Link to={'/menu'}>
        <button className="w-full h-12 bg-red-900 fixed bottom-0 z-10 text-xl text-white font-indie-flower">
            Volver
        </button>
    </Link>
  )
}
