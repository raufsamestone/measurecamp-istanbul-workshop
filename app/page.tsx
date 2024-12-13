'use client';

import { useState } from 'react';
import { useTracking } from './components/TrackingProvider';
import { Bell, Gift, Snowflake } from 'lucide-react';

export default function HomePage() {
  const { trackEvent } = useTracking();
  const [santaClicks, setSantaClicks] = useState(0);

  const handleGiftClick = () => {
    trackEvent('gift_click', {
      button_id: 'christmas_gift',
      page: 'home',
      gifts_clicked: santaClicks + 1
    });
    setSantaClicks(prev => prev + 1);
  };

  const handleWishlistClick = () => {
    trackEvent('wishlist_open', {
      button_id: 'wishlist_button',
      page: 'home'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold text-red-500 mb-4">
            🎄 Berkay's Analytics Workshop 🎅
          </h1>
          <p className="text-xl text-green-100">
            Where Server-Side Tracking Meets Holiday Magic ✨
          </p>
        </div>c

        {/* Main content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              <div className="text-center p-6 bg-red-500/20 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">
                  🎁 Gift Counter: {santaClicks}
                </h2>
                <button
                  onClick={handleGiftClick}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2 w-full"
                >
                  <Gift className="w-6 h-6" />
                  Track a Gift!
                </button>
              </div>

              <div className="text-center p-6 bg-green-500/20 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">
                  🔔 Wishlist Tracker
                </h2>
                <button
                  onClick={handleWishlistClick}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2 w-full"
                >
                  <Bell className="w-6 h-6" />
                  Open Wishlist
                </button>
              </div>
            </div>

            {/* Right column */}
            <div className="bg-blue-500/20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">
                ❄️ Event Dashboard
              </h2>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm">Latest Event:</p>
                  <p className="font-mono">
                    {santaClicks > 0 ?
                      `gift_click: ${santaClicks} gifts tracked` :
                      'No events yet! Click a button to start tracking 🎁'}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Snowflake className="animate-spin text-blue-300" />
                  <Snowflake className="animate-spin text-blue-300" delay="200ms" />
                  <Snowflake className="animate-spin text-blue-300" delay="400ms" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-green-100">
          <p>🎄 Tracking both client-side and server-side, just like Santa tracks his gifts! 🎄</p>
        </div>
      </div>
    </div>
  );
}