import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Dashboard({ user }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          <h3 className="text-xl font-semibold text-slate-800">Welcome{user?.name ? `, ${user.name}` : ''}!</h3>
        </div>
        <p className="mt-2 text-slate-600">
          You are signed in with Google. Your personal scan history, green scores, and recommendations will sync to your account.
        </p>
      </div>
    </section>
  );
}
