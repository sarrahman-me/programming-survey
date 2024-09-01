import { PostDataApi } from "@/utils/fetcher";
import LanguageCard from "../languageCard";

export default async function Battle() {
  const response = await PostDataApi(`${process.env.NEXT_PUBLIC_SERVER_HOST}/language/match`, {
    "liked_language_id": 20,
    "exclude_language_ids": [19]
  });

  const data = response.data.data;

  return (
    <div className="mt-24 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold text-white mb-8">
        {data[0].name}
        <span className="mx-3 font-extralight text-red-800">vs</span>
        {data[1].name}
      </h1>
      <h2 className="text-2xl md:text-3xl text-center font-semibold text-white mb-12">Mana Bahasa Favoritmu?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-8">
        <LanguageCard id={data[0].id} rival_id={data[1].id} image_url={data[0].url_image} title={data[0].name} />
        <LanguageCard id={data[1].id} rival_id={data[0].id} image_url={data[1].url_image} title={data[1].name} />
      </div>
    </div>
  );
}

