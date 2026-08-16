import Link from 'next/link';
import BeforeAfterDemo from './BeforeAfterDemo';
import Reveal from './Reveal';

const trustHighlights = [
  {
    title: 'Accurate AI Extraction',
    subtitle: 'High-fidelity OCR tuned for handwritten documents.',
    icon: <TargetIcon />,
  },
  {
    title: 'Supports Multiple Handwriting Styles',
    subtitle: 'Cursive, print, mixed-case, and uneven spacing.',
    icon: <PenIcon />,
  },
  {
    title: 'Instant Export to PDF & Word',
    subtitle: 'One-click export to the format your workflow needs.',
    icon: <FileIcon />,
  },
  {
    title: 'Fast Processing',
    subtitle: 'Upload to result in seconds with optimized inference.',
    icon: <BoltIcon />,
  },
];

const howItWorks = [
  {
    title: 'Upload Image',
    description: 'Drag and drop a photo or scan of your handwritten notes.',
    icon: <UploadIcon />,
  },
  {
    title: 'AI Extracts Text',
    description: 'Our OCR engine reads the handwriting and structures the text.',
    icon: <ProcessingIcon />,
  },
  {
    title: 'Download Clean Text',
    description: 'Get corrected, editable output in PDF or Word instantly.',
    icon: <DownloadIcon />,
  },
];

