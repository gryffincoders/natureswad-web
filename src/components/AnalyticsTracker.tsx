// src/components/AnalyticsTracker.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase'; // Ensure this path points to your firebase.js config

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Only log if analytics initialized successfully (e.g., ignoring adblockers or SSR)
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: location.pathname,
        page_search: location.search,
        page_title: document.title,
      });
      console.log("Firebase Analytics: Logged visit to", location.pathname);
    }
  }, [location]);

  return null; // This component is invisible
}