"use client";

import { ILanguage } from "@/interfaces/languages";
import { getLikedLanguageId } from "@/utils/cookieHandler";
import { GetDataApi } from "@/utils/fetcher";
import { useEffect, useState } from "react";

export default function WinnerLanguage() {
  const [data, setData] = useState<ILanguage>({} as ILanguage);

  useEffect(() => {
    const fetchData = async () => {
      const likedLanguageId = getLikedLanguageId();
      const response = await GetDataApi(`${process.env.NEXT_PUBLIC_SERVER_HOST}/language/${likedLanguageId}`);

      setData(response.data.data[0]);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-dark-blue to-blue-900 p-8">
      <div className="flex flex-col items-center space-y-6 p-6 border border-white rounded-xl bg-white/10 backdrop-blur-lg shadow-lg">
        <img
          src={data.url_image}
          alt={data.name}
          className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
        />
        <h2 className="text-3xl md:text-4xl text-center font-bold text-white">{data.name}</h2>
        <p className="text-white text-lg md:text-xl">Selamat! Bahasa pilihanmu telah terpilih sebagai favorit!</p>
      </div>
    </div>
  );
}
