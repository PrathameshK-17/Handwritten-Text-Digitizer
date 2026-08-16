'use client';

import { useState } from 'react';

export default function BeforeAfterDemo() {
  const [mode, setMode] = useState<'extracted' | 'corrected'>('corrected');

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="landing-glass rounded-3xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300/80">Before</p>
          <span className="rounded-full border border-slate-500/40 bg-slate-800/70 px-3 py-1 text-[11px] text-slate-200">
            Handwritten Input
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-500/40 bg-[#e8dfcb] p-5 shadow-inner shadow-black/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.08)_1px,transparent_1px)] bg-size-[100%_28px] opacity-20" />
          <div className="relative space-y-3 text-lg leading-relaxed text-[#2e2213] font-['Bradley_Hand','Comic_Sans_MS',cursive]">
            <p>Meeting notes - Product sprint 14</p>
            <p>Need cleaner docs for client handover.</p>
            <p>Action: finalize OCR correction quality.</p>
            <p>Export to docx before 5 PM release.</p>
            <p className="opacity-70">Reminder: mobile scan support is urgent.</p>
          </div>
        </div>
      </div>

      <div className="landing-glass rounded-3xl p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300/80">After</p>
          <div className="inline-flex rounded-full border border-slate-500/50 bg-slate-900/70 p-1 text-xs">
            <button
              type="button"
              onClick={() => setMode('extracted')}
              className={[
                'rounded-full px-3 py-1 transition',
                mode === 'extracted' ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white',
              ].join(' ')}
            >
              Extracted
            </button>
            <button
              type="button"
              onClick={() => setMode('corrected')}
              className={[
                'rounded-full px-3 py-1 transition',
                mode === 'corrected' ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white',
              ].join(' ')}
            >
              Corrected
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-500/40 bg-slate-900/80 p-5 text-sm leading-7 text-slate-100">
          {mode === 'extracted' ? (
            <div className="space-y-3">
              <p>Meeting notes Product sprint 14</p>
              <p>Need cleaner docs for client hando ver</p>
              <p>Action finalize OCR correction quallity</p>
              <p>Export to docx before 5 PM re lease</p>
              <p>Reminder mobile scan support is urgen t</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p><strong>Meeting Notes - Product Sprint 14</strong></p>
              <p>Need cleaner documentation for the client handover.</p>
              <p>Action item: finalize OCR correction quality.</p>
              <p>Export to Word format before the 5 PM release.</p>
              <p>Reminder: mobile scan support is urgent.</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
          <span>{mode === 'extracted' ? 'Raw OCR output' : 'AI-corrected output'}</span>
          <span className="rounded-full border border-emerald-400/50 bg-emerald-500/10 px-2 py-1 text-emerald-200">
            {mode === 'extracted' ? '88% confidence' : '98% confidence'}
          </span>
        </div>
      </div>
    </div>
  );
}
