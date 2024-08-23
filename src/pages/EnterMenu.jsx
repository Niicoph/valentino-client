import Header from "../components/Header";
import LeftArrow from "../components/LeftArrow";
import RightArrow from "../components/RightArrow";
import MenuButton from "../components/MenuButton";

export default function EnterMenu() {
  return (
    <main className="w-full h-screen bg-cover bg-white-background flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
      <Header />
      <div className="w-fit flex justify-evenly items-center gap-14 absolute bottom-28">
        <LeftArrow />
        <MenuButton />
        <RightArrow />
      </div>
    </main>
  );
}
