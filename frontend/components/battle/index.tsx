"use client"
import { ILanguage } from "@/interfaces/languages";
import { PostDataApi } from "@/utils/fetcher";
import { useEffect, useState } from "react";

export default function Battle() {
  const [data, setData] = useState<ILanguage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await PostDataApi(`${process.env.NEXT_PUBLIC_SERVER_HOST}/language/match`, {
        "liked_language_id": 20,
        "exclude_language_ids": [19]
      });

      setData(response.data.data);
    };

    fetchData();
  }, [setData]);

  if (!data[0]?.name) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-dark-blue to-blue-900">
        <p className="text-white text-2xl">Loading..</p>
      </div>
    );
  }

  return (
    <div className="mt-24 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold text-white mb-8">
        {data[0].name}
        <span className="mx-3 font-extralight text-red-800">vs</span>
        {data[1].name}
      </h1>
      <h2 className="text-2xl md:text-3xl text-center font-semibold text-white mb-12">Mana Bahasa Favoritmu?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-8">
        <div className="flex justify-center items-center p-6 border border-white rounded-lg bg-white/10 backdrop-blur-lg">
          <LanguageIcon image_url={data[0].url_image} title={data[0].name} />
        </div>
        <div className="flex justify-center items-center p-6 border border-white rounded-lg bg-white/10 backdrop-blur-lg">
          <LanguageIcon image_url={data[1].url_image} title={data[1].name} />
        </div>
      </div>
    </div>
  );
}

function LanguageIcon({ title, image_url }: { title: string, image_url: string }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <img src={image_url} alt={title} className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain" />
      <h2 className="text-xl md:text-2xl text-center font-semibold text-white">{title}</h2>
    </div>
  );
}
