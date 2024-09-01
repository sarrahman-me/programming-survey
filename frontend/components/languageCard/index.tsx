"use client"

import { PostDataApi } from "@/utils/fetcher";

export default function LanguageCard({ title, image_url, id, rival_id }: { title: string, image_url: string, id: number, rival_id: number }) {
  const handleClick = async () => {
    const response = await PostDataApi(`${process.env.NEXT_PUBLIC_SERVER_HOST}/v0/comparisons`, {
      "language_a_id": id,
      "language_b_id": rival_id,
      "winner_language_id": id
    });

    console.log(response.data)
  }

  return (
    <div onClick={handleClick} className="flex hover:rotate-1 cursor-pointer justify-center items-center p-6 border border-white rounded-lg bg-white/10 backdrop-blur-lg">
      <div className="flex flex-col items-center space-y-4">
        <img src={image_url} alt={title} className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain" />
        <h2 className="text-xl md:text-2xl text-center font-semibold text-white">{title}</h2>
      </div>
    </div>
  )
}
