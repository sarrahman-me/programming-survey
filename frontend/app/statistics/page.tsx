import { AppBar } from "@/components";
import { ILanguage } from "@/interfaces/languages";
import background_img from '@/public/background.svg';
import { GetDataApi } from "@/utils/fetcher";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistic Hasil Survey Bahasa Pemrograman",
  description:
    "Survey sederhana untuk melihat bahasa yang paling di minati di indonesia",
};


export default async function Statistics() {
  const response = await GetDataApi(`${process.env.NEXT_PUBLIC_SERVER_HOST}/language`);
  const languages = response.data.data;

  const languagesSortedByWins: ILanguage[] = [...languages].sort((a, b) => b.wins - a.wins).slice(0, 11);

  const languagesSortedByLosses: ILanguage[] = [...languages].sort((a, b) => b.losses - a.losses).slice(0, 11);

  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background_img.src})` }}
    >
      <AppBar title="Statistics" />
      <div className="pt-20 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-black mb-4 text-center">
              Bahasa Paling Favorit
            </h2>
            <ul className="space-y-4">
              {languagesSortedByWins.map((language, index) => (
                <li
                  key={language.id}
                  className="flex justify-between items-center p-4 bg-white rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      width={40}
                      height={40}
                      src={language.url_image}
                      alt={`${language.name} logo`}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="font-medium text-lg">{index + 1}. {language.name}</span>
                  </div>
                  <span className="font-semibold text-xl text-green-600">{language.wins} Wins</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-black mb-4 text-center">
              Bahasa Yang Kurang Diminati
            </h2>
            <ul className="space-y-4">
              {languagesSortedByLosses.map((language, index) => (
                <li
                  key={language.id}
                  className="flex justify-between items-center p-4 bg-white rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      width={40}
                      height={40}
                      src={language.url_image}
                      alt={`${language.name} logo`}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="font-medium text-lg">{index + 1}. {language.name}</span>
                  </div>
                  <span className="font-semibold text-xl text-red-600">{language.losses} Losses</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
