import { cookies } from 'next/headers';
import Navbar from '@/components/Dashboard/Navbar';
import DashboardWorkspace from '@/components/Dashboard/DashboardWorkspace';
import HistoryList from '@/components/Dashboard/HistoryList';
import connectToDatabase from '@/lib/db';
import DocumentModel from '@/models/Document';
import { verifyToken } from '@/lib/auth-edge';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId || typeof payload.userId !== 'string') {
        redirect('/login');
    }

    // Redirect admin to admin dashboard
    if (payload.role === 'admin' || payload.userId === 'admin') {
        redirect('/admin');
    }

    await connectToDatabase();
    // Lean query for performance
    const documents = await DocumentModel.find({ userId: payload.userId })
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div className="min-h-screen bg-[#0b0f19] text-[#e5e7eb]">
            <div className="landing-noise pointer-events-none fixed inset-0" />

            <Navbar userEmail={typeof payload.email === 'string' ? payload.email : ''} />

            <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-white sm:text-3xl">AI Handwriting Workspace</h1>
                        <p className="mt-1 text-sm text-slate-300">
                            Upload a handwritten image, extract raw OCR, and refine the output with AI.
                        </p>
                    </div>

                    <span className="rounded-full border border-white/15 bg-white/2 px-3 py-1.5 text-xs text-slate-300">
                        Secure session active
                    </span>
                </div>

                <DashboardWorkspace />

                <section className="mt-12">
                    {/* @ts-ignore */}
                    <HistoryList documents={documents} />
                </section>
            </main>
        </div>
    );
}
