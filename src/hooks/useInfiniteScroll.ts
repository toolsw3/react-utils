import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import useAsyncCall from './useAsyncCall';
import useIntersectionObserver from './useIntersectionObserver';

function useInfiniteScroll (targetRef: MutableRefObject<Element | null>, onLoad: any, evaluateEnd: any, limit = 10, initialPage = 1, offset = 50) {
    const [page, setPage] = useState(initialPage);
    const [hasReachEnd, setHasReachEnd] = useState(false);
    const options: IntersectionObserverInit = { rootMargin: `0px 0px ${offset}px 0px` };
    const isIntersecting = useIntersectionObserver(targetRef, options);

    const asyncCall = useCallback(() => {
      return onLoad(page, limit)
    }, [page, limit]);

    const { isLoading, response } = useAsyncCall(asyncCall);

    useEffect(() => {
      isIntersecting && !isLoading && !hasReachEnd && setPage((prevPage) => prevPage + 1);
    }, [isIntersecting]);

    useEffect(() => {
      if (response && evaluateEnd) {
        evaluateEnd(response, page, setHasReachEnd);
      }
    }, [response, evaluateEnd, page]);

    return { isLoading, response, setPage };
}

export default useInfiniteScroll;
