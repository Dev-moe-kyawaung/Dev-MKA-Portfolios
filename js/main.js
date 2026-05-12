/**
 * Dev-MKA-Portfolios — main.js
 * Moe Kyaw Aung · github.com/dev-moe-kyawaung
 */

/* ─── Contribution Graph ─────────────────────────── */
function buildContribGraph() {
  const grid = document.getElementById('contrib-grid');
  if (!grid) return;
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 52 * 7; i++) {
    const cell = document.createElement('div');
    cell.className = 'gh-cell';
    const r = Math.random();
    cell.style.background =
      r < 0.40 ? colors[0] :
      r < 0.60 ? colors[1] :
      r < 0.75 ? colors[2] :
      r < 0.90 ? colors[3] : colors[4];
    const count = Math.floor(Math.random() * 12);
    cell.title = count === 0 ? 'No contributions' : `${count} contribution${count > 1 ? 's' : ''}`;
    fragment.appendChild(cell);
  }
  grid.appendChild(fragment);
}

/* ─── Scroll Fade-In ─────────────────────────────── */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => observer.observe(el));
}

/* ─── Active Nav Highlight ───────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('nav-active'));
        const active = document.querySelector(`.main-nav a[href="#${e.target.id}"]`);
        if (active) active.classList.add('nav-active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ─── Smooth scroll for older browsers ──────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ─── Boot ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildContribGraph();
  initScrollAnimations();
  initActiveNav();
  initSmoothScroll();
});
