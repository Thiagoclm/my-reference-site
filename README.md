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
- [ ] Implement category/tag system
- [ ] Create article listing page with filtering
- [ ] Build individual article template page

### Saint of the Day
- [ ] Create database/collection of saints with images and histories
- [ ] Implement dynamic saint selection (daily rotation)
- [ ] Add more saint entries (currently only example with Saint Joseph)
- [ ] Create saint detail pages

### Search & Discovery
- ✅ Implement Pagefind integration for full-text search
- [ ] Add search results page
- [ ] Create archive by date/month
- [ ] Build topic/category browsing pages

### Pages to Create
- [ ] About page (/sobre)
- [ ] Contact page (/contato)
- [ ] Articles listing page (/artigos)
- [ ] Resources listing page (/recursos)
- [ ] Privacy policy page
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
- [ ] Reading time calculation for articles
- [ ] Table of contents for long articles
- [ ] Related articles suggestions
- [ ] RSS feed for articles/reflections
- [ ] Testimonials section with rotating quotes
- [ ] Featured products/books section with links

### Design Enhancements
- [ ] Dark mode toggle (already dark by default, but add light mode option)
- [ ] Mobile menu hamburger for navigation
- [ ] Image optimization and lazy loading
- [ ] Breadcrumb navigation
- [ ] Smooth scroll animations
- [ ] Loading skeletons for content

### SEO & Analytics
- [ ] Add Open Graph meta tags for social sharing
- [ ] Implement sitemap generation
- [ ] Add Google Analytics or alternative
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
├── layouts/
│   └── Base.astro
├── pages/
│   ├── index.astro
│   └── recurso/
│       └── [slug].astro
├── styles/
│   └── global.css
└── env.d.ts

content/
├── artigos/
├── recursos/
│   └── livros/
│       └── exemplo-livro.md
├── reflexoes/
├── videos/
└── podcasts/

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

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Spirituality Note

Katholikos is dedicated to proclaiming Christ in culture through shared Catholic wisdom, spiritual resources, and devotional content.

---

**Last Updated:** February 15, 2026
