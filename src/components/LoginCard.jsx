import React from 'react';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import GoogleAuth from './GoogleAuth';

export default function LoginCard({ onSuccess, onError }) {
  return (
    <div className="mx-auto max-w-md w-full">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center gap-2 text-slate-800">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Sign in securely</h2>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          We use Google for authentication. Your ID token is kept in-memory only and sent over HTTPS to our backend for verification.
        </p>

        <div className="mt-6 flex items-center justify-center">
          <GoogleAuth onSuccess={onSuccess} onError={onError} />
        </div>

        <ul className="mt-6 space-y-2 text-sm text-slate-600">
          <li className="flex items-center gap-2"><Lock className="h-4 w-4 text-slate-500" />
            Encrypted transport with TLS. We never store your Google password.
          </li>
          <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-slate-500" />
            You can sign out anytime from the top bar.
          </li>
        </ul>
      </div>
    </div>
  );
}
