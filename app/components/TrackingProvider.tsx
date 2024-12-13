'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

type TrackingContextType = {
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
};

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const userId = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      let storedId = localStorage.getItem('user_id');
      if (!storedId) {
        storedId = uuidv4();
        localStorage.setItem('user_id', storedId);
      }
      return storedId;
    }
    return null;
  }, []);

  const trackEvent = async (eventName: string, eventData?: Record<string, any>) => {
    try {
      // Client-side tracking
      if (window.gtag) {
        window.gtag('event', eventName, eventData);
      }

      // Server-side tracking
      await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_name: eventName,
          event_data: eventData,
          user_id: userId,
        }),
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  return (
    <TrackingContext.Provider value={{ trackEvent }}>
      {children}
    </TrackingContext.Provider>
  );
}

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};