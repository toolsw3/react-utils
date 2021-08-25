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
    setFetchState({
      isLoading: true,
      response: null,
      responseError: null,
    });
    const makeCall = async () => {
      try {
        const response = await asyncCall();
        
        setFetchState({
          isLoading: false,
          response,
          responseError: null,
        });
      } catch (error) {
        setFetchState({
          isLoading: false,
          response: null,
          responseError: error,
        });
      }
    };
    makeCall();
  }, [asyncCall]);

  return { response, responseError, isLoading };
}

export default useAsyncCall;
