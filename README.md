# মা এসেছেন (Maa Eshechhen) — Digital Cultural Durga Puja Experience

A premium, Bengali-first digital cultural platform celebrating the artistry, rituals, music, and timeless heritage of Sharodotsav (Durga Puja).

---

## ✨ Key Features & Highlights

- **Bengali-First Display & Dual Language (বাংলা \| English)**: Smooth language switcher in top navigation.
- **Ceremonial Puja Mode (🪔 পূজা মোড)**: Immersive dark temple theme with glowing diyas, incense smoke, and floating Shiuli petals.
- **Digital Anjali (ডিজিটাল অঞ্জলি)**: Interactive Pushpanjali offering where devotees input their name, select sacred flowers (রক্তজবা, পদ্ম, বেলপাতা), hear the Shankha sound, and receive a personalized blessed certificate.
- **108 Sacred Diyas (১০৮ প্রদীপ প্রজ্জ্বলন)**: Interactive Sandhi Puja ritual simulation with click-to-light earthen lamps, auto-light sequence, and festive audio chime.
- **Dhak Synthesizer & Bols (ঢাকের বাদ্য ও বোল)**: Interactive Dhak percussion sequencer playing authentic Bengali bols ("কাং তাং কাং তাং", "ধুনুচি নাচ", "বিসর্জন") with procedural Web Audio API synthesis.
- **Puja Radio & Persistent Audio Player**: Curated playlists (Morning Agomoni, Afternoon, Evening Aarti, Midnight Serenade) with a persistent bottom audio player across routes.
- **Mantras & 3-Step Pushpanjali**: Authentic Bengali script, Devanagari Sanskrit, English transliterations, and deep spiritual meanings with audio chant drones.
- **Panjika & Tithi Calendar**: Complete schedule from Mahalaya through Dashami with Sandhi Puja windows and Pushpanjali timings.
- **Mahaprasad Bhog**: Sacred recipes for Gobindobhog Khichuri, Panchmishali Labra, and Chhanar Payesh.
- **Subho Bijoya Greeting Card Generator**: Customizable Bijoya cards with greetings for elders, peers, and younger loved ones, with share and copy options.
- **Puja Guide AI Assistant**: Cultural and ritual assistant with pre-loaded Vedic advice and route handler ready for LLM / pgvector RAG.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router, Server Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4, Custom Alpana & Diya Design Tokens
- **State Management**: Zustand (UI and Audio player stores)
- **Animation & Effects**: Framer Motion, Canvas Confetti
- **Sound Engine**: Procedural Web Audio API Synthesizer (Dhak, Shankha, Kashor Ghanta)
- **Icons**: Lucide React
- **Typography**: Google Fonts (`Noto Serif Bengali`, `Hind Siliguri`, `Plus Jakarta Sans`)
- **Backend & Database Readiness**: Next.js Route Handlers (`/api/anjali`, `/api/recommendations`, `/api/puja-guide`), Supabase PostgreSQL typed schema.

---

## 📂 Project Structure

```
src/
  app/
    (public)/
      calendar/page.tsx     # Puja Calendar & Tithis
      songs/page.tsx        # Puja Radio & Dhak Sequencer
      mantras/page.tsx      # Mantras & Pushpanjali
      anjali/page.tsx       # Digital Anjali & 108 Diyas
      culture/page.tsx      # Culture & History Articles
      bhog/page.tsx         # Mahaprasad & Recipes
      gallery/page.tsx      # Visual Showcase Gallery
      bijoya/page.tsx       # Subho Bijoya Card Generator
      puja-guide/page.tsx   # AI Cultural Assistant
      page.tsx              # Homepage
      layout.tsx
    api/
      anjali/route.ts
      recommendations/route.ts
      puja-guide/route.ts
    globals.css
    layout.tsx

  components/
    layout/                 # Header, Footer, Mobile Drawer, Puja Mode Overlay
    home/                   # Hero, Today's Puja, Timeline, Feature Grid, Bijoya CTA
    puja/                   # Puja Day Selector, Ritual Card, Calendar
    music/                  # Radio Section, Playlist Card, Persistent Audio Player
    devotion/               # Digital Anjali, 108 Diyas, Dhak Player, Mantra Card
    culture/                # Culture Article Card
    shared/                 # Section Heading, Alpana Pattern, Language Toggle

  data/                     # Typed mock datasets (Puja Days, Rituals, Playlists, Mantras, Bhog)
  lib/                      # Audio Synthesizer, Dates, Formatters, Constants, Supabase
  stores/                   # Audio Store, UI Store (Zustand)
  types/                    # TypeScript interfaces
  config/                   # Site config & Navigation items
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🏛️ Future Supabase & AI Integrations

- **Supabase PostgreSQL & Auth**: Ready for saving community anjali offerings and user favourites (schema defined in `src/lib/supabase/types.ts`).
- **AI RAG (pgvector)**: Connect `/api/puja-guide` to OpenAI / Anthropic / Gemini embeddings with traditional Vedic scripture chunks.
