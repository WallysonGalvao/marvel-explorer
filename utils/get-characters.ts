import { Character } from "@/types/character";
import { fetchFromMarvel } from "./fetch-from-marvel";
import { MarvelResponse } from "@/types/marvel-response";

export const getCharacters = async (params?: {
  nameStartsWith?: string;
  orderBy?: string;
  limit?: number;
  offset?: number;
}): Promise<MarvelResponse<Character>> => {
  const queryParams = new URLSearchParams();

  if (params?.nameStartsWith) {
    queryParams.append("nameStartsWith", params.nameStartsWith);
  }

  if (params?.orderBy) {
    queryParams.append("orderBy", params.orderBy);
  }

  if (params?.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params?.offset) {
    queryParams.append("offset", params.offset.toString());
  }

  return fetchFromMarvel<MarvelResponse<Character>>(
    "/characters",
    queryParams.toString()
  );
};
