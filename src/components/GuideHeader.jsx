import React from 'react';

export default function GuideHeader() {
  return (
    <section className="text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 text-sm font-medium">
        <span>Google Identity Services</span>
      </div>
      <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
        Create a Google OAuth Client ID
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-slate-600">
        Follow these steps to generate a Client ID for Google Sign-In and use it in your app. 
        You will paste it into your environment as <span className="font-semibold">VITE_GOOGLE_CLIENT_ID</span>.
      </p>
    </section>
  );
}
