"use client"

import { PostDataApi } from "@/utils/fetcher";
import { setLikedLanguageId, addExcludeLanguageId } from "@/utils/cookieHandler";
import Image from "next/image";

export default function LanguageCard({ title, image_url, id, rival_id }: { title: string, image_url: string, id: number, rival_id: number }) {
  const handleClick = async () => {
    const response = await PostDataApi(`/api/comparisons`, {
      "language_a_id": id,
      "language_b_id": rival_id,
      "winner_language_id": id
    });

    console.log(response);

    setLikedLanguageId(id);
    addExcludeLanguageId(rival_id);

    window.location.reload()
  }

  return (
    <div onClick={handleClick} className="flex hover:shadow-md cursor-pointer justify-center items-center p-6 border border-white rounded-lg bg-white/10 backdrop-blur-lg">
      <div className="flex flex-col items-center space-y-4">
        <Image width={128} height={128} src={image_url} alt={title} className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain" />
        <h2 className="text-xl md:text-2xl text-center font-semibold text-black">{title}</h2>
      </div>
    </div>
  )
}
