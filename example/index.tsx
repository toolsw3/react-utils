import { render } from 'react-dom';
import React, { useCallback, useEffect, useState } from 'react';
import useInfiniteScroll from '../src/hooks/useInfiniteScroll';

function App() {
  const [filter, setFilters] = useState(0);
  const onLoad = useCallback(
    (page) =>
      new Promise<any>((resolve) => {
        setTimeout(() => {
          resolve(page + filter);
        }, 1000);
      }),
    [filter],
  );
  const { ref, reset } = useInfiniteScroll({
    onLoad,
    evaluateEnd: (res, setT) => {
      if (res === 1) {
        setT(true);
      }
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setFilters(3);
      reset();
    }, 6000);
  }, [reset]);
  return (
    <main style={{ height: '200vh' }}>
      <h1 ref={ref}>Target</h1>
    </main>
  );
}

render(<App />, document.getElementById('root'));
