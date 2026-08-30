import type { Metadata, Viewport } from 'next';
import { Noto_Serif_Bengali, Hind_Siliguri, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { PersistentAudioPlayer } from '@/components/music/persistent-audio-player';
import { PujaModeOverlay } from '@/components/layout/puja-mode-overlay';
import { GlobalPhotoBackground } from '@/components/layout/global-photo-background';
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider';
import { FloatingAIChat } from '@/components/layout/floating-ai-button';
import { SITE_CONFIG } from '@/config/site';

export const viewport: Viewport = {
  themeColor: '#120B09',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const notoBengali = Noto_Serif_Bengali({
  weight: ['400', '600', '700', '800'],
  subsets: ['bengali'],
  variable: '--font-noto-bengali',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://agomoni.vercel.app'),
  title: `${SITE_CONFIG.nameBn} (${SITE_CONFIG.name}) | ${SITE_CONFIG.taglineBn}`,
  description: SITE_CONFIG.descriptionBn,
  keywords: [
    'Durga Puja',
    'Agomoni',
    'আগমনী',
    'শারদোৎসব',
    'পুষ্পাঞ্জলি',
    'সন্ধিপূজা',
    'চণ্ডীপাঠ',
    'Bengali Culture',
    'Kolkata Durga Puja',
  ],
  authors: [{ name: SITE_CONFIG.creator }],
  openGraph: {
    title: `${SITE_CONFIG.nameBn} — ${SITE_CONFIG.taglineBn}`,
    description: SITE_CONFIG.descriptionBn,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: 'Devi Durga Pratima Daaker Saaj',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${notoBengali.variable} ${hindSiliguri.variable} ${jakarta.variable} bg-[#120B09]`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#120B09] text-[#FFF8EA] font-sans antialiased selection:bg-[#A61B1B] selection:text-[#FFFDF8] flex flex-col justify-between overflow-x-hidden w-full max-w-[100vw]">
        <SmoothScrollProvider>
          {/* Global Blurred Photo Slideshow Background */}
          <GlobalPhotoBackground />

          {/* Ceremonial Puja Mode Overlay */}
          <PujaModeOverlay />

          {/* Global Navigation Header */}
          <SiteHeader />

          {/* Mobile Navigation Drawer */}
          <MobileNavigation />

          {/* Main Content Area */}
          <main className="relative z-10 flex-1 w-full max-w-[100vw] overflow-x-hidden pb-20">{children}</main>

          {/* Global Persistent Bottom Audio Player */}
          <PersistentAudioPlayer />

          {/* Floating AI Puja Sathi Chat Drawer */}
          <FloatingAIChat />

          {/* Global Site Footer */}
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
