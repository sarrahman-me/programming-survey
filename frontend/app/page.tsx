import { AppBar, Battle } from "@/components";
import background_img from '@/public/background.svg';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Survey Bahasa Pemrograman Favorit",
  description:
    "Survey sederhana untuk melihat bahasa yang paling di minati di indonesia",
};

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
