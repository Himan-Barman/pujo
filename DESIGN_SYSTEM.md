# 🪔 Agomoni (আগমনী) — Design System & UI Specification Guide

> **A comprehensive reference manual for replicating the ultra-premium, dark sacred luxury, and Apple-grade fluid glassmorphism aesthetic of the Agomoni platform.**

---

## 1. 🏛️ Design Philosophy & Aesthetic Core

Agomoni merges **ancient Bengali cultural heritage** (Alpona, Sindoor, Kash Phool, Brass Diyas, Sacred Mantras) with **modern macOS / Apple-inspired UI physics**, resulting in an immersive, divine, and spiritually luminous dark interface.

### Core Tenets:
1. **Sacred Dark Canvas**: Deep temple-night charcoal and terracotta obsidian background (`#120B09`), allowing radiant golden text and illuminated Durga artwork to shine without eye fatigue.
2. **Liquid Glassmorphism**: Translucent frosted surfaces (`backdrop-filter: blur(24px) saturate(1.4)`) bordered with razor-thin antique gold lines (`rgba(231, 200, 120, 0.22)`).
3. **Organic Corner Curvature**: 32px rounded corners on desktop (`rounded-[32px]`) and 24px on mobile (`rounded-[24px]`).
4. **Spring Physics Elevation**: Cards float gently on hover with dynamic depth shadows (`hover:-translate-y-2.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(201,154,61,0.25)]`).
5. **Bilingual Harmony**: Pixel-perfect typography and proportional scaling across Bengali (বাংলা) and English (English) scripts.

---

## 2. 🎨 Color Palette & Design Tokens

### A. Brand Colors
| Token Name | Hex Code | Tailwind Equivalent / Usage | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| **Sindoor Crimson** | `#A61B1B` | `bg-[#A61B1B]` | Primary brand accent, primary CTA buttons, active state capsules |
| **Temple Deep Red** | `#741313` | `bg-[#741313]` | Primary button hover state, deep cultural accent |
| **Soft Vermilion** | `#D95757` | `text-[#D95757]` | Live pulsing indicators, alert badges, sacred highlights |
| **Antique Gold** | `#C99A3D` | `text-[#C99A3D]` | Alpona motifs, icons, secondary headings, border glows |
| **Luminous Soft Gold** | `#E7C878` | `text-[#E7C878]` | Subheadings, card titles on hover, active badges, accents |
| **Pandal Gold** | `#D4AA50` | `text-[#D4AA50]` | Weapon metadata tags, prayer timestamps, scripture quotes |
| **Deep Bronze Gold** | `#9B7226` | `text-[#9B7226]` | Muted borders, low-contrast icons |

### B. Dark Surfaces & Canvas
| Token Name | Hex / RGBA Code | Usage | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| **Temple Night Canvas** | `#120B09` | `bg-[#120B09]` | Master global page background |
| **Sacred Charcoal** | `#1A1210` | `bg-[#1A1210]` | Recessed containers, pill switchers, card bases |
| **Elevated Surface** | `#241A17` | `bg-[#241A17]` | Modals, floating dropdown menus, active dialogs |
| **Glass Surface (Card)**| `rgba(255, 253, 248, 0.08)` | `.agomoni-card` | Glassmorphism card surface with blur |
| **Glass Hover Surface** | `rgba(255, 253, 248, 0.12)` | `hover:bg-[#FFFDF8]/[0.12]` | Interactive hover state for glass cards |
| **Navbar Frosted Glass**| `rgba(18, 11, 9, 0.88)` | `backdrop-blur-2xl` | Pinned navigation headers and bottom bars |

### C. Typography & Text Hierarchy
| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Warm Ivory (Primary)** | `#FFF8EA` | Main headlines, body copy, card headings |
| **Jasmine Pure White** | `#FFFDF8` | High-contrast button text, active badge text |
| **Radiant Gold (Secondary)** | `#E7C878` | Subtitles, mantras, author names, category tags |
| **Muted Sand (Tertiary)** | `rgba(255, 248, 234, 0.70)` | Secondary metadata, descriptions, timestamps |
| **Botanical Sage Green** | `#6EE7B7` | Nabapatrika plant badges, botanical Latin lore |

---

## 3. ✍️ Typography & Font Pairing

