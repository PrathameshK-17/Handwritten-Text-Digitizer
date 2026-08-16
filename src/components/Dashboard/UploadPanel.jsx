'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function UploadPanel({
  files = [],
  previewUrls = [],
  processing,
  onSelectFile,
  onRemoveFile,
  onProcess,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const nextFiles = event.target.files ? Array.from(event.target.files) : [];
    if (nextFiles.length === 0) return;
    onSelectFile(nextFiles);
    // Reset input value so same file can be selected again if removed
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const nextFiles = event.dataTransfer.files ? Array.from(event.dataTransfer.files) : [];
    if (nextFiles.length === 0) return;
    onSelectFile(nextFiles);
  };

  const triggerFileDialog = () => {
    fileInputRef.current?.click();
  };

  const hasFiles = files.length > 0;

  return (
    <section className="landing-glass rounded-[22px] p-5 sm:p-6 lg:p-7 flex flex-col h-full">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-white sm:text-xl">Input Image</h2>
        {hasFiles ? (
          <span className="rounded-full border border-emerald-300/35 bg-emerald-500/12 px-3 py-1 text-xs text-emerald-200">
            {files.length} {files.length === 1 ? 'image' : 'images'} ready
          </span>
        ) : null}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {!hasFiles ? (
        <button
          type="button"
          onClick={triggerFileDialog}
          onDragEnter={() => setIsDragging(true)}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={[
            'flex-1 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 text-center transition duration-300 min-h-[320px]',
            isDragging
              ? 'border-violet-300/70 bg-violet-500/10 shadow-[0_0_0_1px_rgba(196,181,253,0.45),0_0_45px_rgba(99,102,241,0.24)]'
              : 'border-white/18 bg-white/2 hover:border-violet-300/55 hover:bg-white/4 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]',
          ].join(' ')}
        >
          <div className="mb-5 rounded-full border border-white/18 bg-white/4 p-4 text-blue-200">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 16V6" />
              <path d="M8 10l4-4 4 4" />
              <rect x="4" y="16" width="16" height="4" rx="1.4" />
            </svg>
          </div>

          <p className="max-w-md text-base font-medium text-slate-100 sm:text-lg">
            Drag & drop your handwritten images or click to upload
          </p>
          <p className="mt-2 text-sm text-slate-400">JPG, PNG supported • max 5 images • recommended under 5MB each</p>
        </button>
      ) : (
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="group relative aspect-square overflow-hidden rounded-2xl border border-white/12 bg-[#0f1628]">
                {previewUrls[index] ? (
                  <Image
                    src={previewUrls[index]}
                    alt={`Preview ${index}`}
                    fill
                    unoptimized
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[10px] text-slate-500">No Preview</div>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onRemoveFile(index)}
                    disabled={processing}
                    className="rounded-full bg-rose-500 p-2 text-white shadow-lg hover:bg-rose-600 transition disabled:opacity-50"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-[10px] text-white truncate backdrop-blur-sm">
                  {file.name}
                </div>
              </div>
            ))}
            
            {files.length < 5 && (
              <button
                type="button"
                onClick={triggerFileDialog}
                disabled={processing}
                className="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/18 bg-white/2 hover:border-violet-300/55 hover:bg-white/4 transition"
              >
                <div className="rounded-full bg-white/5 p-2 text-slate-300">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <span className="mt-2 text-xs font-medium text-slate-300">Add More</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => onRemoveFile()}
              disabled={processing}
              className="text-xs font-medium text-slate-400 hover:text-rose-400 transition"
            >
              Clear All
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={processing}
                onClick={onProcess}
                className="inline-flex items-center rounded-xl bg-linear-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(76,104,255,0.35)] transition hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(88,94,255,0.45)] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {processing ? 'Processing...' : 'Process All Images'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
