import { toast } from "sonner";
import md5 from "md5";

// Marvel API requires a hash of timestamp + private key + public key
const API_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your Marvel API public key
const API_PRIVATE_KEY = "YOUR_PRIVATE_KEY"; // Replace with your Marvel API private key
const API_BASE_URL = "https://gateway.marvel.com/v1/public";

// Create authentication parameters
const generateAuthParams = () => {
  const ts = Date.now().toString();
  const hash = md5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY);
  return `ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;
};

// Generic fetch function with error handling
const fetchFromMarvel = async <T>(
  endpoint: string,
  params = ""
): Promise<T> => {
  try {
    const authParams = generateAuthParams();
    const url = `${API_BASE_URL}${endpoint}?${authParams}&${params}`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error fetching from Marvel API");
    }

    const data = await response.json();
    return data.data as T;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error connecting to Marvel API";
    toast.error(message);
    console.error("Marvel API Error:", error);
    throw error;
  }
};

// Types
export interface MarvelResponse<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];
    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      type: string;
    }[];
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];
    returned: number;
  };
  urls: {
    type: string;
    url: string;
  }[];
}

export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: {
    type: string;
    language: string;
    text: string;
  }[];
  resourceURI: string;
  urls: {
    type: string;
    url: string;
  }[];
  series: {
    resourceURI: string;
    name: string;
  };
  variants: {
    resourceURI: string;
    name: string;
  }[];
  collections: {
    resourceURI: string;
    name: string;
  }[];
  collectedIssues: {
    resourceURI: string;
    name: string;
  }[];
  dates: {
    type: string;
    date: string;
  }[];
  prices: {
    type: string;
    price: number;
  }[];
  thumbnail: {
    path: string;
    extension: string;
  };
  images: {
    path: string;
    extension: string;
  }[];
  creators: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      role: string;
    }[];
    returned: number;
  };
  characters: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      type: string;
    }[];
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];
    returned: number;
  };
}

// Character APIs
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

export const getCharacterById = async (
  id: string
): Promise<MarvelResponse<Character>> => {
  return fetchFromMarvel<MarvelResponse<Character>>(`/characters/${id}`);
};

export const getCharacterComics = async (
  characterId: string,
  params?: {
    format?: string;
    orderBy?: string;
    limit?: number;
    offset?: number;
  }
): Promise<MarvelResponse<Comic>> => {
  const queryParams = new URLSearchParams();

  if (params?.format) {
    queryParams.append("format", params.format);
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

  return fetchFromMarvel<MarvelResponse<Comic>>(
    `/characters/${characterId}/comics`,
    queryParams.toString()
  );
};

// Comic APIs
export const getComics = async (params?: {
  title?: string;
  titleStartsWith?: string;
  format?: string;
  orderBy?: string;
  limit?: number;
  offset?: number;
}): Promise<MarvelResponse<Comic>> => {
  const queryParams = new URLSearchParams();

  if (params?.title) {
    queryParams.append("title", params.title);
  }

  if (params?.titleStartsWith) {
    queryParams.append("titleStartsWith", params.titleStartsWith);
  }

  if (params?.format) {
    queryParams.append("format", params.format);
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

  return fetchFromMarvel<MarvelResponse<Comic>>(
    "/comics",
    queryParams.toString()
  );
};

export const getComicById = async (
  id: string
): Promise<MarvelResponse<Comic>> => {
  return fetchFromMarvel<MarvelResponse<Comic>>(`/comics/${id}`);
};

// Get image URL from Marvel's thumbnail object
export const getImageUrl = (
  thumbnail: { path: string; extension: string },
  size: string = "standard_xlarge"
) => {
  // Ensure we're not using a "not available" image
  if (thumbnail.path.includes("image_not_available")) {
    return null;
  }

  // Marvel API returns http URLs but we want https
  const securedPath = thumbnail.path.replace("http://", "https://");
  return `${securedPath}/${size}.${thumbnail.extension}`;
};

// Favorite functionality
const FAVORITES_KEY = "marvel_favorites";

interface Favorites {
  characters: {
    id: number;
    name: string;
    thumbnail: { path: string; extension: string };
  }[];
  comics: {
    id: number;
    title: string;
    thumbnail: { path: string; extension: string };
  }[];
}

export const getFavorites = (): Favorites => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) {
    return { characters: [], comics: [] };
  }

  try {
    return JSON.parse(stored) as Favorites;
  } catch (error) {
    console.error("Error parsing favorites:", error);
    return { characters: [], comics: [] };
  }
};

export const toggleCharacterFavorite = (character: Character): boolean => {
  const favorites = getFavorites();
  const index = favorites.characters.findIndex((c) => c.id === character.id);

  if (index === -1) {
    // Add to favorites
    favorites.characters.push({
      id: character.id,
      name: character.name,
      thumbnail: character.thumbnail,
    });
    toast.success(`Added ${character.name} to favorites`);
  } else {
    // Remove from favorites
    favorites.characters.splice(index, 1);
    toast.success(`Removed ${character.name} from favorites`);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return index === -1; // Return true if added, false if removed
};

export const toggleComicFavorite = (comic: Comic): boolean => {
  const favorites = getFavorites();
  const index = favorites.comics.findIndex((c) => c.id === comic.id);

  if (index === -1) {
    // Add to favorites
    favorites.comics.push({
      id: comic.id,
      title: comic.title,
      thumbnail: comic.thumbnail,
    });
    toast.success(`Added ${comic.title} to favorites`);
  } else {
    // Remove from favorites
    favorites.comics.splice(index, 1);
    toast.success(`Removed ${comic.title} from favorites`);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return index === -1; // Return true if added, false if removed
};

export const isCharacterFavorite = (id: number): boolean => {
  const favorites = getFavorites();
  return favorites.characters.some((c) => c.id === id);
};

export const isComicFavorite = (id: number): boolean => {
  const favorites = getFavorites();
  return favorites.comics.some((c) => c.id === id);
};
