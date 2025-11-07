import React from 'react';
import LoginCard from './LoginCard';

export default function LoginPage({ onSuccess, onError }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Welcome to EcoShopper</h1>
          <p className="mt-4 text-slate-600">
            Sign in with Google to sync your eco scans and personalized recommendations across devices. Your token stays in memory and is never stored in localStorage.
          </p>
          <ul className="mt-6 list-disc pl-5 text-slate-600 space-y-2">
            <li>Secure, privacy-first authentication</li>
            <li>No passwords stored by us</li>
            <li>Ready for backend verification</li>
          </ul>
        </div>
        <div>
          <LoginCard onSuccess={onSuccess} onError={onError} />
        </div>
      </div>
    </section>
  );
}
