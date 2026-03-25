/* =========================================================
   Amore Cake – main.js
   ========================================================= */
'use strict';

/* ---------- Product Data ---------- */
const PRODUCTS = [
  {
    id: 1,
    name: 'Classic Chocolate Fudge Cake',
    desc: 'Rich, moist chocolate sponge with silky fudge frosting. A timeless favourite.',
    price: 799,
    originalPrice: 999,
    emoji: '🍫',
    category: 'birthday',
    rating: 4.9,
    reviews: 128,
    badge: 'bestseller',
    featured: true,
  },
  {
    id: 2,
    name: 'Strawberry Dream Cake',
    desc: 'Layers of vanilla sponge, fresh strawberries, and whipped cream.',
    price: 849,
    originalPrice: null,
    emoji: '🍓',
    category: 'birthday',
    rating: 4.8,
    reviews: 94,
    badge: 'new',
    featured: true,
  },
  {
    id: 3,
    name: 'Elegant Wedding Tier',
    desc: 'A stunning 3-tier white almond cake with delicate fondant florals.',
    price: 4999,
    originalPrice: null,
    emoji: '💍',
    category: 'wedding',
    rating: 5.0,
    reviews: 42,
    badge: null,
    featured: true,
  },
  {
    id: 4,
    name: 'Red Velvet Cupcakes (12 pcs)',
    desc: 'Velvety, tangy cupcakes topped with luscious cream-cheese frosting.',
    price: 599,
    originalPrice: 699,
    emoji: '🧁',
    category: 'cupcakes',
    rating: 4.9,
    reviews: 215,
    badge: 'bestseller',
    featured: true,
  },
  {
    id: 5,
    name: 'Lemon Blueberry Pound Cake',
    desc: 'Zesty lemon sponge studded with fresh blueberries. Light and refreshing.',
    price: 749,
    originalPrice: null,
    emoji: '🍋',
    category: 'pastries',
    rating: 4.7,
    reviews: 67,
    badge: null,
    featured: true,
  },
  {
    id: 6,
    name: 'Vegan Coconut Mango Cake',
    desc: 'Plant-based tropical delight with coconut cream and fresh mango coulis.',
    price: 899,
    originalPrice: null,
    emoji: '🥥',
    category: 'vegan',
    rating: 4.8,
    reviews: 51,
    badge: 'vegan',
    featured: false,
  },
  {
    id: 7,
    name: 'Black Forest Gateau',
    desc: 'Classic German-inspired cake: cherries, dark chocolate, and kirsch cream.',
    price: 899,
    originalPrice: 1099,
    emoji: '🍒',
    category: 'birthday',
    rating: 4.9,
    reviews: 102,
    badge: 'bestseller',
    featured: false,
  },
  {
    id: 8,
    name: 'Salted Caramel Tart',
    desc: 'Buttery pastry shell filled with smooth salted caramel and topped with fleur de sel.',
    price: 499,
    originalPrice: null,
    emoji: '🥧',
    category: 'pastries',
    rating: 4.7,
    reviews: 88,
    badge: null,
    featured: false,
  },
  {
    id: 9,
    name: 'Matcha White Chocolate Cake',
    desc: 'Japanese matcha sponge with white chocolate ganache — subtle and sophisticated.',
    price: 979,
    originalPrice: null,
    emoji: '🍵',
    category: 'birthday',
    rating: 4.8,
    reviews: 39,
    badge: 'new',
    featured: false,
  },
  {
    id: 10,
    name: 'Buttercream Rose Cupcakes (6 pcs)',
    desc: 'Hand-piped rose-shaped vanilla buttercream on moist vanilla cupcakes.',
    price: 399,
    originalPrice: null,
    emoji: '🌹',
    category: 'cupcakes',
    rating: 5.0,
    reviews: 73,
    badge: null,
    featured: false,
  },
  {
    id: 11,
    name: 'Vegan Chocolate Avocado Cake',
    desc: 'Surprisingly decadent: avocado-based chocolate ganache on rich cocoa sponge.',
    price: 849,
    originalPrice: null,
    emoji: '🥑',
    category: 'vegan',
    rating: 4.6,
    reviews: 29,
    badge: 'vegan',
    featured: false,
  },
  {
    id: 12,
    name: 'Butterscotch Drip Cake',
    desc: 'Golden butterscotch drip cake crowned with praline crunch and caramel shards.',
    price: 1099,
    originalPrice: 1299,
    emoji: '🍯',
    category: 'birthday',
    rating: 4.9,
    reviews: 88,
    badge: 'bestseller',
    featured: false,
  },
];

/* ---------- Cart State ---------- */
let cart = JSON.parse(localStorage.getItem('amoreCart') || '[]');

