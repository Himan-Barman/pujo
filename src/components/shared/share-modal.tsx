'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Share2,
  Send,
  MessageCircle,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useShare } from '@/hooks/use-share';
import { useUIStore } from '@/stores/ui-store';
import { ShareCardPreview } from '@/components/shared/share-card-preview';

export const GlobalShareModal: React.FC = () => {
  const {
    isOpen,
    payload,
    closeShare,
    shareToPlatform,
    copyToClipboard,
    copyFormattedLore,
    triggerNativeShare,
  } = useShare();

  const language = useUIStore((state) => state.language);
  const isBn = language === 'bn';

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !!navigator.share) {
      setCanNativeShare(true);
    }
  }, []);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeShare();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeShare]);

  if (!isOpen || !payload) return null;

  const handleCopyLink = async () => {
    const success = await copyToClipboard();
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const handleCopyFormattedText = async () => {
    const success = await copyFormattedLore();
    if (success) {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2400);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-x-hidden">
        {/* Backdrop overlay with Apple-grade fluid blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={closeShare}
          className="fixed inset-0 bg-[#120B09]/85 backdrop-blur-2xl"
          aria-hidden="true"
        />

        {/* Modal / Bottom Sheet Container */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 340,
          }}
          className="relative z-10 w-full sm:max-w-xl max-h-[92vh] flex flex-col rounded-t-[32px] sm:rounded-[32px] bg-[#150D0B] border-t-2 sm:border-2 border-[#E7C878]/35 p-5 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.92)] overflow-y-auto no-scrollbar"
        >
          {/* Mobile Drag/Grab Indicator Handle */}
          <div className="w-12 h-1.5 rounded-full bg-[#FFFDF8]/20 mx-auto mb-3.5 sm:hidden" />

          {/* 1. Modal Top Bar */}
          <div className="flex items-center justify-between gap-3 border-b border-[#FFFDF8]/10 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#A61B1B] border border-[#E7C878]/40 flex items-center justify-center text-[#FFFDF8] shadow-xs">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black font-serif text-[#FFF8EA]">
                  {isBn ? 'শারদোৎসবের আনন্দ শেয়ার করুন' : 'Share Agomoni Experience'}
                </h2>
                <p className="text-[11px] sm:text-xs text-[#FFF8EA]/65 font-sans">
                  {isBn
                    ? 'প্রিয়জনদের সাথে দুর্গাপূজার ঐতিহ্য ছড়িয়ে দিন'
                    : 'Spread the divine joy & heritage with loved ones'}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeShare}
              aria-label="Close Share Modal"
              className="w-8 h-8 rounded-full bg-[#1A1210] border border-[#FFFDF8]/15 text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:border-[#E7C878]/40 flex items-center justify-center cursor-pointer transition-colors active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Live Social Card Preview */}
          <div className="space-y-1.5 mb-5">
            <div className="flex items-center justify-between text-[11px] uppercase font-bold text-[#E7C878] tracking-wider px-1">
              <span>{isBn ? 'শেয়ার কার্ড প্রিভিউ' : 'Live Share Card Preview'}</span>
              <span className="flex items-center gap-1 text-[10px] text-[#FFF8EA]/60 font-mono">
                <Sparkles className="w-3 h-3 text-[#E7C878]" />
                <span>Agomoni Visual Template</span>
              </span>
            </div>

            <ShareCardPreview payload={payload} />
          </div>

          {/* 3. Primary Quick Copy Action */}
          <div className="mb-5 space-y-2">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#1A1210] border border-[#FFFDF8]/15 shadow-inner">
              <div className="min-w-0 flex-1 px-3 text-xs text-[#FFF8EA]/70 truncate font-mono">
                {payload.url || (typeof window !== 'undefined' ? window.location.href : 'https://agomoni.vercel.app')}
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 sm:px-5 py-2 rounded-full text-xs font-bold bg-[#A61B1B] text-[#FFFDF8] border border-[#E7C878]/40 hover:bg-[#741313] hover:border-[#E7C878]/60 transition-all flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95 flex-shrink-0"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-300" />
                    <span>{isBn ? 'কপি হয়েছে!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#FFFDF8]" />
                    <span>{isBn ? 'লিঙ্ক কপি করুন' : 'Copy Link'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4. One-Click Social Launchers Hub */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase font-bold text-[#E7C878] tracking-wider px-1">
              {isBn ? 'সরাসরি শেয়ার করুন' : 'Direct Share to Apps'}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-2.5">
              {/* WhatsApp */}
              <button
                type="button"
                onClick={() => shareToPlatform('whatsapp')}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#1A1210]/80 border border-[#FFFDF8]/10 hover:border-[#25D366]/60 hover:bg-[#25D366]/10 text-[#FFF8EA] hover:text-[#25D366] transition-all cursor-pointer group active:scale-95 shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold">WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => shareToPlatform('facebook')}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#1A1210]/80 border border-[#FFFDF8]/10 hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10 text-[#FFF8EA] hover:text-[#1877F2] transition-all cursor-pointer group active:scale-95 shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <span className="text-xs font-extrabold text-[#1877F2]">f</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold">Facebook</span>
              </button>

              {/* X / Twitter */}
              <button
                type="button"
                onClick={() => shareToPlatform('twitter')}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#1A1210]/80 border border-[#FFFDF8]/10 hover:border-[#E7C878]/60 hover:bg-[#FFFDF8]/[0.08] text-[#FFF8EA] hover:text-[#E7C878] transition-all cursor-pointer group active:scale-95 shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-[#120B09] border border-[#E7C878]/30 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <span className="text-xs font-extrabold text-[#FFFDF8]">𝕏</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold">X (Twitter)</span>
              </button>

              {/* Telegram */}
              <button
                type="button"
                onClick={() => shareToPlatform('telegram')}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#1A1210]/80 border border-[#FFFDF8]/10 hover:border-[#229ED9]/60 hover:bg-[#229ED9]/10 text-[#FFF8EA] hover:text-[#229ED9] transition-all cursor-pointer group active:scale-95 shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-[#229ED9]/20 border border-[#229ED9]/40 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Send className="w-4 h-4 text-[#229ED9]" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold">Telegram</span>
              </button>

              {/* LinkedIn */}
              <button
                type="button"
                onClick={() => shareToPlatform('linkedin')}
                className="hidden sm:flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#1A1210]/80 border border-[#FFFDF8]/10 hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 text-[#FFF8EA] hover:text-[#0A66C2] transition-all cursor-pointer group active:scale-95 shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-[#0A66C2]/20 border border-[#0A66C2]/40 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <span className="text-xs font-extrabold text-[#0A66C2]">in</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold">LinkedIn</span>
              </button>
            </div>
          </div>

          {/* 5. Additional Secondary Actions: Native Share & Formatted Story Copy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#FFFDF8]/10">
            {/* Copy Formatted Lore / Message */}
            <button
              type="button"
              onClick={handleCopyFormattedText}
              className="px-3.5 py-2.5 rounded-full bg-[#1A1210]/90 border border-[#FFFDF8]/15 hover:border-[#E7C878]/45 text-xs text-[#FFF8EA] hover:text-[#E7C878] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-300" />
                  <span>{isBn ? 'বার্তা কপি হয়েছে!' : 'Story Copied!'}</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5 text-[#E7C878]" />
                  <span>{isBn ? 'সম্পূর্ণ বার্তা কপি করুন' : 'Copy Formatted Lore'}</span>
                </>
              )}
            </button>

            {/* Native OS Share Sheet (Mobile / Safari) */}
            {canNativeShare && (
              <button
                type="button"
                onClick={triggerNativeShare}
                className="px-3.5 py-2.5 rounded-full bg-[#A61B1B]/20 border border-[#A61B1B]/60 hover:bg-[#A61B1B]/35 text-xs text-[#FFF8EA] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5 text-[#E7C878]" />
                <span>{isBn ? 'ডিভাইস শেয়ার খুলুন' : 'Open Device Share'}</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
