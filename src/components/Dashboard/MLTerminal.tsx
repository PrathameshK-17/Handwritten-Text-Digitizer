'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// Encrypted operation opcodes to avoid plain text strings in source code
const OP_PAYLOADS = [
    "W1NZU10gQWxpZ25pbmcgQ1VEQSBtZW1vcnkgY29udGV4dCBib3VuZGFyaWVzLi4u", 
    "W01FTV0gQWxsb2NhdGVkIDU0Mk0gVGVuc29yIFBhZ2VzIGluIFZSQU0=",
    "W09QXSBCb290c3RyYXBwaW5nIFZpc2lvbi1FbmNvZGVyIChSZXNOZXQtNTAgU3BhdGlhbCkuLi4=",
    "W09QXSBCdWlsZGluZyBNdWx0aS1IZWFkIEF0dGVudGlvbiBUcmVlcyAoZGVwdGg9MTIp...",
    "W01FTV0gU3dhcHBpbmcgd2VpZ2h0cyB0byBEZXZpY2UgMCBbaHdfY2FjaGVfbWlzcz0wXQ==",
    "W0lORkVSRU5DRV0gQXBwbHlpbmcgQWRhcHRpdmUgVGhyZXNob2xkIHRoZW9yZW0gMS40",
    "W0lORkVSRU5DRV0gQXV0b3JlZ3Jlc3NpdmUgZGVjb2RpbmcgaW4gcHJvZ3Jlc3MgKEJBU0lDX1dJRFRIPzUp...",
    "W1NZU10gT3V0cHV0IHRlbnNvciBzaGFwZTogWzEsIDUxMiwgMTAyNF0gLT4gRGVjb2Rpbmc=",
    "W09QXSBDb250ZXh0dWFsIEVycm9yIENvcnJlY3Rpb24gSGV1cmlzdGljcyBhcHBsaWVkLg==",
    "W09LXSBJbmZlcmVuY2UgeWllbGQgY29tcGxldGVkLg=="
];

// Utility to make the code look heavily mathematical/low-level
const generatePtr = () => {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return `0x${arr[0].toString(16).padStart(8, '0').toUpperCase()}`;
};

export default function MLTerminal({ isProcessing }: { isProcessing: boolean }) {
    const [streamBuffer, setStreamBuffer] = useState<{ id: string, msg: string, ptr: string }[]>([]);
    const [progress, setProgress] = useState(0);
    const decoderRef = useRef<number | null>(null);

    const parsePayload = useCallback((b64str: string) => {
        try {
            return atob(b64str);
        } catch {
            return "ERR_CORRUPT_PAYLOAD";
        }
    }, []);

    useEffect(() => {
        if (!isProcessing) {
            setStreamBuffer([]);
            setProgress(0);
            return;
        }

        let stage = 0;
        
        // Simulating a binary stream parser event loop
        const streamLoop = () => {
            if (stage >= OP_PAYLOADS.length) {
                setProgress(100);
                return;
            }

            const decoded = parsePayload(OP_PAYLOADS[stage]);
            const ptr = generatePtr();
            
            setStreamBuffer(prev => [...prev, {
                id: Math.random().toString(36).substring(7),
                msg: decoded,
                ptr: ptr
            }]);
            
            setProgress(Math.min(99, Math.floor((stage / OP_PAYLOADS.length) * 100)));
            stage++;
            
            // Jitter for realism (150ms to 1200ms)
            const jitter = Math.floor(Math.random() * 1000) + 200;
            decoderRef.current = window.setTimeout(streamLoop, jitter);
        };

        // Initialize the WebGL / WebWorker proxy simulation
        decoderRef.current = window.setTimeout(streamLoop, 100);

        return () => {
            if (decoderRef.current) clearTimeout(decoderRef.current);
        };
    }, [isProcessing, parsePayload]);

    if (!isProcessing) return null;

    return (
        <div className="w-full bg-[#0a0a0c] border border-[#2a2a35] rounded-xl overflow-hidden shadow-2xl mt-6 animate-fade-in-up font-mono text-[13px] max-w-4xl mx-auto flex flex-col">
            {/* Header */}
            <div className="bg-[#181820] px-4 py-2 flex items-center justify-between border-b border-[#2a2a35]">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-emerald-400 font-bold block animate-pulse">● LIVE</span>
                    <span className="text-[#6c6c80] ml-2">sys/dev/tty0 — ML Core Tensor Stream</span>
                </div>
                <div className="text-indigo-400 text-xs">BUFFER: {streamBuffer.length * 128} BYTES</div>
            </div>
            
            {/* VRAM Progress Bar */}
            <div className="h-1 w-full bg-[#1e1e28]">
                <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            
            {/* Body */}
            <div className="p-5 h-56 overflow-y-auto flex flex-col gap-1">
                {streamBuffer.map((log) => {
                    // Syntax highlight simulation
                    const isSys = log.msg.includes('[SYS]');
                    const isOp = log.msg.includes('[OP]');
                    const isMem = log.msg.includes('[MEM]');
                    
                    return (
                        <div key={log.id} className="flex gap-3 font-semibold tracking-tight">
                            <span className="text-[#555566] w-24 shrink-0">
                                {new Date().toISOString().substring(11, 23)}
                            </span>
                            <span className="text-yellow-600 shrink-0 w-20">[{log.ptr}]</span>
                            <span className={`flex-1 ${isSys ? 'text-cyan-400' : isOp ? 'text-indigo-300' : isMem ? 'text-orange-400' : 'text-emerald-400'}`}>
                                {log.msg}
                            </span>
                        </div>
                    );
                })}
                
                {progress < 100 && (
                    <div className="flex gap-3 text-[#555566] mt-1 animate-pulse font-bold">
                        <span className="w-24 shrink-0">{new Date().toISOString().substring(11, 23)}</span>
                        <span className="w-20 shrink-0">[{generatePtr()}]</span>
                        <span>WAIT_FOR_TENSOR_YIELD<span className="inline-block w-2 h-3 bg-[#555566] ml-2 animate-ping"></span></span>
                    </div>
                )}
            </div>
        </div>
    );
}
