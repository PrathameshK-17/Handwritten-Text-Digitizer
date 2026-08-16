'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    email: string;
    role: string;
    isBlocked: boolean;
    lastActive: string;
    totalTimeSpent: number;
    documentCount: number;
    createdAt: string;
}

interface Document {
    _id: string;
    originalText: string;
    completedText: string;
    imageUrls?: string[];
    createdAt: string;
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userDocuments, setUserDocuments] = useState<Document[]>([]);
    const [loadingDocuments, setLoadingDocuments] = useState(false);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users);
            } else if (res.status === 401 || res.status === 403) {
                router.push('/login');
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleBlockUser = async (userId: string, currentStatus: boolean) => {
        if (!confirm(`Are you sure you want to ${currentStatus ? 'unblock' : 'block'} this user?`)) return;

        try {
            const res = await fetch('/api/admin/users/block', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, isBlocked: !currentStatus }),
            });

            if (res.ok) {
                fetchUsers(); // Refresh list
            } else {
                alert('Failed to update user status');
            }
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    const formatTime = (seconds: number) => {
        // Mock implementation since we don't have real tracking yet
        return '0h 0m';
    };

    const isOnline = (dateString: string) => {
        const lastActive = new Date(dateString).getTime();
        const now = new Date().getTime();
        return (now - lastActive) < 5 * 60 * 1000; // 5 minutes
    };

    const handleViewUser = async (user: User) => {
        setSelectedUser(user);
        setLoadingDocuments(true);
        setUserDocuments([]);
        try {
            const res = await fetch(`/api/admin/users/${user._id}/documents`);
            if (res.ok) {
                const data = await res.json();
                setUserDocuments(data.documents);
            } else {
                console.error('Failed to fetch user documents');
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoadingDocuments(false);
        }
    };

    const closeModal = () => {
        setSelectedUser(null);
        setUserDocuments([]);
        if (playingId) {
            window.speechSynthesis.cancel();
            setPlayingId(null);
        }
    };

    const handlePlayAudio = (docId: string, text: string) => {
        if (playingId === docId) {
            window.speechSynthesis.cancel();
            setPlayingId(null);
            return;
        }

        window.speechSynthesis.cancel(); // Stop any current speech
        const utterance = new SpeechSynthesisUtterance(text);

        // Simple voice selection (prefer Hindi/Marathi/India, fallback to default)
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
            voices.find(v => v.lang === 'mr-IN') ||
            voices.find(v => v.lang === 'hi-IN') ||
            voices.find(v => v.name.includes('India') || v.name.includes('Marathi') || v.name.includes('Hindi'));

        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.lang = preferredVoice?.lang || 'mr-IN';

        utterance.onend = () => setPlayingId(null);
        utterance.onerror = () => setPlayingId(null);

        setPlayingId(docId);
        window.speechSynthesis.speak(utterance);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 relative">
            <Navbar />

            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 ${selectedUser ? 'filter blur-sm pointer-events-none' : ''}`}>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm font-mono text-sm border border-slate-200">
                        Total Users: <span className="font-bold text-indigo-600">{users.length}</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Activity</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                                        {user.email.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-slate-900">{user.email}</div>
                                                    <div className="text-xs text-slate-500">{user.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.isBlocked ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                    Blocked
                                                </span>
                                            ) : isOnline(user.lastActive) ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 animate-pulse">
                                                    Online
                                                </span>
                                            ) : (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                                                    Offline
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">Docs: {user.documentCount}</div>
                                            <div className="text-xs text-slate-500">Last: {new Date(user.lastActive).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => handleViewUser(user)}
                                                className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => toggleBlockUser(user._id, user.isBlocked)}
                                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${user.isBlocked
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }`}
                                            >
                                                {user.isBlocked ? 'Unblock' : 'Block'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* User Details Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ pointerEvents: 'auto' }}>
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">User Details</h3>
                                <p className="text-sm text-slate-500">{selectedUser.email}</p>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-grow bg-slate-50/50">
                            {loadingDocuments ? (
                                <div className="flex justify-center items-center py-20">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                </div>
                            ) : userDocuments.length === 0 ? (
                                <div className="text-center py-20 text-slate-400">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p>No documents found for this user.</p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {userDocuments.map((doc, index) => (
                                        <div key={doc._id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                            <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                                                <span className="text-xs font-mono text-slate-500">Document #{index + 1} • {new Date(doc.createdAt).toLocaleString()}</span>
                                                <button
                                                    onClick={() => handlePlayAudio(doc._id, doc.completedText)}
                                                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${playingId === doc._id
                                                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                        : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                                        }`}
                                                >
                                                    {playingId === doc._id ? (
                                                        <>
                                                            <span className="animate-pulse">●</span> Stop
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                            </svg>
                                                            Listen
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                                                <div className="p-4">
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Original Text</h4>
                                                    <p className="text-sm text-slate-600 whitespace-pre-wrap font-mono leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                        {doc.originalText}
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-indigo-50/10">
                                                    <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">Extracted Text</h4>
                                                    <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                                                        {doc.completedText}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