```css
/* Font Variables */
--font-serif: 'Noto Serif Bengali', 'Playfair Display', 'Cinzel', serif;
--font-sans: 'Plus Jakarta Sans', 'Inter', 'Hind Siliguri', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Space Mono', monospace;
```

### Hierarchy Guidelines:
- **Hero Title (H1)**: `text-4xl sm:text-6xl md:text-7xl font-black font-serif text-[#FFF8EA] tracking-tight leading-[0.95]`
- **Section Heading (H2)**: `text-2xl sm:text-4xl font-extrabold font-serif text-[#FFF8EA]`
- **Card Title (H3)**: `text-lg sm:text-xl font-bold font-serif text-[#FFF8EA] group-hover:text-[#E7C878]`
- **Tag Badge**: `text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#E7C878]`
- **Body Text**: `text-xs sm:text-sm font-sans text-[#FFF8EA]/80 leading-relaxed`
- **Mantra & Hymns**: `text-xs sm:text-sm font-serif italic text-[#E7C878]`

---

## 4. 🪟 Elevation, Glassmorphism & Card System

### A. The Core `.agomoni-card` Class
```css
.agomoni-card {
  background: rgba(255, 253, 248, 0.08);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(231, 200, 120, 0.22);
  border-radius: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 253, 248, 0.12);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.agomoni-card:hover {
  background: rgba(255, 253, 248, 0.12);
  border-color: rgba(231, 200, 120, 0.45);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.4), 0 0 30px rgba(201, 154, 61, 0.2), inset 0 1px 0 rgba(255, 253, 248, 0.18);
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .agomoni-card {
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border-radius: 24px;
  }
}
```

### B. Floating Action Physics
Apply this utility on interactive card links:
```html
<div class="agomoni-card overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group hover:border-[#E7C878]/80 hover:bg-[#FFFDF8]/[0.12] cursor-pointer active:scale-[0.98] p-0 shadow-xl hover:-translate-y-2.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(231,200,120,0.25)]">
  <!-- Content -->
</div>
```

---

## 5. 🔘 Button & Capsule Design System

### A. Primary Capsule Button (`.apple-btn-primary`)
```css
.apple-btn-primary {
  border-radius: 9999px;
  background-color: #A61B1B;
  color: #FFFDF8;
  font-weight: 600;
  border: 1px solid rgba(231, 200, 120, 0.35);
  box-shadow: 0 4px 18px rgba(166, 27, 27, 0.35);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.apple-btn-primary:hover {
  background-color: #741313;
  box-shadow: 0 6px 24px rgba(166, 27, 27, 0.5);
  border-color: rgba(231, 200, 120, 0.6);
}
.apple-btn-primary:active {
  transform: scale(0.96);
}
```

### B. Secondary Glass Capsule Button (`.apple-btn-secondary`)
```css
.apple-btn-secondary {
  border-radius: 9999px;
  background: rgba(255, 253, 248, 0.1);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 253, 248, 0.15);
  color: #FFF8EA;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.apple-btn-secondary:hover {
  background: rgba(255, 253, 248, 0.18);
  border-color: rgba(231, 200, 120, 0.4);
  color: #FFFDF8;
}
.apple-btn-secondary:active {
  transform: scale(0.96);
}
```

---

## 6. 🧭 Navigation & Layout Architecture

### A. Pinned Header Navbar
- **Position**: `fixed top-0 left-0 right-0 z-40 w-full`
- **Height**: `h-[52px]` on mobile, `h-16` (64px) on desktop (`h-[52px] sm:h-16`)
- **Background**: `backdrop-blur-2xl bg-[#120B09]/85 border-b border-[#FFFDF8]/10`
- **Page Main Offset**: `<main className="pt-[52px] sm:pt-16 pb-20">`

### B. Dynamic Bilingual Logo Specification
- Contains high-contrast luminous Durga face, glowing third eye, radiant golden crown, and warm ivory Bengali/English typography.
- Fills entire nav height with `object-contain` without artificial drop-shadow box blur:
  - Bengali: `/images/logo/agomoni-logo-bn.jpg`
  - English: `/images/logo/agomoni-logo-en.jpg`

---

## 7. 🏷️ Segmented Multi-Category Filter Bar Pattern

