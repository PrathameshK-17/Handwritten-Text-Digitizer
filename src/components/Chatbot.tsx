'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
    id: number;
    text: string;
    isBot: boolean;
}

// Knowledge base about the project
const knowledgeBase = [
    {
        keywords: ['what', 'project', 'about', 'does', 'do', 'purpose', 'this'],
        answer: "This is a Pen2text project. It uses advanced OCR (Optical Character Recognition) to extract text from images of old, damaged, or incomplete documents, and then uses Machine Learning to intelligently complete and correct the extracted text."
    },
    {
        keywords: ['ocr', 'extract', 'text', 'recognition', 'optical'],
        answer: "OCR (Optical Character Recognition) is used to extract raw text from uploaded images. We use Tesseract.js, an industrial-grade OCR engine that can recognize text even from low-quality or damaged images of historic documents."
    },
    {
        keywords: ['ml', 'machine', 'learning', 'ai', 'correct', 'correction', 'complete', 'fix', 'restore'],
        answer: "After OCR extracts the raw text, our ML (Machine Learning) model analyzes the context and intelligently fills in missing words, corrects spelling errors, and reconstructs damaged portions of the text using advanced language understanding."
    },
    {
        keywords: ['format', 'file', 'support', 'upload', 'image', 'type'],
        answer: "We currently support image files including JPG and PNG formats. The maximum file size is 5MB. Simply upload an image of your historic document and we'll process it automatically."
    },
    {
        keywords: ['how', 'use', 'start', 'begin', 'work', 'step'],
        answer: "To use the app:\n1. Sign up or log in to your account\n2. Navigate to the Dashboard\n3. Upload an image of your historic document\n4. Click 'Start Processing'\n5. View the original OCR text and the ML-corrected version\n6. Download the corrected text in your preferred format (PDF, DOCX, PNG, or TXT)"
    },
    {
        keywords: ['download', 'export', 'save', 'pdf', 'word', 'docx'],
        answer: "You can download the corrected text in multiple formats:\n• PDF Document\n• Word Document (DOCX)\n• Image (PNG)\n• Plain Text (TXT)\n\nJust click the Download button next to the corrected text and choose your preferred format."
    },
    {
        keywords: ['historic', 'old', 'document', 'ancient', 'damaged'],
        answer: "This project is specifically designed to restore historic and damaged documents. Whether you have old manuscripts, faded letters, or partially destroyed documents, our OCR + ML pipeline can extract and reconstruct the text to the best possible accuracy."
    },
    {
        keywords: ['hello', 'hi', 'hey', 'greetings'],
        answer: "Hello! 👋 I'm here to help you understand the Pen2text project. Feel free to ask me about how the OCR works, how ML corrects the text, supported file formats, or how to use the app!"
    },
    {
        keywords: ['thank', 'thanks', 'bye', 'goodbye'],
        answer: "You're welcome! If you have any more questions, feel free to ask. Happy document restoration! 📜✨"
    }
];

const defaultResponse = "I'm not sure about that. Try asking about:\n• What this project does\n• How OCR works\n• How ML correction works\n• Supported file formats\n• How to use the app\n• Download options";

function findAnswer(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    let bestMatch = { score: 0, answer: defaultResponse };

    for (const item of knowledgeBase) {
        const matchCount = item.keywords.filter(keyword =>
            lowerMessage.includes(keyword)
        ).length;

        if (matchCount > bestMatch.score) {
            bestMatch = { score: matchCount, answer: item.answer };
        }
    }

    return bestMatch.answer;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hi! 👋 I'm your project assistant. Ask me anything about the Pen2text project!",
            isBot: true
        }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            isBot: false
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate typing delay
        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: findAnswer(input),
                isBot: true
            };
            setMessages(prev => [...prev, botResponse]);
        }, 500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${isOpen
                        ? 'bg-slate-700 hover:bg-slate-800 rotate-0'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 animate-pulse hover:animate-none'
                    }`}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </button>

            {/* Chat Popup */}
            <div
                className={`fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 transition-all duration-300 origin-bottom-right ${isOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Project Assistant</h3>
                            <p className="text-white/70 text-sm">Ask me anything!</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 bg-slate-50 space-y-3">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                        >
                            <div
                                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${message.isBot
                                        ? 'bg-white text-slate-700 border border-slate-200 rounded-bl-md shadow-sm'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md shadow-md'
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-white border-t border-slate-200">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your question..."
                            className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
