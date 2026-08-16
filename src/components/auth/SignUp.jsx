'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from './AuthLayout';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUp() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name';
    }

    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Invalid email';
    }

    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);

    return !errors.fullName && !errors.email && !errors.password && !errors.confirmPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to create account');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setServerError(error.message || 'Unable to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      formTitle="Create account"
      formSubtitle="Start converting handwritten notes into polished digital text with AI."
      securityLabel="Secure Account Setup"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-1">
          <AuthInput
            label="Full Name"
            name="fullName"
            value={fullName}
            autoComplete="name"
            placeholder="Alex Johnson"
            onChange={setFullName}
            error={fieldErrors.fullName}
            leftIcon={<UserIcon />}
          />

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
            autoComplete="new-password"
            placeholder="Minimum 6 characters"
            onChange={setPassword}
            error={fieldErrors.password}
            rightIcon={<LockIcon />}
          />

          <AuthInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            onChange={setConfirmPassword}
            error={fieldErrors.confirmPassword}
            rightIcon={<LockIcon />}
          />
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
            label="Create Account"
            loading={loading}
            loadingLabel="Creating your account..."
          />

          <AuthButton
            href="/login"
            variant="secondary"
            label="Sign In"
            className={loading ? 'pointer-events-none opacity-60' : ''}
          />
        </div>
      </form>
    </AuthLayout>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
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
