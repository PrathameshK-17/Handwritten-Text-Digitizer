export default function AuthInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  required = true,
  leftIcon,
  rightIcon,
}) {
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-300">
        {label}
      </label>
      <div className="relative">
        {hasLeftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {leftIcon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={[
            'w-full rounded-2xl border bg-white/4 py-3 text-sm text-slate-100 placeholder:text-slate-400/85',
            'transition duration-200 outline-none',
            error
              ? 'border-rose-400/70 focus:border-rose-400/80 focus:ring-2 focus:ring-rose-500/30'
              : 'border-white/15 focus:border-violet-300/65 focus:ring-2 focus:ring-violet-400/35',
            hasLeftIcon ? 'pl-10' : 'pl-4',
            hasRightIcon ? 'pr-10' : 'pr-4',
          ].join(' ')}
        />

        {hasRightIcon && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
            {rightIcon}
          </span>
        )}
      </div>

      <div className="min-h-5 pt-1.5">
        {error ? (
          <p className="auth-error-fade text-xs text-rose-300">{error}</p>
        ) : null}
      </div>
    </div>
  );
}
