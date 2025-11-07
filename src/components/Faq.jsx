import React from 'react';

export default function Faq() {
  const items = [
    {
      q: 'Do I need a Client Secret?',
      a: 'Not for obtaining Google ID tokens with the Google Identity Services button or One Tap. The frontend only needs the Client ID. Keep the secret server-side if you use OAuth code flow.'
    },
    {
      q: 'What JavaScript origins should I add?',
      a: 'Add your local dev URL (http://localhost:3000) and your sandbox/preview URL shown above in the address bar. Use HTTPS for previews.'
    },
    {
      q: 'How do I use the Client ID in this app?',
      a: 'Set VITE_GOOGLE_CLIENT_ID in your environment. The Google button component reads it and initializes the Google SDK.'
    },
    {
      q: 'How does the backend use this?',
      a: 'The backend verifies ID tokens by calling Google tokeninfo and may validate the audience matches your Client ID, then issues a secure HTTP-only session cookie.'
    }
  ];

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.q} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-6">
          <h4 className="font-semibold text-slate-900">{it.q}</h4>
          <p className="mt-2 text-slate-600">{it.a}</p>
        </div>
      ))}
    </div>
  );
}
