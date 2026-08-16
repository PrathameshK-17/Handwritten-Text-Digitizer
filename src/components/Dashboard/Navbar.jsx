'use client';

import Link from 'next/link';

export default function Navbar({ userEmail = '' }) {
  const initials = getInitials(userEmail);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      window.location.href = '/login';
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f19]/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-7 lg:px-10">
        <Link href="/" className="inline-flex items-center gap-2.5 text-slate-100">
          <svg className="h-6 w-6 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 12h16" />
            <path d="M9 7h6" />
            <path d="M7 17h10" />
          </svg>
          <span className="text-base font-semibold tracking-tight sm:text-lg">Pen2Text</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/2 px-3 py-1.5 sm:inline-flex">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-violet-500 text-xs font-semibold text-white">
              {initials}
            </span>
            <span className="max-w-45 truncate text-sm text-slate-300">{userEmail || 'User'}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center rounded-xl border border-white/15 px-3 py-2 text-sm text-slate-200 transition hover:border-rose-300/40 hover:bg-rose-500/10 hover:text-rose-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

function getInitials(value) {
  if (!value) return 'U';

  const source = value.includes('@') ? value.split('@')[0] : value;
  const parts = source
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
