# Katholikos

A Catholic curated content website built with Astro, featuring articles, books, resources, and daily saint reflections.

## 📋 Project Overview

Katholikos is a dark-themed Catholic reference site similar to wordonfire.org, designed to share spiritual content, book recommendations, and daily reflections on the lives of saints.

## 🎨 Features Implemented

- ✅ Dark theme (black background with light text)
- ✅ Responsive navigation bar
- ✅ Hero section with featured image
- ✅ Featured content grid (3 columns)
- ✅ "Santo do Dia" (Saint of the Day) section with image attribution
- ✅ Latest publications section with summaries
- ✅ Newsletter subscription section
- ✅ Rich footer with multiple columns
- ✅ Call-to-action sections
- ✅ Tailwind CSS styling
- ✅ High contrast colors for readability

## 📝 TODO List

### Content Management
- [ ] Create content folder structure for articles, reflections, videos, podcasts
- [ ] Set up markdown frontmatter schema for articles (title, author, date, tags, featured)
- [x] Implement category/tag system
- [x] Create article listing page with filtering
- [x] Build individual article template page

### Saint of the Day
- [x] Create database/collection of saints with images and histories
- [x] Implement dynamic saint selection (daily rotation)
- [ ] Add more saint entries (currently only example with Saint Joseph)
- [x] Create saint detail pages

### Search & Discovery
- ✅ Implement Pagefind integration for full-text search
- [ ] Add search results page
- [ ] Create archive by date/month
- [x] Build topic/category browsing pages

### Pages to Create
- [ ] About page (/sobre)
- [ ] Contact page (/contato)
- ✅ Articles listing page (/artigos)
- [ ] Resources listing page (/recursos)
- [x] Privacy policy page
- [ ] Terms and conditions page

## 🚀 Content Backlog

### Phase 1: Foundations (Patristics & Philosophy)
- [ ] Article: St. Augustine and the "Seminal Reasons" (Early evolution concepts).
- [ ] Deep Dive: The Principle of Non-Contradiction in Faith and Science.
- [ ] Video/Essay: Why the "Dark Ages" weren't scientifically dark.

### Phase 2: The Great Scientists
- [ ] Profile: Fr. Georges Lemaître and the Primeval Atom.
- [ ] Profile: Sister Mary Kenneth Keller (First woman to get a PhD in CS).
- [ ] Infographic: The 35+ Moon Craters named after Jesuit Scientists.

### Phase 3: Modern Frontiers
- [ ] Series: The Fine-Tuning of the Cosmos (The Anthropic Principle).
- [ ] Ethics: Catholic perspective on Neuralink and Brain-Machine Interfaces.
- [ ] Dialogue: Evolution, Adam and Eve, and Monogenism vs. Polygenism.

### Phase 4: Multimedia & Interactive
- [ ] Interactive Timeline: History of the Vatican Observatory.
- [ ] Podcast Guest List: Contemporary Catholic scientists (e.g., Karin Öberg, Stephen Barr).

### Features to Add
- [ ] Newsletter email integration (backend)
- [ ] Comment system for articles
- [ ] Social sharing buttons
- [x] Reading time calculation for articles
- [ ] Table of contents for long articles
- [ ] Related articles suggestions
- [ ] RSS feed for articles/reflections
- [ ] Testimonials section with rotating quotes
- [ ] Featured products/books section with links

### Design Enhancements
- [ ] Dark mode toggle (already dark by default, but add light mode option)
- [x] Mobile menu hamburger for navigation
- [ ] Image optimization and lazy loading
- [x] Breadcrumb navigation
- [x] Smooth scroll animations
- [ ] Loading skeletons for content

### SEO & Analytics
- [x] Add Open Graph meta tags for social sharing
- [ ] Implement sitemap generation
- [x] Add Google Analytics or alternative
- [ ] Optimize meta descriptions per page
- [ ] Create robots.txt

### Performance
- [ ] Image compression and optimization
- [ ] CSS minification and optimization
- [ ] Build size analysis
- [ ] Core Web Vitals optimization
- [ ] Caching strategy

### Deployment
- [ ] Set up GitHub repository
- [ ] Configure GitHub Pages (already referenced in astro.config)
- [ ] Set up CI/CD pipeline
- [ ] Domain configuration
- [ ] SSL certificate setup

### Content Integration
- [ ] Load featured items from markdown files instead of hardcoded
- [ ] Load latest items dynamically
- [ ] Load saint of the day from collection
- [ ] Create example articles and resources

## 🛠️ Tech Stack

- **Framework**: Astro 4.x
- **Styling**: Tailwind CSS 3.x
- **Search**: Pagefind
- **Language**: TypeScript, HTML, CSS
- **Fonts**: Playfair Display (serif), Inter (sans-serif)

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── FeaturedSection.astro
│   ├── LatestSection.astro
│   ├── NewsletterSection.astro
│   ├── SaintOfTheDay.astro
│   └── CardResource.astro
├── data/
│   ├── articles.ts
│   └── saints.ts
├── layouts/
│   └── Base.astro
├── lib/
│   └── content-browse.ts
├── pages/
│   ├── artigos/
│   │   ├── index.astro
│   │   └── santo-alberto-magno.astro
│   ├── categorias/
│   │   ├── [categoria].astro
│   │   └── index.astro
│   ├── index.astro
│   ├── livros/
│   │   ├── catholicism.astro
│   │   ├── imitacao-de-cristo.astro
│   │   └── index.astro
│   ├── missao.astro
│   ├── palavra-do-dia.astro
│   ├── privacidade.astro
│   └── recurso/
│       └── [slug].astro
│   └── santos/
│       ├── [month]/
│       │   └── [day].astro
│       └── index.astro
├── styles/
│   └── global.css
└── env.d.ts

content/
├── .gitkeep
├── recursos/
│   └── livros/

public/
└── assets/
    ├── cover-example.jpg
    └── saint-joseph.jpg
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The dev server runs at `http://localhost:3000` and hot-reloads on file changes.

Production search indexing is generated with Pagefind using the `--site` option.

### Gregorian chant player

The site includes a global Gregorian chant selector with play/pause and saved preference.

The player starts with ready URL options so users can press play immediately.

It also includes a volume slider, and the selected volume is saved for next visits.

There is also a mute/unmute button, and this preference is persisted as well.

By default, chants play in sequence and loop through the full playlist continuously.

The selected URL is saved in `localStorage` and reused on next visits.

## 📊 Google Analytics (GA4)

This project is ready for GA4 and only loads analytics when an environment variable is set.
Tracking is blocked by default until the visitor accepts analytics in the consent banner.

1. Create a GA4 property in Google Analytics.
2. Copy your Measurement ID (format: `G-XXXXXXXXXX`).
3. Add it to your environment:

```bash
# .env
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

4. Rebuild/redeploy your site.

### Consent behavior
- Default: analytics denied.
- If user clicks **Aceitar**: analytics is enabled and page tracking starts.
- If user clicks **Recusar**: analytics remains disabled.
- Consent choice is stored in `localStorage` under `ga_consent_choice`.

You can view stats in GA4 under:
- **Reports > Realtime**
- **Reports > Acquisition**
- **Reports > Engagement > Pages and screens**

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Spirituality Note

Katholikos is dedicated to proclaiming Christ in culture through shared Catholic wisdom, spiritual resources, and devotional content.

---

**Last Updated:** February 21, 2026
