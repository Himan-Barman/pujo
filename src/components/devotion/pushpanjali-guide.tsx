'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { audioSynth } from '@/lib/audio-synth';
import {
  Sparkles,
  Volume2,
  VolumeX,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Heart,
  Flame,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PUSHPANJALI_ROUNDS = [
  {
    round: 1,
    titleBn: '১ম পর্ব: দেবীর আবাহন ও অঙ্গন্যাস',
    titleEn: 'Round 1: Sacred Invocation & Anganyasa',
    tagBn: 'প্রথম অঞ্জলি অর্ঘ্য',
    tagEn: 'First Floral Round',
    mantraSanskrit:
      'ওঁ জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী।\nদুর্গা শিবা ক্ষমা ধাত্রী স্বাহা স্বধা নমোঽস্তু তে॥\nএষ সচন্দন গন্ধপুষ্পবিল্বপত্রাঞ্জলিঃ শ্রীমদ্দুর্গায়ৈ নমঃ॥',
    mantraTransliteration:
      'Om Jayanti Mangala Kali Bhadrakali Kapalini |\nDurga Shiva Kshama Dhatri Svaha Svadha Namo’stu Te ||\nEsha Sachandana Gandhapushpa-Bilvapatranjalih Shrimad-Durgayai Namah ||',
    bengaliMeaning:
      'হে সর্বজয়িনী, মঙ্গলদায়িনী, কালরূপিণী, কল্যাণময়ী ভদ্রকালী ও কপালিনী দেবী! হে দুর্গা, শিবা, পরম ক্ষমাশীলা, নিখিল ধরণীর ধাত্রী, দেবযজ্ঞের স্বাহা ও পিতৃপুরুষের স্বধারূপিণী জগন্মাতা—আপনাকে করজোড়ে কোটি কোটি প্রণাম জানাই। এই সুগন্ধি চন্দনচর্চিত পুষ্প ও পবিত্র বেলপাতার প্রথম অর্ঘ্য আপনার শ্রীচরণে ভক্তিভরে নিবেদন করি।',
    englishMeaning:
      'Salutations to the Supreme Goddess who is Victorious, Auspicious, the Timeless Kali, the Compassionate Bhadrakali, and the Bearer of Divine Wisdom. O Durga, the Embodiment of Auspiciousness, Forgiveness, and Cosmic Nurturer—we bow to You. We offer this first handful of sandalwood-scented blossoms and sacred bilva leaves at Your divine feet.',
  },
  {
    round: 2,
    titleBn: '২য় পর্ব: মহিষাসুরমর্দিনী বন্দনা ও রূপ ধ্যান',
    titleEn: 'Round 2: Mahishasuramardini Adoration',
    tagBn: 'দ্বিতীয় অঞ্জলি অর্ঘ্য',
    tagEn: 'Second Floral Round',
    mantraSanskrit:
      'ওঁ মহিষঘ্নি মহামায়ে চামুণ্ডে মুণ্ডমালিনী।\nআয়ুরারোগ্যবিজয়ং দেহি দেবি নমোঽস্তু তে॥\nএষ সচন্দন গন্ধপুষ্পবিল্বপত্রাঞ্জলিঃ শ্রীমদ্দুর্গায়ৈ নমঃ॥',
    mantraTransliteration:
      'Om Mahishaghni Mahamaye Chamunde Mundamalini |\nAyur-Arogya-Vijayam Dehi Devi Namo’stu Te ||\nEsha Sachandana Gandhapushpa-Bilvapatranjalih Shrimad-Durgayai Namah ||',
    bengaliMeaning:
      'হে মহিষাসুরসংহারিণী, বিশ্বমোহিনী মহামায়া, অসুরদলনী চামুণ্ডা দেবী! আমাদের দীর্ঘায়ু, রোগহীন সুস্থ শরীর, আধ্যাত্মিক বল ও জীবনের প্রতিটি ধর্মযুদ্ধে অন্তিম বিজয় দান করুন। আপনাকে শতকোটি প্রণাম। এই সুগন্ধি চন্দনযুক্ত পুষ্প ও বিল্বপত্রের দ্বিতীয় অর্ঘ্য আপনার শ্রীচরণে সমর্পণ করি।',
    englishMeaning:
      'O Slayer of the buffalo demon Mahishasura, the Great Weaver of the Cosmic Illusion, the Victorious Chamunda! Bestow upon us long life, sound health, inner strength, and triumph over all spiritual and worldly obstacles. We offer this second consecrated handful of fragrant flowers and bilva leaves at Your holy feet.',
  },
  {
    round: 3,
    titleBn: '৩য় পর্ব: সর্বমঙ্গল শরণাগতি ও পরম ক্ষমা প্রার্থনা',
    titleEn: 'Round 3: Ultimate Surrender & Benediction',
    tagBn: 'তৃতীয় অঞ্জলি অর্ঘ্য',
    tagEn: 'Third & Final Floral Round',
    mantraSanskrit:
      'ওঁ সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে।\nশরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোঽস্তু তে॥\nসৃষ্টিস্থিতিবিনাশানাং শক্তিভূতে সনাতনি।\nগুণাশ্রয়ে গুণময়ে নারায়ণি নমোঽস্তু তে॥\nশরণাগতদীনার্তপরিত্রাণপরায়ণে।\nসর্বস্যার্তিহরে দেবি নারায়ণি নমোঽস্তু তে॥\nএষ সচন্দন গন্ধপুষ্পবিল্বপত্রাঞ্জলিঃ শ্রীমদ্দুর্গায়ৈ নমঃ॥',
    mantraTransliteration:
      'Om Sarva-Mangala-Mangalye Shive Sarvartha-Sadhike |\nSharanye Tryambake Gauri Narayani Namo’stu Te ||\nSrishti-Sthiti-Vinashanam Shakti-Bhute Sanatani |\nGunashraye Gunamaye Narayani Namo’stu Te ||\nSharanagata-Dinarta-Paritrana-Parayane |\nSarvasyartihare Devi Narayani Namo’stu Te ||\nEsha Sachandana Gandhapushpa-Bilvapatranjalih Shrimad-Durgayai Namah ||',
    bengaliMeaning:
      'হে সকল মঙ্গলের পরম মঙ্গলময়ী, শিবস্বরূপিণী, সকল পুরুষার্থ ও মনোবাঞ্ছা পূর্ণকারিণী! হে ত্রিনয়নী, শরণাগতপালিনী গৌরী নারায়ণী—আপনাকে অনন্ত প্রণাম। আপনি নিখিল সৃষ্টির উৎপত্তি, স্থিতি ও লয়ের মূল মহাশক্তি। আপনি অনন্তগুণের আধার ও রূপময়ী। শরণাপন্ন দীন ও আর্ভজনদের রক্ষাকর্ত্রী এবং সকল দুঃখ-কষ্ট হরণকারিণী দেবী নারায়ণী—আমাদের সমস্ত অজ্ঞানতা ও ত্রুটি ক্ষমা করে আপনার চরণে চিরআশ্রয় দিন। এই অন্তিম পুষ্পাঞ্জলি আপনার শ্রীচরণে সমর্পিত হলো।',
    englishMeaning:
      'O Auspicious One of all auspiciousness, the Giver of all boons, the Refuge of the distressed, the Three-Eyed Mother Gauri Narayani—we surrender at Your feet. You are the primordial energy of creation, preservation, and dissolution. O Eternal Mother who dispels every sorrow of those who seek Your shelter, accept our humble surrender and final offering of devotion.',
  },
];

export const PushpanjaliGuide: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const [currentRound, setCurrentRound] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [offeredRounds, setOfferedRounds] = useState<boolean[]>([false, false, false]);

  const activeData = PUSHPANJALI_ROUNDS[currentRound];

  const handleToggleAudio = () => {
    if (!isPlayingAudio) {
      audioSynth.playShankha(3.2);
      setTimeout(() => audioSynth.playTempleBell(0.8), 800);
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3200);
    } else {
      setIsPlayingAudio(false);
    }
  };

  const handleMarkOffered = () => {
    const updated = [...offeredRounds];
    updated[currentRound] = true;
    setOfferedRounds(updated);

    audioSynth.playTempleBell();

    if (currentRound < 2) {
      setTimeout(() => setCurrentRound((prev) => prev + 1), 600);
    }
  };

  return (
    <div className="agomoni-card p-6 sm:p-10 border border-[#FFFDF8]/12 bg-[#1A1210]/95 backdrop-blur-2xl shadow-2xl space-y-8">
      {/* 1. Header & Tri-Parjayi Progress Stepper */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-[#FFFDF8]/10">
        <div className="text-center lg:text-left space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241B18] border border-[#E7C878]/30 text-xs text-[#E7C878] font-bold shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#E7C878]" />
            <span>{language === 'bn' ? 'মহাষ্টমী ত্রিপর্ব পুষ্পাঞ্জলি সহায়িকা' : 'Ashtami 3-Round Pushpanjali Guide'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF8EA]">
            {language === 'bn' ? 'পর্যায়ক্রমিক ৩ পর্বের পুষ্পাঞ্জলি পাঠ' : 'Step-by-Step 3-Round Pushpanjali Recitation'}
          </h3>
          <p className="text-xs sm:text-sm text-[#E7C878]/90 font-sans max-w-xl">
            {language === 'bn'
              ? 'মহাষ্টমীর তিনটি পৃথক পুষ্পাঞ্জলি মন্ত্রের বিশুদ্ধ সংস্কৃত শ্লোক, সরল বঙ্গানুবাদ ও শঙ্খধ্বনি শুনুন।'
              : 'Follow the 3 sacred rounds of Ashtami Pushpanjali with authentic Sanskrit verses and translations.'}
          </p>
        </div>

        {/* 3 Steps Capsule Switcher */}
        <div className="flex items-center p-1.5 rounded-full bg-[#120B09] border border-[#E7C878]/30 shadow-inner flex-shrink-0">
          {PUSHPANJALI_ROUNDS.map((r, idx) => {
            const isSelected = currentRound === idx;
            const isCompleted = offeredRounds[idx];

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentRound(idx)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95',
                  isSelected
                    ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-md border border-[#E7C878]/40'
                    : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E7C878]" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-[#241B18] text-[10px] flex items-center justify-center font-mono text-[#E7C878]">
                    {idx + 1}
                  </span>
                )}
                <span>{language === 'bn' ? `পর্ব ${idx + 1}` : `Round ${idx + 1}`}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Master Sanskrit Mantra Recitation Box */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#120B09] border-2 border-[#E7C878]/35 space-y-5 shadow-inner relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#FFFDF8]/10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#A61B1B] text-[#FFFDF8] text-xs font-bold font-mono">
              {language === 'bn' ? activeData.tagBn : activeData.tagEn}
            </span>
            <h4 className="text-base sm:text-lg font-bold font-serif text-[#E7C878]">
              {language === 'bn' ? activeData.titleBn : activeData.titleEn}
            </h4>
          </div>

          <button
            type="button"
            onClick={handleToggleAudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#241B18] border border-[#E7C878]/40 text-[#E7C878] hover:bg-[#A61B1B] hover:text-[#FFFDF8] text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer flex-shrink-0"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-3.5 h-3.5 animate-spin" />
                <span>{language === 'bn' ? 'শঙ্খ বাজছে...' : 'Playing...'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'শঙ্খধ্বনি শুনুন' : 'Sound Conch'}</span>
              </>
            )}
          </button>
        </div>

        {/* Sanskrit Verse in Bengali Script */}
        <div className="p-5 rounded-[22px] bg-[#1A1210] border border-[#FFFDF8]/10 text-center">
          <p className="text-base sm:text-xl text-[#E7C878] font-mono font-bold leading-loose whitespace-pre-line tracking-wide">
            {activeData.mantraSanskrit}
          </p>
        </div>

        {/* Dual Translation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Bengali Translation */}
          <div className="p-5 rounded-[20px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 space-y-2">
            <span className="text-xs font-bold text-[#E7C878] uppercase tracking-wider block font-serif">
              {language === 'bn' ? 'সরল বঙ্গানুবাদ ও ভাবার্থ' : 'Bengali Meaning'}
            </span>
            <p className="text-xs sm:text-sm text-[#FFF8EA]/90 leading-relaxed font-sans">
              {activeData.bengaliMeaning}
            </p>
          </div>

          {/* English Meaning */}
          <div className="p-5 rounded-[20px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 space-y-2">
            <span className="text-xs font-bold text-[#E7C878] uppercase tracking-wider block font-serif">
              {language === 'bn' ? 'ইংরেজি অনুবাদ' : 'English Interpretation'}
            </span>
            <p className="text-xs sm:text-sm text-[#FFF8EA]/90 leading-relaxed font-sans">
              {activeData.englishMeaning}
            </p>
          </div>
        </div>

        {/* Action Button: Mark Round Offered */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#FFFDF8]/10">
          <div className="flex items-center gap-2 text-xs text-[#E7C878]/80 font-sans">
            <Heart className="w-4 h-4 text-[#E7C878]" />
            <span>
              {language === 'bn'
                ? 'পুষ্প ও চন্দন বিল্বপত্র হাতে নিয়ে পুরোহিতের সাথে উচ্চারণের পর অর্ঘ্য সমর্পণ করুন।'
                : 'Hold flowers and bilva leaves in hand, chant along, and offer at the altar.'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleMarkOffered}
            className="apple-btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer active:scale-95 shadow-md flex-shrink-0"
          >
            <CheckCircle2 className="w-4 h-4 text-[#E7C878]" />
            <span>
              {offeredRounds[currentRound]
                ? language === 'bn' ? 'অর্ঘ্য সমর্পিত হয়েছে ✓' : 'Round Offered ✓'
                : language === 'bn' ? `পর্ব ${currentRound + 1} অর্ঘ্য সমর্পণ করুন` : `Complete Round ${currentRound + 1}`}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Navigation Controls Between Rounds */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="button"
          disabled={currentRound === 0}
          onClick={() => setCurrentRound((prev) => Math.max(0, prev - 1))}
          className="apple-btn-secondary px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'পূর্ববর্তী পর্ব' : 'Previous Round'}</span>
        </button>

        <button
          type="button"
          disabled={currentRound === 2}
          onClick={() => setCurrentRound((prev) => Math.min(2, prev + 1))}
          className="apple-btn-secondary px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
        >
          <span>{language === 'bn' ? 'পরবর্তী পর্ব' : 'Next Round'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
