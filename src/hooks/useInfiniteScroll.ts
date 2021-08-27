import { MutableRefObject, useEffect, useRef } from 'react';
import useLoadPromise, { Reset, SetHasReachEnd } from '../utils/useLoadPromise';
import useIntersectionObserver from './useIntersectionObserver';

interface InfiniteScrollArgs<TResponse> {
  onLoad: (page: number, limit?: number) => Promise<TResponse>;
  evaluateEnd: (response: TResponse, setHasReachEnd: SetHasReachEnd) => void;
  limit?: number;
  initialPage?: number;
  offset?: number;
}

interface InfiniteScrollReturn<TResponse> {
  isLoading: boolean;
  response: TResponse | null;
  reset: Reset;
  ref: MutableRefObject<null>;
  error: Error | null;
}

/**
 * 
 * @param onLoad Description from onLoad 
 * @returns 
 */
function useInfiniteScroll<TResponse>({
  onLoad,
  evaluateEnd,
  limit = 10,
  initialPage = 1,
  offset = 50,
}: InfiniteScrollArgs<TResponse>): InfiniteScrollReturn<TResponse> {
  const targetRef = useRef(null);
  const options: IntersectionObserverInit = {
    rootMargin: `0px 0px ${offset}px 0px`,
  };
  const isVisible = useIntersectionObserver(targetRef, options);

  const {
    isLoading,
    error,
    setPage,
    loadPromise,
    response,
    hasReachEnd,
    reset,
  } = useLoadPromise<TResponse>({
    load: onLoad,
    initialPage,
    limit,
    evaluateEnd,
  });

  const shouldFetch = isVisible && !isLoading && !hasReachEnd;

  useEffect(() => {
    if (shouldFetch) {
      loadPromise();
      setPage((prev) => prev + 1);
    }
  }, [shouldFetch, loadPromise, setPage]);

  return {
    isLoading,
    response,
    ref: targetRef,
    error,
    reset,
  };
}

export default useInfiniteScroll;
