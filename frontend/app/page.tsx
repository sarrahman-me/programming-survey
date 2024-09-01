import { AppBar, Battle } from "@/components";
import background_img from '@/public/background.svg';

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background_img.src})` }}
    >
      <AppBar />
      <Battle />
    </main>
  );
}
