import React from 'react';

function Step({ number, title, children }) {
  return (
    <li className="relative pl-10 py-4 border-l border-slate-200">
      <span className="absolute -left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold">
        {number}
      </span>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-2 text-slate-600 space-y-2">{children}</div>
    </li>
  );
}

export default function StepList() {
  return (
    <ol className="relative mt-6 space-y-2">
      <Step number={1} title="Open Google Cloud Console">
        <p>
          Visit <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-emerald-700 underline">APIs & Services → Credentials</a> in the Google Cloud Console. Sign in with your Google account if prompted.
        </p>
      </Step>

      <Step number={2} title="Create or select a project">
        <p>
          Use an existing project or click <span className="font-medium">Create Project</span>. Give it a recognizable name like "EcoShopper".
        </p>
      </Step>

      <Step number={3} title="Configure OAuth consent screen">
        <p>
          In the left menu, open <span className="font-medium">OAuth consent screen</span>. Choose <span className="font-medium">External</span> for most apps, fill the basic app info, and save.
        </p>
      </Step>

      <Step number={4} title="Create OAuth 2.0 Client ID">
        <ul className="list-disc pl-5 space-y-1">
          <li>Go to <span className="font-medium">Credentials</span> → <span className="font-medium">Create Credentials</span> → <span className="font-medium">OAuth client ID</span>.</li>
          <li>Choose <span className="font-medium">Web application</span>.</li>
          <li>Add an authorized JavaScript origin for your local dev and preview URLs (e.g., http://localhost:3000 and your sandbox URL).</li>
          <li>You don't need authorized redirect URIs when using the Google Identity Services One Tap or button with ID tokens.</li>
        </ul>
      </Step>

      <Step number={5} title="Copy your Client ID">
        <p>
          After creating, copy the <span className="font-medium">Client ID</span>. Keep the secret private; you won't need the client secret for ID token sign-in.
        </p>
      </Step>

      <Step number={6} title="Add it to your app environment">
        <ul className="list-disc pl-5 space-y-1">
          <li>Set <code className="px-1 rounded bg-slate-100">VITE_GOOGLE_CLIENT_ID</code> to the copied value.</li>
          <li>Restart your dev server if needed so the new variable is picked up.</li>
        </ul>
      </Step>

      <Step number={7} title="Verify backend configuration">
        <p>
          Ensure your backend verifies the ID token (e.g., using Google tokeninfo) and sets a secure HTTP-only session cookie. Frontend calls should include <code className="px-1 rounded bg-slate-100">credentials: 'include'</code>.
        </p>
      </Step>
    </ol>
  );
}