Used across Home and Culture pages:
```html
<div class="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
  <!-- Active Tab -->
  <button class="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-[#A61B1B] text-[#FFFDF8] border border-[#E7C878]/60 shadow-[0_4px_20px_rgba(166,27,27,0.4)] scale-105 transition-all">
    <Leaf class="w-4 h-4 text-[#FFFDF8]" />
    <span>নবপত্রিকা (৯ উদ্ভিদ)</span>
    <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white/20 text-white">৯</span>
  </button>

  <!-- Inactive Tab -->
  <button class="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-[#1A1210]/70 backdrop-blur-md text-[#FFF8EA]/75 border border-[#FFFDF8]/12 hover:border-[#E7C878]/40 hover:text-[#FFF8EA] transition-all">
    <Shield class="w-4 h-4 text-[#E7C878]" />
    <span>দশভুজার মহাশস্ত্র (১০)</span>
    <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#120B09] text-[#E7C878] border border-[#FFFDF8]/10">১০</span>
  </button>
</div>
```

---

## 8. ✨ Micro-Interactions & Animations

### A. Diya Sacred Flame Pulse
```css
@keyframes flame-subtle {
  0%, 100% {
    transform: scale(1) translateY(0);
    filter: drop-shadow(0 0 6px rgba(231, 200, 120, 0.8)) drop-shadow(0 0 12px rgba(166, 27, 27, 0.4));
    opacity: 0.95;
  }
  50% {
    transform: scale(1.06) translateY(-1.5px);
    filter: drop-shadow(0 0 10px rgba(231, 200, 120, 0.95)) drop-shadow(0 0 16px rgba(201, 154, 61, 0.6));
    opacity: 1;
  }
}
.animate-flame {
  animation: flame-subtle 2.4s ease-in-out infinite alternate;
}
```

### B. Floating Shiuli Petals
```css
@keyframes petal-drift {
  0% { transform: translateY(-10px) rotate(0deg) translateX(0); opacity: 0; }
  15% { opacity: 0.7; }
  85% { opacity: 0.7; }
  100% { transform: translateY(500px) rotate(300deg) translateX(30px); opacity: 0; }
}
.animate-petal {
  animation: petal-drift 14s linear infinite;
}
```

### C. Framer Motion Scroll Staggering
- **Ease curve**: `[0.16, 1, 0.3, 1]`
- **Stagger delay**: `0.07s` to `0.09s` between child items.

---

## 9. 📱 Responsive Breakpoints & Performance
- **Mobile (`< 640px`)**:
  - `padding`: `px-4 py-8`
  - `card radius`: `rounded-[24px]`
  - `header height`: `h-[52px]`
  - `backdrop-blur`: `10px` to save GPU power
- **Tablet (`640px - 1024px`)**:
  - 2-column card layouts
  - `header height`: `h-16`
- **Desktop (`> 1024px`)**:
  - 3-column card layouts
  - `card radius`: `rounded-[32px]`
  - `backdrop-blur`: `24px`

---

## 10. 📋 Quick Cheat Sheet

```tsx
// 1. Container Wrapper
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">

// 2. Section Heading
<div className="text-center space-y-3">
  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1A1210]/80 border border-[#E7C878]/30 text-[#E7C878] text-xs font-semibold">
    ✨ শারদীয়া আগমনী
  </div>
  <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-[#FFF8EA]">
    বাঙালির দুর্গোৎসব
  </h2>
  <p className="text-xs sm:text-sm text-[#E7C878]/90 font-sans max-w-2xl mx-auto">
    সুপ্রাচীন সংস্কৃতি ও ঐতিহ্যের প্রামাণ্য ইতিবৃত্ত।
  </p>
</div>

// 3. Floating Glass Card Link
<Link href="/details" className="agomoni-card overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group hover:border-[#E7C878]/80 hover:bg-[#FFFDF8]/[0.12] p-0 shadow-xl hover:-translate-y-2.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(231,200,120,0.25)]">
  <div className="relative w-full h-48 overflow-hidden bg-[#1A1210]">
    <Image src="/photo.jpg" alt="Item" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210] via-transparent to-transparent" />
  </div>
  <div className="p-5 space-y-3">
    <h3 className="text-lg font-bold font-serif text-[#FFF8EA] group-hover:text-[#E7C878] transition-colors">শিরোনাম</h3>
    <p className="text-xs text-[#FFF8EA]/80 font-sans line-clamp-2">বিবরণ...</p>
  </div>
</Link>
```

---
*Created for Agomoni (আগমনী) Cultural Platform • 2026*
