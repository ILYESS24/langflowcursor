declare module "react-query" {
  export interface UseQueryOptions<T> {
    queryKey: string[];
    queryFn: () => Promise<T>;
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
    refetchOnWindowFocus?: boolean;
    retry?: boolean | number;
  }

  export interface UseQueryResult<T> {
    data: T | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    refetch: () => void;
  }

  export function useQuery<T>(options: UseQueryOptions<T>): UseQueryResult<T>;
}
