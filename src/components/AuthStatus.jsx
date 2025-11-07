import React from 'react';

export default function AuthStatus({ user }) {
  if (!user) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        {user.picture && (
          <img src={user.picture} alt="Avatar" className="h-12 w-12 rounded-full border border-slate-200" />
        )}
        <div>
          <div className="font-medium text-slate-900">{user.name}</div>
          <div className="text-sm text-slate-600">{user.email}</div>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Your Google session is active. For full verification, we exchange your ID token with the backend and set an HTTP-only cookie.
      </p>
    </div>
  );
}
