'use client';

import { useState, useRef } from 'react';
import { processDocument } from '@/app/actions/processDoc';
import { downloadContent, DownloadFormat } from '@/lib/downloadUtils';
import MLTerminal from './MLTerminal';

export default function UploadSection() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ originalText: string; completedText: string } | null>(null);
    const [error, setError] = useState('');
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [playing, setPlaying] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Ensure voices are loaded (required for some browsers)
    useState(() => {
        if (typeof window !== 'undefined') {
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    });

    const handlePlayAudio = () => {
        if (!result?.completedText) return;

        if (playing) {
            window.speechSynthesis.cancel();
            setPlaying(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(result.completedText);

        // Voice selection logic
        const voices = window.speechSynthesis.getVoices();

        // Priority:
        // 1. Exact Marathi voice (mr-IN)
        // 2. Hindi voice (hi-IN) - often works reasonably well for Marathi script
        // 3. Google/Microsoft voices with 'India' or 'Indic' in name
        const preferredVoice =
            voices.find(v => v.lang === 'mr-IN') ||
            voices.find(v => v.lang === 'hi-IN') ||
            voices.find(v => v.name.includes('India') || v.name.includes('Marathi') || v.name.includes('Hindi'));

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            utterance.lang = preferredVoice.lang;
            console.log('Using voice:', preferredVoice.name, preferredVoice.lang);
        } else {
            // Fallback to explicit lang tag if no voice object found
            utterance.lang = 'mr-IN';
        }

        utterance.onend = () => setPlaying(false);
        utterance.onerror = () => setPlaying(false);

        setPlaying(true);
        window.speechSynthesis.speak(utterance);
    };

    const handleDownload = async (format: DownloadFormat) => {
        if (!result) return;
        setDownloading(true);
        setShowDownloadMenu(false);
        try {
            await downloadContent(format, result.completedText, 'ai-corrected-content', 'ai-corrected-text');
        } catch (err) {
            console.error('Download error:', err);
        }
        setDownloading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
            setResult(null);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setError('');
            setResult(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('image', file);

        const res = await processDocument(formData);

        if (res.success && res.data) {
            setResult(res.data);
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
            setError(res.error || 'Failed to process document');
        }
        setLoading(false);
    };

    return (
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </span>
                New Extraction
            </h2>

            <form onSubmit={handleSubmit} className="mb-2">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="w-full border-2 border-dashed border-indigo-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-indigo-50/50 hover:bg-indigo-50 transition-all cursor-pointer group mb-6"
                >
                    <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-110 transition-transform">
                        {file ? (
                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        )}
                    </div>

                    <p className="text-lg font-medium text-slate-700">
                        {file ? file.name : 'Click to Upload or Drag & Drop'}
                    </p>
                    <p className="text-sm text-slate-400 mt-2">Supports JPG, PNG (Max 5MB)</p>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </button>

                {error && <p className="mb-4 text-red-500 font-medium text-center bg-red-50 p-2 rounded-lg">{error}</p>}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!file || loading}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/30 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
                    >
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Processing Document...</span>
                            </div>
                        ) : (
                            'Start Processing'
                        )}
                    </button>
                </div>
            </form>

            <MLTerminal isProcessing={loading} />

            {result && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 border-t border-slate-100 pt-10 animate-fade-in-up">
                    <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl overflow-hidden flex flex-col h-full">
                        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex justify-between items-center">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Original Text
                            </h3>
                            <span className="text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">RAW OCR</span>
                        </div>
                        <div className="p-6 bg-slate-50/50 flex-grow font-mono text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {result.originalText}
                        </div>
                    </div>

                    <div id="ai-corrected-content" className="bg-white/70 backdrop-blur-xl border-2 border-indigo-100 shadow-xl shadow-indigo-500/10 rounded-2xl overflow-hidden flex flex-col h-full relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>
                        <div className="bg-gradient-to-r from-indigo-50 to-white border-b border-indigo-100 px-6 py-4 flex justify-between items-center">
                            <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                ML Predicted
                            </h3>
                            <div className="flex items-center gap-2">
                                {/* Play Audio Button */}
                                <button
                                    onClick={handlePlayAudio}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${playing
                                        ? 'bg-red-100 text-red-600 hover:bg-red-200 border border-red-200'
                                        : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 border border-indigo-200'
                                        }`}
                                >
                                    {playing ? (
                                        <>
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                            </span>
                                            Stop
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                            </svg>
                                            Listen
                                        </>
                                    )}
                                </button>

                                {/* Download Button with Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                                        disabled={downloading}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded shadow-sm transition-all disabled:opacity-50"
                                    >
                                        {downloading ? (
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        )}
                                        Download
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {showDownloadMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in-up">
                                            <button
                                                onClick={() => handleDownload('pdf')}
                                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-3 transition-colors"
                                            >
                                                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-xs font-bold">PDF</span>
                                                PDF Document
                                            </button>
                                            <button
                                                onClick={() => handleDownload('docx')}
                                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-3 transition-colors"
                                            >
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold">DOC</span>
                                                Word Document
                                            </button>

                                            <button
                                                onClick={() => handleDownload('txt')}
                                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-3 transition-colors"
                                            >
                                                <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-xs font-bold">TXT</span>
                                                Plain Text
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-white flex-grow text-slate-800 leading-relaxed whitespace-pre-wrap text-base font-medium">
                            {result.completedText}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
