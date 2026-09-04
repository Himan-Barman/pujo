'use client';

import { useShareStore, SharePayload } from '@/stores/share-store';
import { useUIStore } from '@/stores/ui-store';

export const useShare = () => {
  const isOpen = useShareStore((state) => state.isOpen);
  const payload = useShareStore((state) => state.payload);
  const openShare = useShareStore((state) => state.openShare);
  const closeShare = useShareStore((state) => state.closeShare);
  const language = useUIStore((state) => state.language);

  const getResolvedShareData = (customPayload?: SharePayload) => {
    const data = customPayload || payload;
    if (!data) return null;

    const isBn = language === 'bn';
    const title = isBn ? data.titleBn : data.titleEn || data.titleBn;
    const description = isBn
      ? data.descriptionBn
      : data.descriptionEn || data.descriptionBn;
    const category = isBn
      ? data.categoryBn
      : data.categoryEn || data.categoryBn;
    
    // Ensure URL is absolute
    let shareUrl = data.url;
    if (!shareUrl && typeof window !== 'undefined') {
      shareUrl = window.location.href;
    } else if (!shareUrl) {
      shareUrl = 'https://agomoni.vercel.app';
    }

    return {
      title,
      description,
      category,
      url: shareUrl,
      image: data.image,
      tag: isBn ? data.tagBn : data.tagEn,
      customQuote: isBn ? data.customQuoteBn : data.customQuoteEn,
    };
  };

  const shareToPlatform = (platform: 'whatsapp' | 'facebook' | 'twitter' | 'telegram' | 'linkedin' | 'email') => {
    const data = getResolvedShareData();
    if (!data) return;

    const { title, description, url } = data;
    const encodedUrl = encodeURIComponent(url);
    const message = `🪔 ${title} — ${description}\n\n🔗 ${url}\n\n#Agomoni #DurgaPuja #শারদোৎসব`;
    const encodedMessage = encodeURIComponent(message);
    const encodedTitle = encodeURIComponent(`🪔 ${title} | আগমনী (Agomoni)`);

    let targetUrl = '';
    switch (platform) {
      case 'whatsapp':
        targetUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        break;
      case 'facebook':
        targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        targetUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=Agomoni,DurgaPuja,শারদোৎসব`;
        break;
      case 'telegram':
        targetUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(`🪔 ${title}\n${description}`)}`;
        break;
      case 'linkedin':
        targetUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'email':
        targetUrl = `mailto:?subject=${encodedTitle}&body=${encodedMessage}`;
        break;
    }

    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer,width=600,height=550');
    }
  };

  const copyToClipboard = async (text?: string): Promise<boolean> => {
    const data = getResolvedShareData();
    const shareUrl = text || data?.url || (typeof window !== 'undefined' ? window.location.href : '');
    if (!shareUrl) return false;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const copyFormattedLore = async (): Promise<boolean> => {
    const data = getResolvedShareData();
    if (!data) return false;

    const formatted = `🪔 আগমনী (Agomoni) — দুর্গাপূজা ও ঐতিহ্যের ডিজিটাল রূপ\n\n✨ ${data.title}\n${data.category ? `🏷️ ${data.category}\n` : ''}\n📖 ${data.description}\n\n🔗 অভিজ্ঞতা নিন: ${data.url}\n\n#Agomoni #DurgaPuja #শারদোৎসব #বাঙালিরপূজো`;

    return copyToClipboard(formatted);
  };

  const triggerNativeShare = async (): Promise<boolean> => {
    const data = getResolvedShareData();
    if (!data || typeof navigator === 'undefined' || !navigator.share) return false;

    try {
      await navigator.share({
        title: data.title,
        text: `${data.description} — আগমনী (Agomoni)`,
        url: data.url,
      });
      return true;
    } catch {
      return false;
    }
  };

  return {
    isOpen,
    payload,
    openShare,
    closeShare,
    getResolvedShareData,
    shareToPlatform,
    copyToClipboard,
    copyFormattedLore,
    triggerNativeShare,
  };
};
