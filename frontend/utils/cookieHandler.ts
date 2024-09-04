import { getCookie, setCookie } from "cookies-next";

export const getLikedLanguageId = (): number | null => {
  const likedLanguageId = getCookie("liked_language_id") as string | undefined;
  return likedLanguageId ? parseInt(likedLanguageId) : null;
};

export const setLikedLanguageId = (id: number): void => {
  setCookie("liked_language_id", id.toString(), { maxAge: 7 * 24 * 60 * 60 });
};

export const getExcludeLanguageIds = (): number[] => {
  const excludeLanguageIdsCookie = getCookie("exclude_language_ids") as
    | string
    | undefined;
  return excludeLanguageIdsCookie ? JSON.parse(excludeLanguageIdsCookie) : [];
};

export const addExcludeLanguageId = (id: number): void => {
  const excludeLanguageIds = getExcludeLanguageIds();
  excludeLanguageIds.push(id);
  setCookie("exclude_language_ids", JSON.stringify(excludeLanguageIds), {
    maxAge: 7 * 24 * 60 * 60,
  });
};
