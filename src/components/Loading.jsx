import Logo from '../assets/Logo/Logo.png';

export default function Loading() {
  return (
    <main className="w-full h-screen bg-cover bg-white-background flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
      <img
        src={Logo}
        alt="valentino-logo"
        width={270}
        height={270}
        className="animate-fade-infinite"
      />
    </main>
  );
}
