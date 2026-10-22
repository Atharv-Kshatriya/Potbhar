---
name: Potbhar
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#59413a'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#8d7168'
  outline-variant: '#e1bfb5'
  surface-tint: '#ac3400'
  primary: '#9b2f00'
  on-primary: '#ffffff'
  primary-container: '#c2410c'
  on-primary-container: '#ffece7'
  inverse-primary: '#ffb59d'
  secondary: '#006d30'
  on-secondary: '#ffffff'
  secondary-container: '#92f5a4'
  on-secondary-container: '#007233'
  tertiary: '#824500'
  on-tertiary: '#ffffff'
  tertiary-container: '#a65900'
  on-tertiary-container: '#ffede1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#95f8a7'
  secondary-fixed-dim: '#79db8d'
  on-secondary-fixed: '#00210a'
  on-secondary-fixed-variant: '#005323'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-xl:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a profound sense of human dignity, urgent compassion, and operational precision. It balances the cultural empathy of nourishment (*"Har Pet Bhare, Har Nivala Sambhale"*) with the logistical intelligence required for enterprise-scale food recovery and circular organic waste systems.

### Visual Archetype & Movement
The visual language operates at the intersection of **Warm Modern Humanitarianism** and **Ecological Data Tech**:
- **Generous Human Warmth:** Grounded in rich, earthy organic tones that reject cold, clinical logistics in favor of emotional gravity and communal solidarity.
- **Dignified Clarity:** Large, authoritative typography pairs with high-contrast text to ensure operational legibility in variable environments—from blazing sunlight in warehouse loading docks to dim community kitchens.
- **Tactile Reliability:** Surfaces feature micro-textures, warm-tinted neutral foundations, and generous organic radii (rounded-2xl) that evoke care, safety, and touchable reliability rather than sterile detachment.

### Target Audiences & Emotional Response
1. **Donors & Enterprise Food Handlers (Hotels, Caterers, Supermarkets):** Feel efficiency, rapid compliance, safety assurance, and pride in civic contribution.
2. **Volunteers & Field Logistics Teams:** Feel unblocked velocity, unambiguous task prioritization, and intuitive batch scanning.
3. **Recipient Organizations & Community Shelters:** Feel honored, treated with absolute dignity, and equipped with crystal-clear food safety data.

## Colors

The palette directly communicates urgency, wholesome food, and circular environmental sustainability. The design system runs primarily in **light mode** on warm, sunlit cream backgrounds to provide maximum readability and emotional optimism.

### Roles & Semantic Mapping
- **Primary (`#C2410C` Terracotta / Saffron):** Represents warm nourishment, immediate food recovery dispatch, and high-impact calls to action. Used for primary recovery actions, urgent claims, and pivotal metric callouts.
- **Secondary (`#15803D` Forest Green):** Represents environmental renewal, composting workflows, organic diversion metrics, and verified safe food states.
- **Tertiary (`#D97706` Amber Gold):** Signals time-sensitive food windows (e.g., "Must pick up within 90 minutes"), pending quality certifications, and transit updates.
- **Neutral Dark (`#1E293B` Slate Charcoal):** Provides high-contrast readability for headings, data tables, and high-density operational text.
- **Neutral Light (`#FDFBF7` Warm Cream / `#F8F5EE` Organic Sand):** The primary canvas and surface foundation, softening the starkness of pure white while reducing glare in outdoor collection scenarios.
- **Functional Semantics:**
  - **Critical Alert / Expiry Hazard:** `#DC2626` (Ruby Red) paired with `#FEF2F2`.
  - **Verification / Fresh Safe Badge:** `#15803D` on `#DCFCE7` (Soft Mint).
  - **Border Base:** `#E2DDD5` (Warm sand stone) ensuring soft contrast on cards without harsh gray lines.

## Typography

The pairing of **Outfit** and **Plus Jakarta Sans** bridges authoritative optimism with human warmth.

- **Display & Headings (Outfit):** Its geometric balance, open apertures, and subtle warmth prevent massive metric figures and campaign titles from feeling clinical. Used for stat tickers, hero statements, and food batch headlines.
- **Body & Operational Labels (Plus Jakarta Sans):** Crafted for extreme legibility at small sizes, its generous x-height and gentle roundness maintain comfort during heavy dispatch review, route logs, and donor manifests.
- **Responsive Handling:** Desktop headings scale smoothly down on screens under `768px` (`display-lg` to `display-lg-mobile`, `headline-xl` to `headline-xl-mobile`), preserving vertical density for field dispatch operations without sacrificing communicative punch.

## Layout & Spacing

The layout philosophy uses a **responsive fluid grid** built to support fast-moving operational interfaces alongside immersive impact narratives.

### Grid & Breakpoints
- **Desktop (≥ 1024px):** 12-column layout with `2.5rem` (`40px`) margins and `1.5rem` (`24px`) gutters. Optimizes for multi-column triage boards, GIS route mapping, and donation management views.
- **Tablet (768px - 1023px):** 8-column layout with `1.5rem` (`24px`) margins and `1rem` (`16px`) gutters.
- **Mobile (< 768px):** 4-column layout with `1rem` (`16px`) margins and `1rem` (`16px`) gutters. High vertical priority: critical batch acceptances, one-touch routing, and urgent dispatch alerts take full column spans (4/4).

