import { MutableRefObject, useEffect, useRef, useState } from 'react';

function useIntersectionObserver(
  targetRef: MutableRefObject<Element | null>,
  options: IntersectionObserverInit,
): boolean {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleEntries: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
      } else {
        setIsIntersecting(false);
      }
    });
  };

  useEffect(() => {
    if (targetRef?.current) {
      const observer = new IntersectionObserver(handleEntries, options);
      observer.observe(targetRef.current);
      observerRef.current = observer;
    }
    return () => {
      const currentObserver = observerRef.current;
      currentObserver?.disconnect();
      observerRef.current = null;
    };
  }, [options, targetRef]);

  return isIntersecting;
}

export default useIntersectionObserver;
