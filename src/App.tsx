import { useState } from 'react';
import Home from './components/Home';
import SplashScreen from './components/SplashScreen'; 
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  // 1. IDENTIFY THE ARCHITECT
  // Checks if the user is accessing via the internal system links or local development
  const isArchitect = typeof window !== 'undefined' && 
    (window.location.hostname.includes('portal') || 
     window.location.hostname.includes('hub') || 
     window.location.hostname.includes('localhost'));

  // 2. BYPASS LOGIC
  const [isSplashComplete, setIsSplashComplete] = useState(() => {
    // If it is a public client, instantly bypass the splash screen
    if (!isArchitect) return true; 
    
    // If it is the Architect, run the session check
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('splashSeen') === 'true';
    }
    return false;
  });

  return (
    <>
      {/* SECURE TERMINAL BOOT SEQUENCE (Only renders for you) */}
      {!isSplashComplete && isArchitect && (
        <SplashScreen onComplete={() => setIsSplashComplete(true)} />
      )}
      
      {/* PUBLIC DEPLOYMENT (Instant load for clients) */}
      <Home />
      
      <Analytics />
    </>
  );
}