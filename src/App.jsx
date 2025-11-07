import React, { useCallback, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ErrorBanner from './components/ErrorBanner';
import Dashboard from './components/Dashboard';
import AuthStatus from './components/AuthStatus';

// Minimal JWT decoder (no external deps). Does not verify signature (server will verify);
// only used to extract profile and check exp.
function decodeJwt(token) {
  try {
    const [, payload] = token.split('.');
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

export default function App() {
  const [error, setError] = useState('');
  const [idToken, setIdToken] = useState(null); // in-memory only
  const [verifying, setVerifying] = useState(false);

  const user = useMemo(() => {
    if (!idToken) return null;
    const data = decodeJwt(idToken);
    if (!data) return null;
    const now = Math.floor(Date.now() / 1000);
    if (data.exp && data.exp < now) return null;
    return {
      name: data.name || data.given_name || 'User',
      email: data.email,
      picture: data.picture,
      sub: data.sub,
    };
  }, [idToken]);

  const verifyWithBackend = useCallback(async (token) => {
    const base = import.meta.env.VITE_BACKEND_URL || '';
    try {
      setVerifying(true);
      const res = await fetch(`${base}/auth/google/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken: token }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Verification failed: ${res.status} ${txt}`);
      }
      const data = await res.json();
      return data;
    } catch (e) {
      setError(e.message || 'Backend verification failed');
      return null;
    } finally {
      setVerifying(false);
    }
  }, []);

  const handleLoginSuccess = useCallback(async (credential) => {
    setError('');
    setIdToken(credential);
    // Immediately verify with backend to establish session cookie
    const resp = await verifyWithBackend(credential);
    if (!resp?.ok) {
      // If backend rejected, clear token
      setIdToken(null);
    }
  }, [verifyWithBackend]);

  const handleLoginError = useCallback((e) => {
    setError(e?.message || 'Sign-in failed. Please try again.');
  }, []);

  const handleLogout = useCallback(async () => {
    setIdToken(null);
    setError('');
    // Inform backend to clear cookie
    const base = import.meta.env.VITE_BACKEND_URL || '';
    try {
      await fetch(`${base}/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <ErrorBanner message={error} onClose={() => setError('')} />

      <Navbar
        user={user}
        onLogin={() => {
          const el = document.getElementById('googleBtn');
          if (el) el.focus();
        }}
        onLogout={handleLogout}
        onToggleHistory={() => setError('History is available after you connect the backend.')}
        scanCount={0}
      />

      <main className="mx-auto max-w-6xl px-4 py-10">
        {!user ? (
          <LoginPage onSuccess={handleLoginSuccess} onError={handleLoginError} />
        ) : (
          <div className="space-y-8">
            <Dashboard user={user} />
            <AuthStatus user={user} />
            {verifying && (
              <div className="text-sm text-slate-600">Verifying your session…</div>
            )}
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-sm text-slate-500">
        Built with React, Tailwind, and Google Identity Services.
      </footer>
    </div>
  );
}
