export interface MarvelResponse<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}
