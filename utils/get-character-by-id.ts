import { Character } from "@/types/character";
import { MarvelResponse } from "@/types/marvel-response";
import { fetchFromMarvel } from "./fetch-from-marvel";

export const getCharacterById = async (
  id: string
): Promise<MarvelResponse<Character>> => {
  return fetchFromMarvel<MarvelResponse<Character>>(`/characters/${id}`);
};
