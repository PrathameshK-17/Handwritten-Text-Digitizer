'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 w-full z-50 px-4 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="rounded-2xl px-6 py-3 flex justify-between items-center transition-all bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            P
                        </div>
                        <Link href="/" className="text-xl font-bold text-slate-900 tracking-tight">
                            Pen2text<span className="text-indigo-600">-using-Deep-Learning</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        {!pathname.startsWith('/dashboard') && !pathname.startsWith('/admin') ? (
                            <>
                                <Link
                                    href="/login"
                                    className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors hidden sm:block"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        await fetch('/api/auth/logout', { method: 'POST' });
                                        window.location.href = '/login';
                                    } catch (error) {
                                        console.error('Logout failed', error);
                                        window.location.href = '/login';
                                    }
                                }}
                                className="text-slate-500 hover:text-red-600 font-medium text-sm transition-colors"
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
