/* ============================================================
   Amore Cake – Theme JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- Helpers ---- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

  /* ================================================================
     Header: scroll shadow + announcement bar offset
  ================================================================ */
  function initHeader() {
    const header = $('.site-header');
    if (!header) return;

    const bar = $('.announcement-bar');
    if (bar) {
      const barH = bar.offsetHeight;
      document.documentElement.style.setProperty('--announcement-height', barH + 'px');
      header.style.top = barH + 'px';
    }

    on(window, 'scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* ================================================================
     Mobile Menu Toggle
  ================================================================ */
  function initMobileMenu() {
    const btn = $('.mobile-menu-btn');
    const nav = $('.mobile-nav');
    if (!btn || !nav) return;

    on(btn, 'click', () => {
      const open = btn.classList.toggle('active');
      nav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    $$('a', nav).forEach(link => {
      on(link, 'click', () => {
        btn.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside tap
    on(document, 'click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) {
        btn.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ================================================================
     Product Gallery (thumbnails)
  ================================================================ */
  function initProductGallery() {
    const thumbs = $$('.product-gallery__thumb');
    const main = $('.product-gallery__main img');
    if (!thumbs.length || !main) return;

    thumbs.forEach(thumb => {
      on(thumb, 'click', () => {
        const src = thumb.querySelector('img')?.src;
        if (src) {
          main.style.opacity = '0';
          setTimeout(() => {
            main.src = src;
            main.style.opacity = '1';
          }, 200);
        }
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    main.style.transition = 'opacity 0.2s ease';
  }

  /* ================================================================
     Quantity Selector
  ================================================================ */
  function initQuantitySelectors() {
    $$('.quantity-selector').forEach(sel => {
      const input = $('input.qty-input', sel);
      const minusBtn = $('.qty-btn[data-action="minus"]', sel);
      const plusBtn = $('.qty-btn[data-action="plus"]', sel);
      if (!input) return;

      const min = parseInt(input.min || '1', 10);
      const max = parseInt(input.max || '99', 10);

      on(minusBtn, 'click', () => {
        const val = parseInt(input.value, 10);
        if (val > min) { input.value = val - 1; input.dispatchEvent(new Event('change')); }
      });

      on(plusBtn, 'click', () => {
        const val = parseInt(input.value, 10);
        if (val < max) { input.value = val + 1; input.dispatchEvent(new Event('change')); }
      });

      on(input, 'change', () => {
        let val = parseInt(input.value, 10);
        if (isNaN(val) || val < min) val = min;
        if (val > max) val = max;
        input.value = val;
      });
    });
  }

  /* ================================================================
     Size / Flavour Option Selectors
  ================================================================ */
  function initOptionSelectors() {
    $$('.size-options').forEach(group => {
      $$('.size-btn', group).forEach(btn => {
        on(btn, 'click', () => {
          $$('.size-btn', group).forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
        });
      });
    });
  }

  /* ================================================================
     Add to Cart (simulated for theme demo)
  ================================================================ */
  function initAddToCart() {
    $$('[data-action="add-to-cart"]').forEach(btn => {
      on(btn, 'click', function () {
        const originalHTML = this.innerHTML;
        this.innerHTML = '<span class="spinner"></span> Adding…';
        this.disabled = true;

        setTimeout(() => {
          this.innerHTML = '✓ Added to Cart';
          this.style.backgroundColor = 'var(--color-success)';
          updateCartCount(1);
          showToast('🎂 Added to cart!', 'success');

          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.disabled = false;
            this.style.backgroundColor = '';
          }, 2000);
        }, 800);
      });
    });
  }

  /* ================================================================
     Cart Count Badge
  ================================================================ */
  function updateCartCount(delta) {
    const badge = $('.cart-count');
    if (!badge) return;
    const current = parseInt(badge.textContent || '0', 10);
    badge.textContent = current + delta;
    badge.style.display = 'flex';
  }

  /* ================================================================
     Toast Notifications
  ================================================================ */
  function showToast(message, type = 'success') {
    let container = $('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => toast.remove(), 3200);
  }

  /* ================================================================
     Newsletter Form
  ================================================================ */
  function initNewsletterForm() {
    const form = $('.newsletter-form');
    if (!form) return;

    on(form, 'submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const email = input?.value.trim();
      if (!email) return;

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn?.textContent;
      if (btn) btn.textContent = 'Subscribing…';

      setTimeout(() => {
        showToast('🎉 Thank you for subscribing!', 'success');
        if (input) input.value = '';
        if (btn) btn.textContent = originalText;
      }, 800);
    });
  }

  /* ================================================================
     Scroll Reveal (simple Intersection Observer)
  ================================================================ */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const els = $$('[data-reveal]');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  /* ================================================================
     Sticky product buy bar on product page
  ================================================================ */
  function initStickyBuyBar() {
    const bar = $('.product-sticky-bar');
    const trigger = $('.product-actions');
    if (!bar || !trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        bar.classList.toggle('visible', !entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(trigger);
  }

  /* ================================================================
     Announcement bar close
  ================================================================ */
  function initAnnouncementBar() {
    const closeBtn = $('.announcement-bar__close');
    const bar = $('.announcement-bar');
    if (!closeBtn || !bar) return;

    on(closeBtn, 'click', () => {
      bar.style.height = bar.offsetHeight + 'px';
      requestAnimationFrame(() => {
        bar.style.transition = 'height 0.3s ease, opacity 0.3s ease';
        bar.style.height = '0';
        bar.style.opacity = '0';
        bar.style.overflow = 'hidden';
        const header = $('.site-header');
        if (header) header.style.top = '0';
        document.documentElement.style.setProperty('--announcement-height', '0px');
      });
      setTimeout(() => bar.remove(), 350);
    });
  }

  /* ================================================================
     Collection filter toggle (mobile)
  ================================================================ */
  function initFilterToggle() {
    const btn = $('.filter-toggle-btn');
    const panel = $('.filter-panel');
    if (!btn || !panel) return;

    on(btn, 'click', () => {
      panel.classList.toggle('open');
    });
  }

  /* ================================================================
     Wishlist toggle (UI only for demo)
  ================================================================ */
  function initWishlist() {
    $$('[data-action="wishlist"]').forEach(btn => {
      on(btn, 'click', function () {
        const active = this.classList.toggle('active');
        this.textContent = active ? '♥' : '♡';
        showToast(active ? '♥ Added to wishlist' : 'Removed from wishlist', 'success');
      });
    });
  }

  /* ================================================================
     Active nav link highlighting
  ================================================================ */
  function highlightActiveNav() {
    const path = window.location.pathname;
    $$('.nav-links a').forEach(link => {
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      }
    });
  }

  /* ================================================================
     Init all
  ================================================================ */
  function init() {
    initHeader();
    initMobileMenu();
    initProductGallery();
    initQuantitySelectors();
    initOptionSelectors();
    initAddToCart();
    initNewsletterForm();
    initScrollReveal();
    initStickyBuyBar();
    initAnnouncementBar();
    initFilterToggle();
    initWishlist();
    highlightActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
