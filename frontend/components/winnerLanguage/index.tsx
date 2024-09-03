"use client";

import { ILanguage } from "@/interfaces/languages";
import { getLikedLanguageId } from "@/utils/cookieHandler";
import { GetDataApi } from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WinnerLanguage() {
  const [data, setData] = useState<ILanguage>({} as ILanguage);

  useEffect(() => {
    const fetchData = async () => {
      const likedLanguageId = getLikedLanguageId();
      const response = await GetDataApi(`/api/language/${likedLanguageId}`);

      setData(response.data.data[0]);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="flex flex-col items-center space-y-6 p-8 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl">
        <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
          <Image
            layout="fill"
            src={data.url_image}
            alt={data.name}
            className="object-contain"
          />
        </div>
        <h2 className="text-4xl md:text-5xl text-center font-extrabold text-black drop-shadow-lg">
          {data.name}
        </h2>
        <p className="text-black text-xl md:text-2xl text-center max-w-md">
          {data.wins > data.losses ?
            "Selamat! Bahasa pilihanmu juga favorit banyak orang!" :
            "Itu Bahasa yang bagus, Namun sayang sekali, bahasa pilihanmu tidak terlalu populer."}
        </p>
        <Link href="/statistics" className="mt-4 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transition-all">
          Lihat Peringkat
        </Link>
      </div>
    </div>
  );
}
