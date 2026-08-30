'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Heart, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioSynth } from '@/lib/audio-synth';
import { cn } from '@/lib/utils';

export default function BijoyaPage() {
  const language = useUIStore((state) => state.language);

  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [messageType, setMessageType] = useState<'elder' | 'peer' | 'younger'>('elder');
  const [themeStyle, setThemeStyle] = useState<'sindoor' | 'gold' | 'maroon'>('sindoor');
  const [copied, setCopied] = useState(false);

  const greetingsPresets = {
    elder: {
      bn: 'শুভ বিজয়ার সশ্রদ্ধ প্রণাম গ্রহণ করবেন। দেবীর কৃপায় আপনার জীবন সুখ, শান্তি ও দীর্ঘায়ুতে পূর্ণ হোক।',
      en: 'Please accept my respectful Pranams on the auspicious occasion of Subho Bijoya. May the Divine Mother bless you with good health, peace, and longevity.',
    },
    peer: {
      bn: 'শুভ বিজয়ার আন্তরিক প্রীতি, শুভেচ্ছা ও ভালোবাসা রইল। মা দুর্গার আশীর্বাদে আগামী দিনগুলি আনন্দ ও সফলতায় ভরে উঠুক।',
      en: 'Wishing you heartfelt joy and warm embrace on Subho Bijoya. May Maa Durga bestow peace, prosperity, and success in the days ahead.',
    },
    younger: {
      bn: 'শুভ বিজয়ার একরাশ স্নেহ ও ভালোবাসা। দেবী দুর্গার অপার আশীর্বাদে তোমার ভবিষ্যৎ উজ্জ্বল ও সাফল্যমণ্ডিত হোক।',
      en: 'Sending you affectionate blessings and love on Subho Bijoya. May the Mother guide you towards a bright and fulfilling future.',
    },
  };

  const handleShare = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#A61B1B', '#E7C878', '#C99A3D'],
    });
    audioSynth.playTempleBell();

    const recipientText = recipient.trim() || (language === 'bn' ? 'সুহৃদ' : 'Friend');
    const senderText = sender.trim() || (language === 'bn' ? 'আপনার প্রিয়জন' : 'Your Well-Wisher');
    const greetingBody = language === 'bn' ? greetingsPresets[messageType].bn : greetingsPresets[messageType].en;
    const signOff = language === 'bn' ? 'প্রণামান্তে / শুভেচ্ছান্তে,' : 'With Warm Regards & Blessings,';

    const fullMessage = `${language === 'bn' ? 'শুভ বিজয়া!' : 'Subho Bijoya!'} \n\n${
      language === 'bn' ? 'প্রিয়' : 'Dear'
    } ${recipientText},\n${greetingBody}\n\n${signOff}\n${senderText}\n\n— আগমনী (Agomoni)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <SectionHeading
        tagBn="বিজয়া সম্ভাষণ"
        tagEn="Subho Bijoya Greetings"
        titleBn="শুভ বিজয়ার শুভেচ্ছা কার্ড নির্মাতা"
        titleEn="Subho Bijoya Greeting Card Generator"
        subtitleBn="“আসছে বছর আবার হবে”—আপনার প্রিয়জনদের জন্য ঐতিহ্যবাহী বিজয়ার আন্তরিক শুভেচ্ছা তৈরি করুন।"
        subtitleEn="Generate, personalize, and share traditional Bijoya Dashami benediction cards."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Generator Form */}
        <ScrollReveal delay={0.05} distance={45} className="lg:col-span-6">
          <div className="agomoni-card p-6 sm:p-8 space-y-5">
            <h3 className="text-xl font-bold font-serif text-[#E7C878] mb-2 drop-shadow-sm">
              {language === 'bn' ? 'শুভেচ্ছা কার্ডের তথ্য' : 'Card Customization'}
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#E7C878] uppercase tracking-wider mb-2">
                {language === 'bn' ? '১. প্রাপকের নাম' : '1. Recipient Name'} *
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'যেমন: কাকা-কাকিমা, বন্ধু রাহুল, স্নেহের অনিকেত'
                    : 'e.g. Respected Uncle, Friend Rahul'
                }
                className="apple-input w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#E7C878] uppercase tracking-wider mb-2">
                {language === 'bn' ? '২. আপনার নাম' : '2. Your Name'} *
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder={language === 'bn' ? 'আপনার নাম লিখুন...' : 'Enter your name...'}
                className="apple-input w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#E7C878] uppercase tracking-wider mb-2">
                {language === 'bn' ? '৩. সম্ভাষণ শ্রেণি' : '3. Greeting Type'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMessageType('elder')}
                  className={cn(
                    'p-3 rounded-[18px] text-xs font-semibold border transition-all duration-200 cursor-pointer text-center active:scale-[0.97]',
                    messageType === 'elder'
                      ? 'bg-[#A61B1B] border-[#741313] text-white shadow-xs'
                      : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
                  )}
                >
                  {language === 'bn' ? 'প্রণাম (প্রবীণ)' : 'Pranam (Elders)'}
                </button>

                <button
                  type="button"
                  onClick={() => setMessageType('peer')}
                  className={cn(
                    'p-3 rounded-[18px] text-xs font-semibold border transition-all duration-200 cursor-pointer text-center active:scale-[0.97]',
                    messageType === 'peer'
                      ? 'bg-[#A61B1B] border-[#741313] text-white shadow-xs'
                      : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
                  )}
                >
                  {language === 'bn' ? 'প্রীতি ও শুভেচ্ছা' : 'Warm Wishes'}
                </button>

                <button
                  type="button"
                  onClick={() => setMessageType('younger')}
                  className={cn(
                    'p-3 rounded-[18px] text-xs font-semibold border transition-all duration-200 cursor-pointer text-center active:scale-[0.97]',
                    messageType === 'younger'
                      ? 'bg-[#A61B1B] border-[#741313] text-white shadow-xs'
                      : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
                  )}
                >
                  {language === 'bn' ? 'আশীর্বাদ (ছোটদের)' : 'Blessings'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#E7C878] uppercase tracking-wider mb-2">
                {language === 'bn' ? '৪. কার্ডের শৈলী' : '4. Visual Style'}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setThemeStyle('sindoor')}
                  className={cn(
                    'flex-1 py-2.5 rounded-[18px] text-xs font-semibold border transition-all duration-200 active:scale-[0.97]',
                    themeStyle === 'sindoor'
                      ? 'bg-[#A61B1B] border-[#741313] text-white shadow-xs'
                      : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 text-[#FFF8EA]/70'
                  )}
                >
                  {language === 'bn' ? 'সিঁদুর লাল' : 'Sindoor Red'}
                </button>
                <button
                  type="button"
                  onClick={() => setThemeStyle('gold')}
                  className={cn(
                    'flex-1 py-2.5 rounded-[18px] text-xs font-semibold border transition-all duration-200 active:scale-[0.97]',
                    themeStyle === 'gold'
                      ? 'bg-[#C99A3D] text-[#FFF8EA] border-[#9B7226] shadow-xs'
                      : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 text-[#FFF8EA]/70'
                  )}
                >
                  {language === 'bn' ? 'মন্দির গোল্ড' : 'Temple Gold'}
                </button>
                <button
                  type="button"
                  onClick={() => setThemeStyle('maroon')}
                  className={cn(
                    'flex-1 py-2.5 rounded-[18px] text-xs font-semibold border transition-all duration-200 active:scale-[0.97]',
                    themeStyle === 'maroon'
                      ? 'bg-[#4A0E0E] border-[#8C4C3F] text-white shadow-xs'
                      : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 text-[#FFF8EA]/70'
                  )}
                >
                  {language === 'bn' ? 'দশমী মেরুন' : 'Dashami Maroon'}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Live Card Preview */}
        <ScrollReveal delay={0.12} distance={45} className="lg:col-span-6 space-y-4">
          <div
            className={cn(
              'rounded-[32px] p-8 sm:p-10 border-2 transition-all duration-300 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px]',
              themeStyle === 'sindoor' &&
                'bg-gradient-to-br from-[#A61B1B] to-[#741313] border-[#E7C878]/30 text-white',
              themeStyle === 'gold' &&
                'bg-gradient-to-br from-[#C99A3D] to-[#9B7226] border-[#FFFDF8] text-[#FFF8EA]',
              themeStyle === 'maroon' && 'bg-[#4A0E0E] border-[#E7C878]/30 text-[#FFF8EA]'
            )}
          >
            {/* Top Ornamental Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-white/20">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪔</span>
                <span className="text-xs uppercase tracking-widest text-[#E7C878] font-bold">
                  {language === 'bn' ? 'আগমনী • শুভ বিজয়া' : 'Agomoni • Subho Bijoya'}
                </span>
              </div>
              <span className="text-xs text-white/80 font-mono">
                {language === 'bn' ? 'বিজয়া দশমী ২০২৬' : 'Bijoya Dashami 2026'}
              </span>
            </div>

            {/* Message Center */}
            <div className="my-6 space-y-3">
              <p className="text-sm font-bold text-[#E7C878]">
                {language === 'bn' ? 'প্রিয়' : 'Dear'}{' '}
                {recipient.trim() || (language === 'bn' ? 'সুহৃদ' : 'Friend')},
              </p>

              <h4 className="text-2xl sm:text-3xl font-bold font-serif leading-relaxed">
                “{language === 'bn' ? greetingsPresets[messageType].bn : greetingsPresets[messageType].en}”
              </h4>
            </div>

            {/* Bottom Signature */}
            <div className="pt-4 border-t border-white/20 flex items-center justify-between">
              <div>
                <p className="text-[11px] opacity-70">
                  {language === 'bn' ? 'শুভেচ্ছান্তে / প্রণামান্তে,' : 'With Warm Regards & Blessings,'}
                </p>
                <p className="text-base font-bold font-serif text-[#E7C878]">
                  {sender.trim() || (language === 'bn' ? 'আপনার প্রিয়জন' : 'Your Well-Wisher')}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-serif opacity-90">
                  {language === 'bn' ? '“আসছে বছর আবার হবে…”' : '“Asche Bochor Abar Hobe…”'}
                </p>
              </div>
            </div>
          </div>

          {/* Share & Copy Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="apple-btn-primary flex-1 py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
              <span>
                {copied
                  ? language === 'bn'
                    ? 'মেসেজ কপি হয়েছে!'
                    : 'Copied to Clipboard!'
                  : language === 'bn'
                  ? 'শুভেচ্ছা বার্তা কপি ও শেয়ার করুন'
                  : 'Copy & Share Greeting'}
              </span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