const featureCards = [
  {
    title: 'AI-powered OCR',
    description: 'Purpose-built OCR pipeline for handwriting-heavy documents.',
    icon: <TargetIcon />,
  },
  {
    title: 'Smart text correction',
    description: 'Language-aware AI improves grammar, spacing, and readability.',
    icon: <SparkIcon />,
  },
  {
    title: 'Multiple export formats',
    description: 'Download clean output as PDF and Word without extra steps.',
    icon: <FileIcon />,
  },
  {
    title: 'Works with messy handwriting',
    description: 'Handles low-contrast, noisy scans, and uneven pen strokes.',
    icon: <PenIcon />,
  },
  {
    title: 'Mobile responsive',
    description: 'Capture notes on mobile and continue editing on desktop.',
    icon: <MobileIcon />,
  },
  {
    title: 'Fast processing',
    description: 'Low-latency pipeline designed for rapid batch conversion.',
    icon: <BoltIcon />,
  },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-[#0b0f19] text-[#e5e7eb]">
      <div className="landing-noise pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-120 w-120 -translate-x-[58%] rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 -right-36 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f19]/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-violet-500 text-sm font-semibold text-white">
              AI
            </div>
            <span className="text-sm font-medium tracking-wide text-slate-100">NoteDigit AI</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#how-it-works" className="transition hover:text-white">How it works</a>
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#demo" className="transition hover:text-white">Demo</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:text-white sm:inline-flex"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex rounded-xl bg-linear-to-r from-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(59,130,246,0.35)] transition hover:scale-[1.02] hover:shadow-[0_12px_36px_rgba(99,102,241,0.45)]"
            >
              Try Free
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="flex min-h-screen items-center px-6 pb-16 pt-24 md:px-10">
          <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <Reveal>
              <div className="max-w-xl">
                <p className="mb-5 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-medium tracking-[0.16em] text-blue-200">
                  AI HANDWRITING DIGITIZER
                </p>

                <h1 className="text-balance text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-6xl">
                  Turn Handwritten Notes into Clean Digital Text
                </h1>

                <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
                  Upload your notes and let AI instantly extract, clean, and convert them into editable formats.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(76,104,255,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(89,99,255,0.52)]"
                  >
                    Upload Image
                    <ArrowRightIcon />
                  </Link>
                  <a
                    href="#demo"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/40 hover:bg-white/10"
                  >
                    See Demo
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={140}>
              <div className="landing-glass hero-float rounded-[26px] p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="rounded-full border border-slate-400/40 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-200">
                    Live AI Pipeline Preview
                  </span>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-slate-500/30 bg-[#101828] p-4">
                    <div className="mb-3 flex items-center justify-between text-xs text-slate-300">
                      <span>Image Upload</span>
                      <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-blue-200">New</span>
                    </div>
                    <div className="rounded-xl border border-dashed border-slate-500/50 bg-[#111b31] p-4">
                      <div className="grid grid-cols-[72px_1fr] gap-3">
                        <div className="rounded-lg border border-slate-500/40 bg-[#efe4cc] p-2 text-[10px] text-[#3e2e1c] font-['Bradley_Hand','Comic_Sans_MS',cursive]">
                          Notes
                          <br />
                          from
                          <br />
                          class
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 rounded-full bg-slate-700/80" />
                          <div className="h-2 w-5/6 rounded-full bg-slate-700/70" />
                          <div className="h-2 w-2/3 rounded-full bg-slate-700/60" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-500/30 bg-slate-900/65 p-4">
                      <p className="mb-3 text-xs text-slate-300">Extracted Text</p>
                      <div className="space-y-2 text-xs leading-6 text-slate-300">
                        <p>meeting notes sprint 14</p>
                        <p>need cleaner docs for handover</p>
                        <p>ocr correction quality pending</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-300/25 bg-emerald-500/10 p-4">
                      <p className="mb-3 text-xs text-emerald-100">Corrected Text</p>
                      <div className="space-y-2 text-xs leading-6 text-slate-100">
                        <p>Meeting Notes - Sprint 14</p>
                        <p>Need cleaner docs for handover.</p>
                        <p>OCR correction quality finalized.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] text-slate-200">Export PDF</span>
                    <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] text-slate-200">Export Word</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/2 px-6 py-10 md:px-10">
          <div className="mx-auto grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustHighlights.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 70}>
                <div className="landing-glass h-full rounded-2xl p-5">
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-blue-200">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.subtitle}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="px-6 py-24 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-200">How It Works</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Three steps from paper to polished text</h2>
              </div>
            </Reveal>

            <div className="relative mt-14">
              <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-linear-to-r from-transparent via-blue-400/40 to-transparent md:block" />
              <div className="grid gap-6 md:grid-cols-3">
                {howItWorks.map((step, index) => (
                  <Reveal key={step.title} delayMs={index * 90}>
                    <article className="landing-glass group h-full rounded-3xl p-6 transition hover:-translate-y-1.5 hover:border-white/25">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/20 to-violet-500/20 text-blue-200">
                          {step.icon}
                        </div>
                        <span className="text-sm font-semibold text-slate-300">0{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-6 py-24 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-200">Features</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Designed for real-world handwritten workflows
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((feature, index) => (
                <Reveal key={feature.title} delayMs={index * 60}>
                  <article className="landing-glass group h-full rounded-3xl p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(15,23,42,0.45)]">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/20 to-violet-500/20 text-blue-200">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="px-6 py-24 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <div className="mb-10 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-200">Preview</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Before vs after conversion quality</h2>
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <BeforeAfterDemo />
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-10">
          <Reveal>
            <div className="mx-auto w-full max-w-5xl rounded-[28px] border border-white/15 bg-linear-to-br from-blue-500/20 via-violet-500/15 to-transparent p-10 text-center shadow-[0_20px_80px_rgba(59,130,246,0.2)] backdrop-blur-xl sm:p-14">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Start Converting Your Notes Today</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Join students, researchers, and teams using NoteDigit AI to convert handwritten notes into clear, editable documents.
              </p>
              <div className="mt-8">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-blue-500 to-violet-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(76,104,255,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(89,99,255,0.52)]"
                >
                  Try Now
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-10 md:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 text-sm text-slate-300 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-violet-500 text-xs font-semibold text-white">
              AI
            </div>
            <span>Pen2text</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="transition hover:text-white">About</a>
            <a href="#" className="transition hover:text-white">Contact</a>
            <a href="#" className="transition hover:text-white">Privacy</a>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <a href="#" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition hover:border-white/35 hover:text-white">
              <SocialXIcon />
            </a>
            <a href="#" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition hover:border-white/35 hover:text-white">
              <SocialLinkedInIcon />
            </a>
            <a href="#" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition hover:border-white/35 hover:text-white">
              <SocialGitHubIcon />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20l4.5-1 9.8-9.8a2.2 2.2 0 0 0 0-3.1l-.5-.5a2.2 2.2 0 0 0-3.1 0L4.9 15.4 4 20z" />
      <path d="M13.8 6.2l4 4" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v6h6" />
      <path d="M10 13h6M10 17h6" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 16V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M4 20h16" />
    </svg>
  );
}

function ProcessingIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path className="landing-spin-slow" d="M12 4a8 8 0 0 1 8 8" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4v12" />
      <path d="M7 12l5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2l1.8 4.5L18 8.3l-4.2 1.8L12 14.6l-1.8-4.5L6 8.3l4.2-1.8L12 2z" />
      <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10 6h4" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function SocialXIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

function SocialLinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9v9M6 6.5v.01M11 18v-5a3 3 0 0 1 6 0v5M11 12V9h6v3" />
    </svg>
  );
}

function SocialGitHubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5a3 3 0 0 0-.9-2.4c3 0 6-1.8 6-6.1a4.7 4.7 0 0 0-1.3-3.2 4.5 4.5 0 0 0-.1-3.2s-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C7.1 2.3 6 2.6 6 2.6a4.5 4.5 0 0 0-.1 3.2A4.7 4.7 0 0 0 4.6 9c0 4.3 3 6.1 6 6.1a3 3 0 0 0-.9 2.4V21" />
    </svg>
  );
}
