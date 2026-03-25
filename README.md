# 🍰 Amore Cake Website

A modern, fully-featured e-commerce website for **Amore Cake** — a local artisan bakery. Built with vanilla HTML, CSS, and JavaScript, inspired by Shopify's clean storefront patterns.

## 🌟 Features

- **Responsive Design** — Works beautifully on desktop, tablet, and mobile
- **Shopping Cart** — Slide-out cart drawer with add/remove/quantity controls; persisted in `localStorage`
- **Product Catalogue** — 12 handcrafted cake products with category filtering and sort options
- **Custom Order Form** — Bespoke cake request form with occasion, flavour, and date fields
- **Testimonials Carousel** — Auto-playing, touch-friendly customer reviews
- **Newsletter Signup** — Email subscription with toast feedback
- **Contact Form** — Full contact page with business info
- **Scroll-Reveal Animations** — Subtle entrance animations using `IntersectionObserver`
- **Toast Notifications** — Non-intrusive feedback for cart and form actions
- **Sticky Header** — With scroll shadow and mobile hamburger menu

## 📁 Structure

```
amore-cake-website/
├── index.html        # Homepage (hero, categories, featured products, testimonials)
├── products.html     # Full catalogue with filtering/sorting + custom order form
├── about.html        # Our story, team, values, and contact form
├── css/
│   └── style.css     # Complete stylesheet (CSS custom properties, responsive)
└── js/
    └── main.js       # All interactivity (cart, filters, carousel, forms)
```

## 🚀 Getting Started

Simply open `index.html` in any modern browser — no build tools or dependencies required.

## 🛠 Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks or libraries

## 🔮 Shopify Migration

This website is structured to be easily migrated to Shopify:
- Product data in `js/main.js` maps directly to Shopify product objects
- The cart logic mirrors Shopify's AJAX Cart API pattern
- Page layouts match standard Shopify theme sections
