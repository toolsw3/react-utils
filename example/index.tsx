import { useCallback, useRef } from 'react';
import { render } from 'react-dom';
import useInfiniteScroll from '../src/hooks/useInfiniteScroll';

function App () {
    const targetRef = useRef(null);
    const asyncCall = useCallback((page: number, limit: number) => fetch(`https://dummyapi.io/data/v1/user?limit=${limit}&page=${page}`, { headers: {'app-id': '611fb2b4194167643cc30364'}}).then(res => res.json()), []);
    const evaluateEnd = useCallback((response: any, page: number, setHasReachEnd) => {
        
    }, []);
    const { isLoading, response } = useInfiniteScroll(targetRef, asyncCall, evaluateEnd, 10);

    return (
        <div style={{ height: '150vh'}}>
            <h1 style={{ position: 'fixed', top: 20, left: 20, color: true ? 'red' : 'black' }}>Hello</h1>
            <h2 ref={targetRef} style={{ marginTop: '120vh', width: '100%', textAlign: 'center' }}>Target</h2>
        </div>
    );
};

render(<App />, document.getElementById('root'));
