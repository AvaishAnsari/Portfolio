// ── Preloader ──
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) setTimeout(() => preloader.classList.add('hidden'), 600);
});

// ── Scroll Progress ──
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (!scrollProgress) return;
  const top = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  scrollProgress.style.width = ((top / height) * 100) + '%';
});

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if (cursor && follower) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .proj-card, .video-card, .cert-card, .achieve-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
  });
}

// ── Typing Animation ──
const typingEl = document.querySelector('.typing');
const phrases = [
  'Full-Stack Developer.',
  'CS Student @ SIT.',
  'Content Creator.',
  'Problem Solver.',
  'Building the Future.'
];
let pIdx = 0, cIdx = 0;
function typeText() {
  if (!typingEl) return;
  if (cIdx < phrases[pIdx].length) {
    typingEl.textContent += phrases[pIdx][cIdx++];
    setTimeout(typeText, 120);
  } else {
    setTimeout(eraseText, 2000);
  }
}
function eraseText() {
  if (!typingEl) return;
  if (cIdx > 0) {
    typingEl.textContent = phrases[pIdx].substring(0, --cIdx);
    setTimeout(eraseText, 70);
  } else {
    pIdx = (pIdx + 1) % phrases.length;
    setTimeout(typeText, 300);
  }
}
if (typingEl) typeText();

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.animate').forEach(el => revealObserver.observe(el));

// ── 3D Card Tilt ──
document.querySelectorAll('.proj-card, .cert-card, .achieve-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -10;
    const ry = ((x - r.width  / 2) / r.width)  * 10;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    card.style.transition = 'transform .1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    card.style.transition = 'transform .5s ease';
  });
});

// ── YouTube Lazy Load ──
document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    card.innerHTML = `<iframe width="100%" height="220" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>`;
  });
});

// ── Contact Form ──
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent('Portfolio Contact – ' + name);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:avaishansari789@gmail.com?subject=${subject}&body=${body}`;
  });
}

// ── Vanta.js Hero Background ──
document.addEventListener('DOMContentLoaded', () => {
  if (window.VANTA) {
    window.VANTA.NET({
      el: '#hero',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200, minWidth: 200,
      scale: 1.0, scaleMobile: 1.0,
      color: 0x00ffff,
      backgroundColor: 0x050508,
      points: 10, maxDistance: 20, spacing: 18
    });
  }
});

// ── Active Nav Link on Scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--neon-cyan)' : '';
  });
});
