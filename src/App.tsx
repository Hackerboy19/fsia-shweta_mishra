import { useEffect, useState } from 'react';
import ShwetaProfilePage from './components/ShwetaProfilePage';
import NominationPage from './components/NominationPage';

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (route.startsWith('#/nominate')) return <NominationPage />;
  return <ShwetaProfilePage />;
}
