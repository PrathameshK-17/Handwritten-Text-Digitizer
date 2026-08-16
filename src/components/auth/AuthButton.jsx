import Link from 'next/link';

export default function AuthButton({
  label,
  type = 'button',
  loading = false,
  loadingLabel = 'Please wait...',
  disabled = false,
  href,
  variant = 'primary',
  className = '',
}) {
  const baseClasses = 'inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200';
  const primaryClasses = 'bg-linear-to-r from-blue-500 to-violet-500 text-white shadow-[0_16px_40px_rgba(76,104,255,0.35)] hover:scale-[1.02] hover:shadow-[0_20px_46px_rgba(91,98,255,0.45)] disabled:scale-100 disabled:opacity-60';
  const secondaryClasses = 'border border-white/15 bg-white/[0.02] text-slate-200 hover:border-white/30 hover:bg-white/[0.05]';

  const allClasses = [baseClasses, variant === 'primary' ? primaryClasses : secondaryClasses, className].join(' ');

  if (href) {
    return (
      <Link href={href} className={allClasses}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled || loading} className={allClasses}>
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
          {loadingLabel}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
