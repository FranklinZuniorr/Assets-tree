import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const generateReactQuery = <TReturnData, TFilter>(
  queryKey: string,
  fn: (filter: TFilter) => Promise<TReturnData>,
) => {
  return (
    params: TFilter,
    options?: UseQueryOptions<TReturnData>,
  ) => {
    return useQuery<TReturnData>({queryKey: [queryKey, params], queryFn: () => fn(params), ...options});
  };
};