'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from './AuthLayout';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = { email: '', password: '' };

    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Invalid email';
    }

    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFieldErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to sign in');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setServerError(error.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      formTitle="Sign in"
      formSubtitle="Continue to your secure workspace and start digitizing notes."
      securityLabel="Secure Login"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-1">
          <AuthInput
            label="Email"
            name="email"
            type="email"
            value={email}
            autoComplete="email"
            placeholder="you@company.com"
            onChange={setEmail}
            error={fieldErrors.email}
            leftIcon={<MailIcon />}
          />

          <AuthInput
            label="Password"
            name="password"
            type="password"
            value={password}
            autoComplete="current-password"
            placeholder="Enter your password"
            onChange={setPassword}
            error={fieldErrors.password}
            rightIcon={<LockIcon />}
          />
        </div>

        <div className="mt-1 flex items-center justify-between gap-4 pb-1">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border border-white/25 bg-white/5 text-violet-500 focus:ring-2 focus:ring-violet-400/30"
            />
            Remember me
          </label>

          <a
            href="mailto:support@pen2text.ai?subject=Forgot%20Password"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Forgot Password?
          </a>
        </div>

        <div className="min-h-9 pt-1">
          {serverError ? (
            <div className="auth-error-shake rounded-xl border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {serverError}
            </div>
          ) : null}
        </div>

        <div className="mt-3 space-y-3">
          <AuthButton
            type="submit"
            label="Sign In"
            loading={loading}
            loadingLabel="Signing you in..."
          />

          <AuthButton
            href="/signup"
            variant="secondary"
            label="Create Account"
            className={loading ? 'pointer-events-none opacity-60' : ''}
          />
        </div>
      </form>
    </AuthLayout>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
