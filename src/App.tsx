import React, { useEffect } from 'react';
import Routes from './routes';
import LoadingOverlay from './components/common/LoadingOverlay';
import { useLoadingStore } from './store/loadingStore';

function App() {
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <>
      <LoadingOverlay />
      <Routes />
    </>
  );
}

export default App;