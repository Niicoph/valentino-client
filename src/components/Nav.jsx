import Close from "../assets/Nav/Close.png";

export default function Nav({ handleNav }) {
    return (
      <section className="w-full h-full bg-white absolute z-20 left-0 top-0">
        <div className="w-full h-20 flex justify-end p-4">
            <img
                src={Close}
                alt="close"
                className="w-10 h-10 cursor-pointer"
                onClick={handleNav}
            />
        </div> 
        <div className="w-full h-full">
            <ul className="w-full h-full flex flex-col p-4 gap-14">
                <li className="text-2xl font-semibold flex justify-between mt-10"> 
                    <a href="" className="w-full flex justify-between"> Instagram  <span className="mr-3"> {'>'}</span> </a>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <a href="" className="w-full flex justify-between"> Facebook  <span className="mr-3"> {'>'}</span> </a>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <a href="" className="w-full flex justify-between"> Nosotros  <span className="mr-3"> {'>'}</span> </a>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <a href="" className="w-full flex justify-between"> Contacto  <span className="mr-3"> {'>'}</span> </a>
                </li>
            </ul>
        </div>
      </section>
    );
  }
  