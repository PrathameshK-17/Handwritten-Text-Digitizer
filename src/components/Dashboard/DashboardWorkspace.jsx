'use client';

import { useEffect, useMemo, useState } from 'react';
import { processDocument } from '@/app/actions/processDoc';
import { downloadContent } from '@/lib/downloadUtils';
import UploadPanel from './UploadPanel';
import OutputPanel from './OutputPanel';

export default function DashboardWorkspace() {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('corrected');
  const [toast, setToast] = useState('');
  const [listening, setListening] = useState(false);

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    };
  }, [previewUrls]);

  useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(() => {
      setToast('');
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useMemo(() => {
    if (typeof window === 'undefined') return null;

    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };

    return null;
  }, []);

  const handleSelectFile = (nextFiles) => {
    const filesArray = Array.isArray(nextFiles) ? nextFiles : [nextFiles];
    
    if (files.length + filesArray.length > 5) {
      setToast('Maximum 5 images allowed');
      return;
    }
    
    const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
    
    setFiles(prev => [...prev, ...filesArray]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    setError('');
    setResult(null);
    setActiveTab('corrected');
  };

  const handleRemoveFile = (index) => {
    if (index === undefined) {
      // Remove all
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setFiles([]);
      setPreviewUrls([]);
    } else {
      // Remove specific
      URL.revokeObjectURL(previewUrls[index]);
      setFiles(prev => prev.filter((_, i) => i !== index));
      setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    }
    
    setError('');
    setResult(null);
    setListening(false);
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });

      const response = await processDocument(formData);

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to process document');
      }

      setResult(response.data);
      setActiveTab('corrected');
    } catch (processError) {
      setError(processError.message || 'Failed to process document');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;

    const textToCopy = activeTab === 'raw' ? result.originalText : result.completedText;

    try {
      await navigator.clipboard.writeText(textToCopy || '');
      setToast('Copied to clipboard');
    } catch (clipboardError) {
      setToast('Copy failed');
      console.error('Copy error:', clipboardError);
    }
  };

  const handleDownload = async (format) => {
    if (!result || loading) return;

    try {
      await downloadContent(format, result.completedText, 'dashboard-output-content', 'ai-corrected-text');
      setToast(`Downloaded ${format.toUpperCase()}`);
    } catch (downloadError) {
      console.error('Download error:', downloadError);
      setToast('Download failed');
    }
  };

  const handleListen = () => {
    if (!result?.completedText || typeof window === 'undefined') return;

    if (listening) {
      window.speechSynthesis.cancel();
      setListening(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(result.completedText);
    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
      voices.find((voice) => voice.lang === 'mr-IN') ||
      voices.find((voice) => voice.lang === 'hi-IN') ||
      voices.find((voice) => voice.name.includes('India') || voice.name.includes('Marathi') || voice.name.includes('Hindi'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = preferredVoice.lang;
    } else {
      utterance.lang = 'mr-IN';
    }

    utterance.onend = () => setListening(false);
    utterance.onerror = () => setListening(false);

    setListening(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-7">
        <UploadPanel
          files={files}
          previewUrls={previewUrls}
          processing={loading}
          onSelectFile={handleSelectFile}
          onRemoveFile={handleRemoveFile}
          onProcess={handleProcess}
        />

        <OutputPanel
          result={result}
          loading={loading}
          hasFile={files.length > 0}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onListen={handleListen}
          listening={listening}
          error={error}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <p>Tip: higher-contrast uploads improve extraction quality.</p>
        <p>Workspace auto-saves processed results to your history.</p>
      </div>

      {toast ? (
        <div className="fixed bottom-6 right-6 z-70 rounded-xl border border-white/15 bg-[#11192d]/90 px-4 py-2 text-sm text-slate-100 shadow-[0_16px_40px_rgba(2,6,23,0.45)] backdrop-blur-xl auth-fade-in">
          {toast}
        </div>
      ) : null}
    </>
  );
}
