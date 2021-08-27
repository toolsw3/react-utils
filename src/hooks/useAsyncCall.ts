import { useEffect, useState } from 'react';

interface FetchState<TResponse> {
  response: TResponse | null;
  responseError: Error | null;
  isLoading: boolean;
}

interface AsyncCallReturn<TResponse> {
  isLoading: boolean;
  response: TResponse | null;
  responseError: Error | null;
}

function useAsyncCall<TResponse>(
  asyncCall: () => Promise<TResponse>,
): AsyncCallReturn<TResponse> {
  const [fetchState, setFetchState] = useState<FetchState<TResponse>>({
    response: null,
    responseError: null,
    isLoading: false,
  });

  useEffect(() => {
    let isMounted = true;
    setFetchState({
      isLoading: true,
      response: null,
      responseError: null,
    });
    const makeCall = async () => {
      try {
        const res = await asyncCall();
        if (isMounted) {
          setFetchState({
            isLoading: false,
            response: res,
            responseError: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setFetchState({
            isLoading: false,
            response: null,
            responseError: error,
          });
        }
      }
    };
    makeCall();
    return () => {
      isMounted = false;
    };
  }, [asyncCall]);

  return { ...fetchState };
}

export default useAsyncCall;
