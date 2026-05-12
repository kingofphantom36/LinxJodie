import { useState } from 'react';
import Home from './components/Home';
import SplashScreen from './components/SplashScreen'; // Ensure this path matches where you saved it
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  // Check session storage immediately so we don't get a 1-frame flicker on page reload
  const [isSplashComplete, setIsSplashComplete] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('splashSeen') === 'true';
    }
    return false;
  });

  return (
    <>
      {/* Mount the Splash Screen overlay if it hasn't been completed */}
      {!isSplashComplete && (
        <SplashScreen onComplete={() => setIsSplashComplete(true)} />
      )}
      
      {/* Mount Home immediately underneath so all assets preload silently */}
      <Home />
      
      <Analytics />
    </>
  );
}