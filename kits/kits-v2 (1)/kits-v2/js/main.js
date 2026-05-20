'use strict';

/* ── NAVBAR SCROLL ───────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── MOBILE DRAWER ───────────────────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const drawer    = document.getElementById('mobileDrawer');
const drawerClose = document.querySelector('.drawer-close');

function openDrawer() {
  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
}
function closeDrawer() {
  drawer.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── COUNTER ANIMATION ───────────────────────────────────── */
function runCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const dur    = 1800;
  const step   = 16;
  const inc    = target / (dur / step);
  let cur      = 0;
  const t = setInterval(() => {
    cur += inc;
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = Math.floor(cur) + suffix;
  }, step);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      runCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

/* ── SMOOTH SCROLL ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id  = a.getAttribute('href');
    const tgt = document.querySelector(id);
    if (!tgt) return;
    e.preventDefault();
    tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── KINETIC TITLE HOVER ─────────────────────────────────── */
// Magnetic effect on CTA buttons
document.querySelectorAll('.btn-primary, .btn-white').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    btn.style.transform = `translate(${dx * .08}px, ${dy * .12}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ── PARALLAX HERO IMAGE ─────────────────────────────────── */
const heroBg = document.querySelector('.hero-bg-img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `scale(1.05) translateY(${y * .25}px)`;
    }
  }, { passive: true });
}

/* ── SERVICE CARD 3D TILT ────────────────────────────────── */
document.querySelectorAll('.svc-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - .5;
    const y  = (e.clientY - r.top ) / r.height - .5;
    card.style.transform = `translateY(-10px) rotateX(${-y*5}deg) rotateY(${x*5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1), border-color .4s, box-shadow .4s';
    setTimeout(() => { card.style.transition = ''; }, 520);
  });
});

/* ── TICKER PAUSE ON HOVER ───────────────────────────────── */
const track = document.querySelector('.ticker-track');
const trackWrap = document.querySelector('.ticker-track-wrap');
trackWrap?.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
trackWrap?.addEventListener('mouseleave', () => track.style.animationPlayState = '');

/* ── PROCESS STEP ACTIVATE ───────────────────────────────── */
const procSteps = document.querySelectorAll('.proc-step');
const procObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('active');
  });
}, { threshold: 0.5 });
procSteps.forEach(s => procObs.observe(s));

/* ── INDUSTRY CARD PARALLAX ──────────────────────────────── */
document.querySelectorAll('.ind-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - .5;
    const y  = (e.clientY - r.top ) / r.height - .5;
    const img = card.querySelector('img');
    if (img) img.style.transform = `scale(1.1) translate(${x*12}px, ${y*12}px)`;
  });
  card.addEventListener('mouseleave', () => {
    const img = card.querySelector('img');
    if (img) { img.style.transform = ''; }
  });
});

/* ── ACTIVE NAV HIGHLIGHT ────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
const secObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-list a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--blue)';
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => secObs.observe(s));

/* ── RIPPLE ON BUTTON CLICK ──────────────────────────────── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r = this.getBoundingClientRect();
    const span = document.createElement('span');
    span.style.cssText = `
      position:absolute;border-radius:50%;
      width:6px;height:6px;
      left:${e.clientX-r.left}px;top:${e.clientY-r.top}px;
      background:rgba(255,255,255,.35);
      transform:scale(0);animation:ripple .6s linear forwards;
      pointer-events:none;
    `;
    if (!document.getElementById('ripple-style')) {
      const s = document.createElement('style');
      s.id = 'ripple-style';
      s.textContent = '@keyframes ripple{to{transform:scale(100);opacity:0}}';
      document.head.appendChild(s);
    }
    this.appendChild(span);
    setTimeout(() => span.remove(), 650);
  });
});