import { useCallback, useState } from 'react';

export type SetHasReachEnd = (hasReach: boolean) => void;
export type SetPage = (page: number | ((prev: number) => number)) => void;
export type Reset = () => void;

interface LoadPromiseArgs<TResponse> {
  load: (page: number, limit: number) => Promise<TResponse>;
  evaluateEnd: (response: TResponse, setHasReachEnd: SetHasReachEnd) => void;
  limit: number;
  initialPage: number;
}

interface LoadPromiseReturn<TResponse> {
  isLoading: boolean;
  response: TResponse | null;
  setPage: SetPage;
  error: Error | null;
  loadPromise: () => Promise<void>;
  page: number;
  hasReachEnd: boolean;
  reset: Reset;
}

function useLoadPromise<TResponse>({
  load,
  evaluateEnd,
  initialPage,
  limit,
}: LoadPromiseArgs<TResponse>): LoadPromiseReturn<TResponse> {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [hasReachEnd, setHasReachEnd] = useState(false);
  const [response, setResponse] = useState<TResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  async function loadPromise() {
    setIsLoading(true);
    try {
      const res = await load(page, limit);
      setResponse(res);
      if (evaluateEnd) {
        evaluateEnd(res, setHasReachEnd);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  const reset = useCallback(() => {
    setPage(1);
    setHasReachEnd(false);
  }, []);

  return {
    loadPromise,
    isLoading,
    page,
    hasReachEnd,
    error,
    setPage,
    response,
    reset,
  };
}

export default useLoadPromise;