### Spacing Principles
- **Macro Spacing (`space-xl`):** Separates autonomous operational contexts (e.g., active pickups vs. historical compost diversion tallies).
- **Component Spacing (`space-md`, `space-lg`):** Internal padding for recovery batch cards and dispatch forms.
- **Micro Spacing (`space-xs`, `space-sm`):** Links status pips, icons, countdown clocks, and verification badges directly to their corresponding data labels.

## Elevation & Depth

Visual hierarchy uses a **Warm Tonal Layering** system combined with soft, daylight-tinted ambient shadows. Avoid heavy black drop-shadows; all shadow envelopes carry an earthy umber undertone to preserve tactile authenticity.

### Depth Scales
- **Surface Ground (Level 0):** `#FDFBF7` (Canvas).
- **Surface Raised (Level 1 - Cards, Manifest Panels):** `#FFFFFF` bordered by a `1px` subtle stroke of `#E2DDD5`. Shadow: `0 2px 8px -2px rgba(60, 40, 20, 0.05)`.
- **Surface Interactive / Hover (Level 2 - Hovered Batch Cards, Active Filter Bars):** `#FFFFFF` with shadow: `0 8px 24px -4px rgba(60, 40, 20, 0.08)`.
- **Surface Floating / Drawer (Level 3 - Live Dispatch Sheets, Modals, Quick Claim Popups):** `#FFFFFF` with shadow: `0 16px 40px -6px rgba(45, 26, 12, 0.12)`.

### Sensory Touch
Overlays and action sheets leverage a low-blur frosted cream backplate (`rgba(253, 251, 247, 0.85)` with `backdrop-filter: blur(12px)`) maintaining spatial continuity with background maps and lists.

## Shapes

The design system adopts a **Rounded (`roundedness: 2`)** base shape profile, leaning into `rounded-2xl` (`1rem` / `16px`) for structural cards and surfaces to evoke nourishment, human gentleness, and organic natural forms.

### Geometric Rationale
- **Cards & Modal Containers:** Formed with `1rem` (`16px`) corner radiuses (`rounded-2xl`). This softens density-heavy tables and high-stress expiry timers.
- **Buttons & Action Controls:** Formed with `0.5rem` (`8px`) or fully pill-shaped (`9999px`) geometries for primary action chips, reinforcing quick tap targets for field drivers.
- **Status Indicators & Badges:** Fully circular (`rounded-full`) or soft-pill tokens for food verification tags and urgency timers.

## Components

### Buttons & CTAs
- **Primary Dispatch CTA:** Deep terracotta background (`#C2410C`), pure white text, bold weight (`label-lg`), `0.75rem 1.5rem` padding, `0.5rem` border radius. Active state scales subtly (`0.98`) with shadow: `0 4px 12px rgba(194, 65, 12, 0.3)`.
- **Eco / Compost Action:** Forest green (`#15803D`) background with white text for agricultural routing and composting transfers.
- **Secondary / Ghost Button:** Transparent background, `1.5px` border in `#E2DDD5`, text in Slate Charcoal (`#1E293B`). Hover fills with `#F8F5EE`.

### Cards & Batch Manifests
- **Food Recovery Batch Card:** Outer border of `1px solid #E2DDD5`, background `#FFFFFF`, rounded with `1rem` radius. Header contains a high-contrast time-left ticker (e.g., `"2 hrs left to recover"`), food type badge, and donor seal. Card body organizes total weight, meal equivalents, and verified temperature readings.
- **Compost Diversion Card:** Accented with a `3px` left-edge spine of `#15803D` indicating zero-waste valorization workflows.

### Chips & Verification Badges
- **Verified Fresh Tag:** Background `#DCFCE7`, text `#15803D`, accompanied by a micro shield/check SVG icon.
- **Urgent Expiry Tag:** Background `#FEF2F2`, text `#DC2626`, accompanied by an animated pulse dot.
- **Surplus Category Chips:** Pill-shaped (`rounded-full`), `#F8F5EE` fill, `#1E293B` text, `0.25rem 0.75rem` padding.

### Impact Stat Tickers
- Metric numbers rendered in `Outfit` (`display-lg` or `headline-xl`) in Terracotta (`#C2410C`) or Green (`#15803D`), accompanied by concise descriptive micro-labels below (e.g., *"4,250 Meals Rescued Today"*, *"18.4 Tons Diverted from Landfills"*).

### Form Inputs & Food Safety Checklists
- **Inputs:** Crisp `#FFFFFF` surface with `1.5px` border in `#E2DDD5`, `0.5rem` radius, `0.75rem 1rem` padding. Focus state switches border to `#C2410C` with a soft `0 0 0 3px rgba(194, 65, 12, 0.15)` glow.
- **Food Safety Verification Checkboxes:** `20px x 20px`, rounded with `4px` radius, checked fill of `#15803D`. Unchecked stroke in `#94A3B8`.

### Additional Domain Components
- **Perishable Freshness Gauge:** Segmented color-coded progress bar (Green → Amber → Red) illustrating transit freshness windows based on microbial degradation algorithms.
- **Route Handshake Card:** Clean, high-legibility QR code container with donor verification stamp and geofence-triggered sign-off confirmation.