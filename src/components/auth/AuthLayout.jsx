import Link from 'next/link';

export default function AuthLayout({
  formTitle,
  formSubtitle,
  securityLabel,
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0f19] text-[#e5e7eb]">
      <div className="landing-noise pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-28 -top-28 h-88 w-88 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 -bottom-32 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="mx-auto grid min-h-screen w-full max-w-360 lg:grid-cols-2">
        <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex">
          <div className="auth-fade-in relative z-10 flex w-full flex-col justify-between p-14">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-violet-500 text-sm font-semibold text-white">
                  P2T
                </div>
                <span className="text-sm font-semibold tracking-[0.08em] text-slate-200">Pen2Text</span>
              </Link>
            </div>

            <div className="max-w-lg">
              <h1 className="text-5xl font-semibold leading-[1.1] text-white">Welcome to Pen2Text</h1>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
                Convert handwritten notes into clean digital text with AI.
              </p>

              <div className="hero-float mt-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/4 p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Live Conversion Preview</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-white/15 bg-slate-900/60 p-3">
                    <p className="mb-2 text-xs text-slate-300">Uploaded note</p>
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-slate-600/70" />
                      <div className="h-2 w-4/5 rounded-full bg-slate-600/60" />
                      <div className="h-2 w-2/3 rounded-full bg-slate-600/50" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-emerald-300/35 bg-emerald-500/10 p-3">
                    <p className="mb-1 text-xs font-medium text-emerald-200">AI corrected output ready</p>
                    <p className="text-xs text-slate-100">Export to PDF or Word in one click.</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400">Trusted by students, researchers, and teams.</p>
          </div>
        </section>

        <section className="relative flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="auth-fade-in w-full max-w-md">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <Link href="/" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-violet-500 text-xs font-semibold text-white">
                P2T
              </Link>
              <span className="text-sm font-semibold tracking-[0.08em] text-slate-200">Pen2Text</span>
            </div>

            <div className="landing-glass rounded-3xl p-6 sm:p-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-emerald-200">
                <LockIcon className="h-3.5 w-3.5" />
                {securityLabel}
              </p>

              <h2 className="mt-5 text-3xl font-semibold text-white">{formTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{formSubtitle}</p>

              <div className="mt-7">{children}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function LockIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
