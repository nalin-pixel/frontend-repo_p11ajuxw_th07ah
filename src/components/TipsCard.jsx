import React from 'react';

export default function TipsCard() {
  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-6">
      <h4 className="text-base font-semibold text-slate-900">Tips</h4>
      <ul className="mt-3 list-disc pl-5 text-slate-600 space-y-1">
        <li>Use the same Client ID on local and preview; add both origins in Google Cloud.</li>
        <li>For testing, you can leave the "Publishing status" of the consent screen as Testing and add your email as a test user.</li>
        <li>Never expose your Client Secret in frontend code; you only need the Client ID for ID tokens.</li>
        <li>If sign-in fails, check the browser console for "origin_mismatch" or CORS errors and update your authorized origins.</li>
      </ul>
    </div>
  );
}
