'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { useAudioStore } from '@/stores/audio-store';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Loader2,
  Check,
  Copy,
  RefreshCw,
  Minimize2,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  model?: string;
}

const QUICK_PROMPTS_BN = [
  'অষ্টমীর পুষ্পাঞ্জলির মন্ত্র',
  'সন্ধিপূজার ১০৮ প্রদীপ',
  'নবপত্রিকার নয়টি গাছ',
  'ভোগের খিচুড়ি রেসিপি',
  'মহালয়ার তাৎপর্য',
  'সিন্দূর খেলার নিয়ম',
];

const QUICK_PROMPTS_EN = [
  'Ashtami Pushpanjali mantras',
  'Sandhi Puja 108 lamps',
  'Nine Nabapatrika plants',
  'Bhoger Khichuri recipe',
  'Mahalaya significance',
  'Sindoor Khela traditions',
];

export const FloatingAIChat: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const currentTrack = useAudioStore((state) => state.currentTrack);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message on first open
  useEffect(() => {
    if (isOpen && !hasInitialized) {
      setMessages([
        {
          id: 'init-1',
          sender: 'ai',
          text:
            language === 'bn'
              ? 'নমস্কার! 🙏 আমি আগমনী পূজা সহায়িকা (Puja Sathi AI)। তিথি, পুষ্পাঞ্জলি মন্ত্র, সন্ধিপূজা, ভোগ বা যেকোনো শারদীয় প্রশ্ন করুন।'
              : 'Namaskar! 🙏 I am Puja Sathi AI. Ask me about Tithi timings, Pushpanjali mantras, Sandhi Puja, Bhog recipes, or any Durga Puja traditions.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setHasInitialized(true);
    }
  }, [isOpen, hasInitialized, language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Lock page scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleSendMessage = useCallback(
    async (queryText: string) => {
      if (!queryText.trim() || isLoading) return;

      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text: queryText.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInputQuery('');
      setIsLoading(true);

      // Build multi-turn context
      const formattedHistory = newMessages
        .filter((m) => m.id !== 'init-1')
        .map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
          content: m.text,
        }));

      try {
        const res = await fetch('/api/puja-guide', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: formattedHistory, language }),
        });

        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text:
            data.answer ||
            (language === 'bn'
              ? 'ক্ষমা করবেন, উত্তর প্রদানে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।'
              : 'Sorry, there was an issue generating a response. Please try again.'),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: data.model,
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: 'ai',
            text:
              language === 'bn'
                ? 'সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
                : 'Connection error. Please try again.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, language]
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text:
          language === 'bn'
            ? 'নতুন আলোচনা শুরু হলো! 🪔 আপনার প্রশ্ন জিজ্ঞাসা করুন।'
            : 'New conversation started! 🪔 Ask your question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const bottomClass = currentTrack ? 'bottom-24 sm:bottom-28' : 'bottom-6 sm:bottom-8';
  const quickPrompts = language === 'bn' ? QUICK_PROMPTS_BN : QUICK_PROMPTS_EN;

  return (
    <>
      {/* Backdrop Overlay (when chat is open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[98]"
          />
        )}
      </AnimatePresence>

      {/* Slide-in Chat Panel from Right */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] md:w-[460px] z-[99] flex flex-col bg-[#0E0907] border-l border-[#E7C878]/25 shadow-2xl overscroll-contain touch-auto"
          >
            {/* ─── Chat Header ─── */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#FFFDF8]/10 bg-[#120B09]/95 backdrop-blur-xl flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#A61B1B] to-[#C99A3D] flex items-center justify-center shadow-md flex-shrink-0">
                  <Bot className="w-5 h-5 text-[#FFFDF8]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#E7C878] font-serif leading-tight">
                    {language === 'bn' ? 'পূজা সহায়িকা' : 'Puja Sathi AI'}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                    <span className="text-[10px] text-[#4ADE80] font-semibold">
                      {language === 'bn' ? 'সক্রিয়' : 'Online'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="p-2 rounded-full text-[#FFF8EA]/50 hover:text-[#E7C878] hover:bg-[#FFFDF8]/8 transition-colors cursor-pointer"
                  title={language === 'bn' ? 'নতুন চ্যাট' : 'New Chat'}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-[#FFF8EA]/50 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/8 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* ─── Quick Prompt Chips (shown when few messages) ─── */}
            {messages.length <= 2 && (
              <div className="px-4 pt-3 pb-1 flex-shrink-0">
                <p className="text-[10px] font-bold text-[#E7C878]/70 uppercase tracking-wider mb-2 font-mono">
                  {language === 'bn' ? 'দ্রুত জিজ্ঞাসা' : 'Quick Ask'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      className="px-3 py-1.5 rounded-full bg-[#1A1210] border border-[#FFFDF8]/10 text-[11px] text-[#FFF8EA]/80 hover:text-[#FFF8EA] hover:border-[#E7C878]/40 hover:bg-[#241B18] transition-all cursor-pointer active:scale-95 font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Messages Area ─── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 scrollbar-thin overscroll-contain">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex flex-col',
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[88%] px-4 py-3 text-[13px] leading-relaxed shadow-xs relative group',
                      msg.sender === 'user'
                        ? 'bg-[#A61B1B] text-[#FFFDF8] rounded-2xl rounded-br-sm'
                        : 'bg-[#1A1210] border border-[#FFFDF8]/10 text-[#FFF8EA] rounded-2xl rounded-bl-sm'
                    )}
                  >
                    <div className="whitespace-pre-line font-sans">{msg.text}</div>

                    {/* Copy button on AI messages */}
                    {msg.sender === 'ai' && msg.id !== 'init-1' && (
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="absolute -bottom-1 right-2 p-1 rounded-full bg-[#120B09] border border-[#FFFDF8]/10 text-[#FFF8EA]/40 hover:text-[#E7C878] opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-xs"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center px-1 mt-1">
                    <span className="text-[9px] text-[#FFF8EA]/30">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-start">
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-[#1A1210] border border-[#FFFDF8]/10 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E7C878]" />
                    <span className="text-[11px] text-[#E7C878] font-mono">
                      {language === 'bn' ? 'উত্তর প্রস্তুত হচ্ছে...' : 'Generating...'}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ─── Input Bar ─── */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputQuery);
              }}
              className="px-3 py-3 border-t border-[#FFFDF8]/10 bg-[#120B09]/95 backdrop-blur-xl flex items-center gap-2 flex-shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'প্রশ্ন লিখুন...'
                    : 'Type your question...'
                }
                className="flex-1 bg-[#1A1210] border border-[#FFFDF8]/12 rounded-2xl px-4 py-3 text-[13px] text-[#FFF8EA] placeholder:text-[#FFF8EA]/35 focus:outline-none focus:border-[#E7C878]/50 transition-colors font-sans"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="p-3 rounded-2xl bg-[#A61B1B] text-[#FFFDF8] hover:bg-[#851515] disabled:opacity-30 transition-all cursor-pointer shadow-md active:scale-95 flex-shrink-0"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Trigger Button ─── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
              'fixed right-4 sm:right-7 z-40 transition-all duration-300',
              bottomClass
            )}
          >
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={language === 'bn' ? 'পূজা সহায়িকা AI' : 'Puja Sathi AI'}
              title={language === 'bn' ? 'পূজা সহায়িকা AI' : 'Puja Sathi AI'}
              className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#241310] via-[#1A0D0A] to-[#241310] border-2 border-[#E7C878]/70 text-[#FFF8EA] shadow-[0_6px_30px_rgba(201,154,61,0.45)] hover:shadow-[0_8px_35px_rgba(201,154,61,0.65)] hover:border-[#E7C878] hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-2xl cursor-pointer flex items-center justify-center"
            >
              {/* Aura Pulse */}
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#A61B1B]/40 via-[#E7C878]/40 to-[#A61B1B]/40 blur-md -z-10 group-hover:opacity-100 opacity-70 transition-opacity animate-pulse" />

              {/* Bot Icon Container */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#A61B1B] border border-[#E7C878]/50 flex items-center justify-center text-[#FFFDF8] shadow-md">
                <Bot className="w-5 h-5 sm:w-5 sm:h-5 text-[#FFFDF8] group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4ADE80] border-2 border-[#120B09] shadow-xs animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4ADE80] border-2 border-[#120B09] shadow-xs" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
