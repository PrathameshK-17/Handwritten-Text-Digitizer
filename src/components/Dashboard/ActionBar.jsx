const ACTIONS = [
  { key: 'copy', label: 'Copy All Text' },
  { key: 'pdf', label: 'Download PDF' },
  { key: 'docx', label: 'Download Word' },
  { key: 'txt', label: 'Download TXT' },
];

export default function ActionBar({
  disabled = false,
  hasText = false,
  onCopy,
  onDownload,
  onListen,
  listening = false,
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
      {ACTIONS.map((action) => {
        const isPrimary = action.key === 'copy';
        const isDisabled = disabled || (action.key === 'copy' && !hasText);

        return (
          <button
            key={action.key}
            type="button"
            onClick={() => {
              if (action.key === 'copy') {
                onCopy();
                return;
              }
              onDownload(action.key);
            }}
            disabled={isDisabled}
            className={[
              'inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition duration-200',
              'disabled:cursor-not-allowed disabled:opacity-55',
              isPrimary
                ? 'bg-linear-to-r from-blue-500 to-violet-500 text-white shadow-[0_14px_34px_rgba(76,104,255,0.3)] hover:scale-[1.02] hover:shadow-[0_18px_42px_rgba(83,92,255,0.4)]'
                : 'border border-white/18 bg-white/2 text-slate-200 hover:border-white/35 hover:bg-white/6',
            ].join(' ')}
          >
            {action.label}
          </button>
        );
      })}

      {onListen ? (
        <button
          type="button"
          onClick={onListen}
          disabled={disabled}
          className={[
            'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition duration-200',
            'disabled:cursor-not-allowed disabled:opacity-55',
            listening
              ? 'border-rose-300/40 bg-rose-500/12 text-rose-200'
              : 'border-white/18 bg-white/2 text-slate-200 hover:border-white/35 hover:bg-white/6',
          ].join(' ')}
        >
          <span className={listening ? 'h-2 w-2 rounded-full bg-rose-300 animate-pulse' : 'h-2 w-2 rounded-full bg-blue-300'} />
          {listening ? 'Stop Audio' : 'Listen'}
        </button>
      ) : null}
    </div>
  );
}
