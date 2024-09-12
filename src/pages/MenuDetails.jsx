import Header from "../components/Header";
import MenuOptions from "../components/MenuOptions";
import Slider from "../components/Slider";

export default function MenuDetails({ categoryId }) {
  return (
    <main className="relative w-full min-h-screen flex flex-col dark:bg-valentino-red opacity-0 animate-showUp  short:h-3/4 short-wide:w-60 ">
      <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
      <Header />
      <Slider />
      <MenuOptions categoryId={categoryId} />
    </main>
  );
}
