import api from "@/src/services/api";

// Generic fetch function with error handling
export const fetchFromMarvel = async <T>(
  endpoint: string,
  params = ""
): Promise<T> => {
  try {
    const response = await api.get(endpoint, { params });

    return response.data;
  } catch (error) {
    console.error("Marvel API Error:", error);
    throw error;
  }
};
