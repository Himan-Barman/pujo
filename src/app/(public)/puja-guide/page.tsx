'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Send, Sparkles, HelpCircle, Loader2, Bot, User, RefreshCw, Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  model?: string;
}

const SAMPLE_PROMPTS = [
  {
    bn: 'অষ্টমীর পুষ্পাঞ্জলির সঠিক নিয়ম ও মন্ত্র কী?',
    en: 'What are the rules and mantras for Ashtami Pushpanjali?',
  },
  {
    bn: 'সন্ধিপূজার ৪৮ মিনিটের মাহাত্ম্য ও ১০৮ পদ্মের রহস্য কী?',
    en: 'What is the significance of the 48-minute Sandhi Puja window?',
  },
  {
    bn: 'নবপত্রিকা বা কলাবউ স্নানের নয়টি উদ্ভিদের তাৎপর্য কী?',
    en: 'What is the ecological significance of the nine Nabapatrika plants?',
  },
  {
    bn: 'পূজার ভোগের খিচুড়ি রান্নার সাত্ত্বিক নিয়মাবলী কী?',
    en: 'What are the Sattvic rules for preparing traditional Bhoger Khichuri?',
  },
];

export default function PujaGuidePage() {
  const language = useUIStore((state) => state.language);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text:
        language === 'bn'
          ? 'নমস্কার! আমি আগমনী পূজা সহায়িকা (Puja Sathi AI)। শারদোৎসবের তিথির সময়সূচি, বিশুদ্ধ পুষ্পাঞ্জলি মন্ত্র, সন্ধিপূজা, নবপত্রিকা কিংবা সাত্ত্বিক মহাপ্রসাদ নিয়ে যেকোনো প্রশ্ন জিজ্ঞাসা করুন।'
          : 'Namaskar! I am your Agomoni Cultural Guide (Puja Sathi AI). Ask me about Tithi timings, Pushpanjali rituals, Sandhi Puja, Nabapatrika, or authentic Sattvic Bhog recipes.',
      timestamp: 'এখন',
      model: 'Llama 4 Maverick / Llama 3.3 / DeepSeek',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText: string) => {
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

    // Prepare context history for multi-turn conversation
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
        body: JSON.stringify({
          messages: formattedHistory,
          language,
        }),
      });

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text:
          data.answer ||
          (language === 'bn'
            ? 'দেবী দুর্গার আরাধনায় ভক্তি ও পবিত্রতাই মুখ্য।'
            : 'In Devi worship, sincere devotion and pure intent are supreme.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text:
            language === 'bn'
              ? 'পূজা সহায়ক প্রতিক্রিয়া প্রদানে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
              : 'Unable to connect to AI Guide. Please try again.',
          timestamp: 'এখন',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text:
          language === 'bn'
            ? 'নমস্কার! নতুন আলোচনা শুরু করুন। তিথি, মন্ত্র বা পূজা আচার নিয়ে যেকোনো জিজ্ঞাসা করুন।'
            : 'Namaskar! Start a new conversation. Ask me about rituals, mantras, or festive history.',
        timestamp: 'এখন',
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <SectionHeading
        tagBn="বুদ্ধিদীপ্ত বৈদিক সহায়িকা"
        tagEn="Vedic & Cultural Intelligence"
        titleBn="আগমনী সহায় (Puja Sathi AI)"
        titleEn="Agomoni Puja Sathi AI Guide"
        subtitleBn="প্রামাণ্য শাস্ত্রীয় তথ্য ও পূজা আচার নিয়ে তাৎক্ষণিক বুদ্ধিদীপ্ত সহায়তা।"
        subtitleEn="Conversational AI guide grounded in authentic scriptural knowledge and traditions."
      />

      {/* Suggested Starter Prompts */}
      <ScrollReveal delay={0.05} distance={35} className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-[#E7C878] uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-[#E7C878]" />
            <span>{language === 'bn' ? 'প্রস্তাবিত জিজ্ঞাসা সমূহ' : 'Suggested Inquiries'}</span>
          </p>

          <button
            type="button"
            onClick={handleResetChat}
            className="text-[11px] text-[#FFF8EA]/60 hover:text-[#E7C878] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{language === 'bn' ? 'নতুন চ্যাট' : 'New Chat'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(language === 'bn' ? prompt.bn : prompt.en)}
              className="p-3.5 rounded-[20px] bg-[#1A1210]/70 hover:bg-[#1A1210] border border-[#FFFDF8]/12 text-left text-xs text-[#FFF8EA]/85 hover:text-[#FFF8EA] transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 font-medium active:scale-[0.98] shadow-xs"
            >
              <span>{language === 'bn' ? prompt.bn : prompt.en}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E7C878] flex-shrink-0" />
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Chat Container */}
      <ScrollReveal delay={0.1} distance={45}>
        <div className="agomoni-card overflow-hidden shadow-2xl flex flex-col h-[560px] border border-[#E7C878]/35 bg-[#1A1210]/95 backdrop-blur-2xl">
          {/* Chat Header */}
          <div className="p-4 bg-[#120B09]/90 border-b border-[#FFFDF8]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#A61B1B] to-[#C99A3D] flex items-center justify-center text-white shadow-xs">
                <Bot className="w-5 h-5 text-[#FFF8EA]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#E7C878] font-serif">
                  আগমনী সহায় (Puja Sathi)
                </h4>
                <p className="text-[10px] text-[#4ADE80] flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span>
                    {language === 'bn'
                      ? 'সক্রিয় • সাংস্কৃতিক ও বৈদিক জ্ঞানভাণ্ডার'
                      : 'Active • Cultural & Vedic Knowledge Base'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2" />
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex flex-col', msg.sender === 'user' ? 'items-end' : 'items-start')}
              >
                <div
                  className={cn(
                    'max-w-[88%] sm:max-w-[80%] p-4 sm:p-5 rounded-[24px] text-xs sm:text-sm leading-relaxed shadow-xs relative group',
                    msg.sender === 'user'
                      ? 'bg-[#A61B1B] text-[#FFFDF8] rounded-tr-xs'
                      : 'bg-[#241B18]/80 backdrop-blur-md border border-[#FFFDF8]/12 text-[#FFF8EA] rounded-tl-xs'
                  )}
                >
                  <div className="whitespace-pre-line font-sans leading-relaxed">
                    {msg.text}
                  </div>

                  {/* Copy Button on Hover */}
                  {msg.sender === 'ai' && (
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-[#120B09]/80 text-[#FFF8EA]/50 hover:text-[#E7C878] opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title="Copy text"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Timestamp */}
                <div className="flex items-center px-2 mt-1">
                  <span className="text-[9px] text-[#FFF8EA]/40">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#E7C878] p-3 bg-[#120B09]/80 rounded-full max-w-fit px-5 border border-[#E7C878]/30 shadow-xs">
                <Loader2 className="w-4 h-4 animate-spin text-[#E7C878]" />
                <span className="font-mono text-xs">
                  {language === 'bn'
                    ? 'শাস্ত্রীয় জ্ঞানভাণ্ডার থেকে উত্তর প্রস্তুত হচ্ছে...'
                    : 'Consulting Vedic intelligence engine...'}
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputQuery);
            }}
            className="p-3 bg-[#120B09]/95 border-t border-[#FFFDF8]/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'পূজা বিধি, সময় বা ঐতিহ্য নিয়ে যেকোনো প্রশ্ন লিখুন...'
                  : 'Ask anything about rituals, mantras, timings...'
              }
              className="apple-input flex-1 py-3"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-3 rounded-[18px] bg-[#A61B1B] text-[#FFFDF8] hover:bg-[#851515] disabled:opacity-40 transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center flex-shrink-0"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </ScrollReveal>
    </div>
  );
}