function saveCart() {
  localStorage.setItem('amoreCart', JSON.stringify(cart));
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/* ---------- Cart DOM ---------- */
function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const footerEl = document.getElementById('cart-footer');
  const subtotalEl = document.getElementById('cart-subtotal');

  if (countEl) {
    const n = cartCount();
    countEl.textContent = n;
    countEl.style.display = n > 0 ? 'flex' : 'none';
  }

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty 🍰</p>';
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'block';
  if (subtotalEl) subtotalEl.textContent = '₹' + cartTotal().toLocaleString('en-IN');

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.name}">✕</button>
    </div>
  `).join('');

  /* Bind qty + remove buttons */
  itemsEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;
      const idx = cart.findIndex(i => i.id === id);
      if (idx < 0) return;
      if (action === 'inc') {
        cart[idx].qty += 1;
      } else {
        cart[idx].qty -= 1;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
      }
      saveCart();
      updateCartUI();
    });
  });

  itemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      cart = cart.filter(i => i.id !== id);
      saveCart();
      updateCartUI();
      showToast('Item removed from cart');
    });
  });
}

function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast('🛒 Added to cart!', 'success');
}

/* ---------- Cart Drawer Toggle ---------- */
function initCartDrawer() {
  const drawer  = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const toggles = document.querySelectorAll('.cart-toggle');
  const close   = document.getElementById('cart-close');

  function openCart() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggles.forEach(t => t.addEventListener('click', openCart));
  if (close)   close.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });
}

/* ---------- Product Card Factory ---------- */
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('data-category', product.category);

  const badgeHTML = product.badge
    ? `<div class="product-badge badge-${product.badge}">${product.badge}</div>`
    : '';

  const originalPriceHTML = product.originalPrice
    ? `<s>₹${product.originalPrice.toLocaleString('en-IN')}</s>`
    : '';

  const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');

  card.innerHTML = `
    ${badgeHTML}
    <div class="product-img-wrap" style="background: linear-gradient(135deg, var(--color-primary-l), #fff);">
      <span class="product-emoji">${product.emoji}</span>
      <div class="product-overlay"></div>
    </div>
    <div class="product-body">
      <div class="product-category">${product.category}</div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.desc}</p>
      <div class="product-rating">
        <span class="stars">${stars}</span>
        <span class="rating-count">(${product.reviews})</span>
      </div>
      <div class="product-footer">
        <div class="product-price">
          <strong>₹${product.price.toLocaleString('en-IN')}</strong>
          ${originalPriceHTML}
        </div>
        <button class="btn-add-cart" aria-label="Add ${product.name} to cart">Add to Cart</button>
      </div>
    </div>
  `;

  card.querySelector('.btn-add-cart').addEventListener('click', () => addToCart(product));
  return card;
}

/* ---------- Render Featured Products (index.html) ---------- */
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const featured = PRODUCTS.filter(p => p.featured);
  grid.innerHTML = '';
  featured.forEach(p => grid.appendChild(createProductCard(p)));
}

/* ---------- Render All Products (products.html) ---------- */
let currentFilter = 'all';
let currentSort   = 'featured';

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  let list = [...PRODUCTS];

  /* Filter */
  if (currentFilter !== 'all') {
    list = list.filter(p => p.category === currentFilter);
  }

  /* Sort */
  if (currentSort === 'price-asc')  list.sort((a, b) => a.price - b.price);
  if (currentSort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (currentSort === 'rating')     list.sort((a, b) => b.rating - a.rating);

  grid.innerHTML = '';
  const noResults = document.getElementById('no-results');

  if (list.length === 0) {
    if (noResults) noResults.style.display = 'block';
    return;
  }
  if (noResults) noResults.style.display = 'none';
  list.forEach(p => grid.appendChild(createProductCard(p)));
}

function initProductFilters() {
  /* Read URL param for initial category */
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) currentFilter = cat;

  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    if (tab.dataset.filter === currentFilter) {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    }
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderProducts();
    });
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderProducts();
    });
  }

  renderProducts();
}

/* ---------- Testimonials Carousel ---------- */
function initCarousel() {
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
  let perView = getPerView();
  const total = cards.length;

  function getPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function maxSlide() {
    return Math.max(0, total - perView);
  }

  /* Build dots */
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxSlide(); i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxSlide()));
    const firstCard = track.querySelector('.testimonial-card');
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const cardWidth = firstCard.offsetWidth + gap;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    updateDots();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  /* Auto-play */
  let autoplay = setInterval(() => goTo(current < maxSlide() ? current + 1 : 0), 4000);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.parentElement.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current < maxSlide() ? current + 1 : 0), 4000);
  });

  /* Recalculate on resize */
  window.addEventListener('resize', () => {
    const newPerView = getPerView();
    if (newPerView !== perView) {
      perView = newPerView;
      current = 0;
      goTo(0);
    }
  });
}

/* ---------- Header Scroll Effect ---------- */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ---------- Mobile Nav ---------- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (!hamburger || !nav) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  /* Close on link click */
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

/* ---------- Toast Notification ---------- */
let toastTimer;
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ---------- Newsletter Form ---------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    if (email) {
      form.querySelector('input[type="email"]').value = '';
      showToast('🎉 You\'re subscribed! Welcome to the sweet side.', 'success');
    }
  });
}

/* ---------- Custom Order Form ---------- */
function initCustomOrderForm() {
  const form = document.getElementById('custom-order-form');
  if (!form) return;

  /* Set min date to today */
  const dateInput = form.querySelector('#co-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✅ Your custom order request has been submitted! We\'ll call you within 24 hours.', 'success');
    form.reset();
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✅ Message sent! We\'ll get back to you within 1 business day.', 'success');
    form.reset();
  });
}

/* ---------- Scroll-Reveal Animation ---------- */
function initScrollReveal() {
  const els = document.querySelectorAll(
    '.product-card, .category-card, .why-card, .team-card, .value-item, .testimonial-card'
  );
  if (!els.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
    observer.observe(el);
  });
}

/* ---------- Handle #custom hash on products page ---------- */
function handleHash() {
  if (window.location.hash === '#custom') {
    const section = document.getElementById('custom');
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  /* Shared across all pages */
  initHeaderScroll();
  initMobileNav();
  initCartDrawer();
  updateCartUI();
  initScrollReveal();

  /* Homepage */
  renderFeatured();
  initCarousel();
  initNewsletterForm();

  /* Products page */
  initProductFilters();

  /* About page */
  initContactForm();

  /* Products page – custom order */
  initCustomOrderForm();

  /* Handle hash scrolling */
  handleHash();
});
