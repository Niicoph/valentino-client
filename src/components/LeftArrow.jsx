import LeftArrow2 from '../assets/Arrows/test-2.png';


export default function LeftArrow() {
  return (
    <div className="relative w-[42px] h-[42px]">
      <img src={LeftArrow2} alt="left-arrow-1" className="absolute inset-0 w-full h-full animate-fade-infinite-left" />
    </div>
  );
}
