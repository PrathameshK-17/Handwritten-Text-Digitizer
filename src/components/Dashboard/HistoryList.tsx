import React from 'react';

// Define the type for Document.
interface DocumentProps {
    _id: any;
    originalText: string;
    completedText?: string;
    createdAt: Date;
}

export default function HistoryList({ documents }: { documents: DocumentProps[] }) {
    if (documents.length === 0) {
        return (
            <div className="rounded-3xl border border-white/12 bg-white/3 py-16 text-center backdrop-blur-xl">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/12 bg-white/2 text-slate-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-100">No history yet</h3>
                <p className="mt-1 text-slate-400">Upload your first document to see it here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="ml-1 text-xl font-semibold text-slate-100">Recent Activity</h2>
            <div className="grid grid-cols-1 gap-5">
                {documents.map((doc) => (
                    <div key={doc._id.toString()} className="group rounded-2xl border border-white/12 bg-white/3 p-5 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-white/20">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/2 text-slate-300">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-100">Document processed</p>
                                    <p className="text-xs text-slate-400">
                                        {new Date(doc.createdAt).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })} • {new Date(doc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                            <span className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                                Completed
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-[#0f1628] p-4 md:grid-cols-2">
                            <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Original</p>
                                <p className="line-clamp-2 font-mono text-sm text-slate-300">{doc.originalText}</p>
                            </div>
                            <div className="md:border-l md:border-white/10 md:pl-4">
                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-300">Refined</p>
                                <p className="line-clamp-2 text-sm font-medium text-slate-100">{doc.completedText}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
