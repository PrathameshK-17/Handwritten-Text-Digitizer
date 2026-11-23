import ActionBar from './ActionBar';

const TAB_OPTIONS = [
  { key: 'raw', label: 'Extracted Text' },
  { key: 'corrected', label: 'MI Corrected Text' },
];

export default function OutputPanel({
  result,
  loading,
  hasFile,
  activeTab,
  onTabChange,
  onCopy,
  onDownload,
  onListen,
  listening,
  error,
}) {
  const activeContent = activeTab === 'raw' ? result?.originalText || '' : result?.completedText || '';
  const words = activeContent.trim() ? activeContent.trim().split(/\s+/).length : 0;
  const chars = activeContent.length;

  return (
    <section className="landing-glass rounded-[22px] p-5 sm:p-6 lg:p-7">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white sm:text-xl">Output Workspace</h2>
        <div className="rounded-full border border-white/15 bg-white/2 px-3 py-1 text-xs text-slate-300">
          {words} words • {chars} chars
        </div>
      </div>

      <div className="mt-4 inline-flex rounded-xl border border-white/15 bg-white/2 p-1">
        {TAB_OPTIONS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              disabled={loading || !result}
              className={[
                'rounded-lg px-3 py-1.5 text-sm transition duration-200 sm:px-4',
                active
                  ? 'bg-white/12 text-white'
                  : 'text-slate-300 hover:text-white disabled:hover:text-slate-400',
                'disabled:cursor-not-allowed disabled:opacity-60',
              ].join(' ')}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 min-h-90 rounded-2xl border border-white/12 bg-[#0f1628] p-4 sm:p-5">
        {loading ? (
          <div className="flex h-75 flex-col items-center justify-center text-center">
            <div className="mb-4 h-11 w-11 rounded-full border-2 border-violet-300/35 border-t-violet-300 animate-spin" />
            <p className="text-base font-medium text-slate-100">Processing your handwritten notes...</p>
            <p className="mt-2 text-sm text-slate-400">This usually takes a few seconds.</p>
            <div className="mt-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full animate-[loading-shimmer_1.4s_ease-in-out_infinite] bg-linear-to-r from-transparent via-blue-400/60 to-transparent" />
            </div>
          </div>
        ) : null}

        {!loading && !result && !error ? (
          <div className="flex h-75 flex-col items-center justify-center text-center">
            <svg className="mb-4 h-14 w-14 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M8 10h8M8 14h5" />
            </svg>
            <p className="text-base font-medium text-slate-100">Upload an image to extract handwritten text using AI</p>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Your extracted and corrected content will appear here with export options.
            </p>
          </div>
        ) : null}

        {!loading && error ? (
          <div className="auth-error-shake rounded-xl border border-rose-400/35 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        {!loading && result ? (
          <div key={activeTab} className="auth-fade-in h-75 overflow-y-auto whitespace-pre-wrap rounded-xl bg-white/2 p-4 text-sm leading-[1.75] text-slate-100 sm:text-[15px]">
            {activeContent}
          </div>
        ) : null}
      </div>

      <ActionBar
        disabled={loading || !result || !hasFile}
        hasText={Boolean(activeContent.trim())}
        onCopy={onCopy}
        onDownload={onDownload}
        onListen={onListen}
        listening={listening}
      />
    </section>
  );
}
