import React, { useEffect, useState } from 'react';

// Lightweight Google Identity Services integration without extra packages
// Expects VITE_GOOGLE_CLIENT_ID to be defined. We never store tokens in localStorage; we keep them in memory only.

export default function GoogleAuth({ onSuccess, onError }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Inject Google script if not present
    const id = 'google-identity';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.defer = true;
      s.id = id;
      s.onload = () => setReady(true);
      s.onerror = () => onError?.(new Error('Failed to load Google SDK'));
      document.head.appendChild(s);
    } else {
      setReady(true);
    }
  }, [onError]);

  useEffect(() => {
    if (!ready) return;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      onError?.(new Error('Missing VITE_GOOGLE_CLIENT_ID'));
      return;
    }

    /* global google */
    try {
      window.google?.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          // response.credential is a JWT. We keep it in memory, forward to backend for verification via token exchange.
          onSuccess?.(response.credential);
        },
        auto_select: false,
        ux_mode: 'popup',
      });

      window.google?.accounts.id.renderButton(
        document.getElementById('googleBtn'),
        { theme: 'filled_black', size: 'large', shape: 'pill', text: 'signin_with' }
      );
    } catch (e) {
      onError?.(e);
    }
  }, [ready, onSuccess, onError]);

  return (
    <div className="w-full">
      <div id="googleBtn" className="inline-block" />
    </div>
  );
}
