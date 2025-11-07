import React, { useCallback, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import LoginCard from './components/LoginCard';
import Dashboard from './components/Dashboard';
import ErrorBanner from './components/ErrorBanner';

// Minimal JWT decoder (no external deps). Does not verify signature (that should be done server-side),
// but we only use it client-side to display basic profile info and expiration handling.
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
  const [idToken, setIdToken] = useState(null); // kept in-memory only
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

  const handleLoginSuccess = useCallback((credential) => {
    // Basic client-side safety: clear previous errors, set token in memory only
    setError('');
    setIdToken(credential);
  }, []);

  const handleLoginError = useCallback((e) => {
    setError(e?.message || 'Sign-in failed. Please try again.');
  }, []);

  const handleLogout = useCallback(() => {
    setIdToken(null);
    setError('');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <ErrorBanner message={error} onClose={() => setError('')} />

      <Navbar
        user={user}
        onLogin={() => {
          // no-op: the LoginCard renders the real Google button on the page
          const el = document.getElementById('googleBtn');
          if (el) el.focus();
        }}
        onLogout={handleLogout}
        onToggleHistory={() => setError('History is available after you connect the backend.')} // placeholder UX
        scanCount={0}
      />

      <main className="mx-auto max-w-6xl px-4 py-10">
        {!user ? (
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
                Sign in with Google to sync your eco scans securely
              </h1>
              <p className="mt-3 text-slate-600">
                We use Google Identity Services for one-tap authentication. Your token stays in memory and is sent only over HTTPS if you connect a backend for verification.
              </p>
              <div className="mt-8">
                <LoginCard onSuccess={handleLoginSuccess} onError={handleLoginError} />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">What you get</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>• Secure Google sign-in with tokens kept in-memory</li>
                <li>• Auto-expiration handling for added safety</li>
                <li>• Ready to integrate with a FastAPI backend token verifier</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <Dashboard user={user} />
            <section className="mx-auto max-w-6xl px-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="text-slate-800 font-semibold">Account</h4>
                <div className="mt-4 flex items-center gap-4">
                  {user.picture && (
                    <img src={user.picture} alt="Avatar" className="h-12 w-12 rounded-full border border-slate-200" />
                  )}
                  <div>
                    <div className="font-medium text-slate-900">{user.name}</div>
                    <div className="text-sm text-slate-600">{user.email}</div>
                  </div>
                </div>
                <p className="mt-6 text-sm text-slate-600">
                  For full verification and session management, connect a backend endpoint to validate this ID token with Google and issue an HTTP-only session cookie. This demo intentionally avoids localStorage for better security.
                </p>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-sm text-slate-500">
        Built with React, Tailwind, and Google Identity Services.
      </footer>
    </div>
  );
}
