import { useEffect, useState } from 'react';

interface FetchState {
  response: any;
  responseError: any;
  isLoading: boolean;
}

const initialFetchState: FetchState = {
  response: null,
  responseError: null,
  isLoading: false,
};

function useAsyncCall(asyncCall: () => Promise<any>) {
  const [{ response, responseError, isLoading }, setFetchState] = useState<FetchState>(initialFetchState);

  useEffect(() => {
    let isMounted = true;
    setFetchState({
      isLoading: true,
      response: null,
      responseError: null,
    });
    const makeCall = async () => {
      try {
        const response = await asyncCall();
        if (isMounted) {
          setFetchState({
            isLoading: false,
            response,
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
    }
  }, [asyncCall]);

  return { response, responseError, isLoading };
}

export default useAsyncCall;
