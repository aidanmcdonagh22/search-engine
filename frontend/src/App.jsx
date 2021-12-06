import {
    useEffect,
    useState
} from 'react';
import Search from './search/Search';
import Results from './results/Results';
import ErrorBoundary from './errorBoundary';
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState();
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [count, setCount] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (search && search !== "") {
            setLoading(true);
            const getData = async () => {
                try {
                    const response = await fetch(`http://localhost:${process.env.BACKEND_PORT || 8080}/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": 'application/json'
                        },
                        body: JSON.stringify({ search, skip, limit })
                    });
                    if (response.ok) return await response.json();
                    throw new Error(response.statusText);
                } catch (error) {
                    throw new Error(error);
                } finally {
                    setLoading(false);
                }
            }
            getData().then(res => {
                setCount(res[0].count[0].count)
                setResult(res[0].data);
            });
        }
    }, [search, limit, skip]);

    return (
        <ErrorBoundary>
            {!result && !loading && <Search onSubmit={setSearch} />}
            {result && !loading && (
                <Results
                    results={result}
                    count={count}
                    setSkip={setSkip}
                    limit={limit}
                    setLimit={setLimit}
                    back={() => setResult(null)}
                />
            )}
            {!result && loading && <CircularProgress />}
        </ErrorBoundary>
    );
};

export default App;