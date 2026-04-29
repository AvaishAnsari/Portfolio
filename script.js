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
    card.innerHTML = `<iframe width="100%" height="100%" style="aspect-ratio:16/9; border:none;" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>`;
    card.style.padding = '0'; // Remove padding if any to make iframe fill the card
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

// ── Theme Toggle ──
const themeToggleBtn = document.getElementById('theme-toggle');

function updateGitHubStatsTheme(isLight) {
  const ghStats = document.getElementById('gh-stats');
  const ghLangs = document.getElementById('gh-langs');
  if (ghStats) {
    ghStats.src = isLight 
      ? "https://github-readme-stats.vercel.app/api?username=AvaishAnsari&show_icons=true&theme=default&hide_border=true&bg_color=f8fafc&title_color=0f172a&icon_color=3b82f6&text_color=475569"
      : "https://github-readme-stats.vercel.app/api?username=AvaishAnsari&show_icons=true&theme=radical&hide_border=true&bg_color=050508&title_color=00ffff&icon_color=ff00ff&text_color=e2e8f0";
  }
  if (ghLangs) {
    ghLangs.src = isLight
      ? "https://github-readme-stats.vercel.app/api/top-langs/?username=AvaishAnsari&layout=compact&theme=default&hide_border=true&bg_color=f8fafc&title_color=0f172a&text_color=475569"
      : "https://github-readme-stats.vercel.app/api/top-langs/?username=AvaishAnsari&layout=compact&theme=radical&hide_border=true&bg_color=050508&title_color=00ffff&text_color=e2e8f0";
  }
}

if (themeToggleBtn) {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggleBtn.textContent = '🌙';
    updateGitHubStatsTheme(true);
  } else {
    updateGitHubStatsTheme(false);
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    
    if (isLight) {
      themeToggleBtn.textContent = '🌙';
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      themeToggleBtn.textContent = '🌞';
      localStorage.setItem('portfolio-theme', 'dark');
    }
    updateGitHubStatsTheme(isLight);
  });
}

// ── Project Modal Logic ──
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.modal .close');

if (modal && modalBody && closeModal) {
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modalBody.innerHTML = `
        <h3 style="margin-bottom:1rem;">Project Demo</h3>
        <div style="background:rgba(0,0,0,0.5); width:100%; height:250px; display:flex; align-items:center; justify-content:center; border:1px dashed var(--neon-mag); border-radius:10px;">
          <p style="color:#9ca3af;">Demo Video / GIF Placeholder<br/><span style="font-size:0.8rem;">(Replace this block with an iframe or img tag)</span></p>
        </div>
      `;
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalBody.innerHTML = '';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modalBody.innerHTML = '';
    }
  });
}
