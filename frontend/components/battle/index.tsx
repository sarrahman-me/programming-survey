"use client"
import { PostDataApi } from "@/utils/fetcher";
import LanguageCard from "../languageCard";
import { useEffect, useState } from "react";
import { ILanguage } from "@/interfaces/languages";
import { getLikedLanguageId, getExcludeLanguageIds } from "@/utils/cookieHandler";
import WinnerLanguage from "../winnerLanguage";

export default function Battle() {
  const [data, setData] = useState<ILanguage[]>([]);
  const [isComplete, setComplete] = useState(false);

  const fetchData = async () => {
    const likedLanguageId = getLikedLanguageId();
    const excludeLanguageIds = getExcludeLanguageIds();

    const response = await PostDataApi(`/api/language/match`, {
      "liked_language_id": likedLanguageId,
      "exclude_language_ids": excludeLanguageIds
    });

    if (response.status == 404) {
      setComplete(true);
    } else {
      setData(response.data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLanguageSelect = () => {
    fetchData();
  };

  if (isComplete) {
    return (
      <WinnerLanguage />
    );
  }

  if (!data[0]?.name) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-dark-blue to-blue-900">
        <p className="text-black text-2xl">Loading..</p>
      </div>
    );
  }

  return (
    <div className="mt-24 text-center">
      <h1 className="text-3xl md:text-4xl lg:text-6xl text-center font-bold text-black mb-8">
        {data[0]?.name}
        <span className="mx-3 font-extralight text-red-800">vs</span>
        {data[1]?.name}
      </h1>
      <h2 className="text-xl md:text-2xl text-center font-semibold text-black mb-12">Mana Bahasa Favoritmu?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-8">
        <LanguageCard id={data[0]?.id} rival_id={data[1]?.id} rival_name={data[1]?.name} image_url={data[0]?.url_image} title={data[0]?.name} onLanguageSelect={handleLanguageSelect} />
        <LanguageCard id={data[1]?.id} rival_id={data[0]?.id} rival_name={data[0]?.name} image_url={data[1]?.url_image} title={data[1]?.name} onLanguageSelect={handleLanguageSelect} />
      </div>
    </div>
  );
}
