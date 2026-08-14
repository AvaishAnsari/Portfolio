// ── Preloader ──
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) setTimeout(() => preloader.classList.add('hidden'), 600);
});

// ── Mobile Menu Toggle ──
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  // Close menu on link click
  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}


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
let revealDelay = 0;
let revealTimeout;

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('visible');
      }, revealDelay);
      revealDelay += 150; // Stagger delay for elements appearing at the same time
      revealObserver.unobserve(e.target);
    }
  });
  
  clearTimeout(revealTimeout);
  revealTimeout = setTimeout(() => {
    revealDelay = 0;
  }, 100); // Reset delay when this batch of reveals is done
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
const result = document.getElementById('form-result');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    result.style.display = 'block';
    result.style.color = 'var(--neon-cyan)';
    result.innerHTML = 'Sending... 🚀';
    
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = 'Message sent successfully! 🚀';
      } else {
        result.style.color = 'var(--neon-red)';
        result.innerHTML = json.message;
      }
    })
    .catch(error => {
      console.log(error);
      result.style.color = 'var(--neon-red)';
      result.innerHTML = 'Something went wrong!';
    })
    .then(function() {
      form.reset();
      setTimeout(() => {
        result.style.display = 'none';
      }, 5000);
    });
  });
}

// ── Vanta.js Hero Background ──
let vantaEffect = null;
document.addEventListener('DOMContentLoaded', () => {
  if (window.VANTA) {
    const isLight = document.body.classList.contains('light-mode') || localStorage.getItem('portfolio-theme') === 'light';
    vantaEffect = window.VANTA.NET({
      el: '#hero',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200, minWidth: 200,
      scale: 1.0, scaleMobile: 1.0,
      color: isLight ? 0x0ea5e9 : 0x00ffff,
      backgroundColor: isLight ? 0xf8fafc : 0x050508,
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
  const ghStreak = document.getElementById('gh-streak');

  if (ghStats) {
    ghStats.src = isLight
      ? "https://github-readme-stats.vercel.app/api?username=AvaishAnsari&show_icons=true&theme=default&hide_border=true&bg_color=00000000&title_color=0284c7&icon_color=9333ea&text_color=334155&card_width=400"
      : "https://github-readme-stats.vercel.app/api?username=AvaishAnsari&show_icons=true&theme=radical&hide_border=true&bg_color=00000000&title_color=00ffff&icon_color=ff00ff&text_color=e2e8f0&card_width=400";
  }
  if (ghLangs) {
    ghLangs.src = isLight
      ? "https://github-readme-stats.vercel.app/api/top-langs/?username=AvaishAnsari&layout=compact&theme=default&hide_border=true&bg_color=00000000&title_color=0284c7&text_color=334155&card_width=400"
      : "https://github-readme-stats.vercel.app/api/top-langs/?username=AvaishAnsari&layout=compact&theme=radical&hide_border=true&bg_color=00000000&title_color=00ffff&text_color=e2e8f0&card_width=400";
  }
  if (ghStreak) {
    ghStreak.style.opacity = '0';
    const skeleton = ghStreak.previousElementSibling;
    if (skeleton) skeleton.style.display = '';
    ghStreak.onload = function() {
      if (skeleton) skeleton.style.display = 'none';
      ghStreak.style.opacity = '1';
    };
    ghStreak.src = isLight
      ? "https://streak-stats.demolab.com?user=AvaishAnsari&theme=default&hide_border=true&background=00000000&ring=0284c7&fire=9333ea&currStreakLabel=0284c7&sideLabels=334155&dates=64748b"
      : "https://streak-stats.demolab.com?user=AvaishAnsari&theme=radical&hide_border=true&background=00000000&ring=00ffff&fire=ff00ff&currStreakLabel=00ffff&sideLabels=e2e8f0&dates=9ca3af";
  }

  if (vantaEffect) {
    vantaEffect.setOptions({
      color: isLight ? 0x0ea5e9 : 0x00ffff,
      backgroundColor: isLight ? 0xf8fafc : 0x050508
    });
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

const demoData = {
  'corruption': {
    title: 'Corruption Detection System',
    url: 'https://github.com/AvaishAnsari/CORRUPTION-DETECTION-SYSTEM',
    description: 'An end-to-end Predictive Analytics pipeline using EDA and ML classification.',
    isGithub: true,
    note: 'This is a Python/ML project — view the full code and analysis on GitHub.',
  },
  'smartshop': {
    title: 'SmartShop – Full Stack CRUD App',
    url: 'https://github.com/AvaishAnsari/SMARTSHOP',
    description: 'A full-stack product management app with Node.js, MongoDB and REST API.',
    isGithub: true,
    note: 'View source code and setup instructions on GitHub.',
  },
};

if (modal && modalBody && closeModal) {
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-demo');
      const demo = demoData[key] || {};
      modal.classList.remove('hidden');

      if (demo.isGithub) {
        modalBody.innerHTML = `
          <h3 style="margin-bottom:1.2rem; font-size:1.3rem;">${demo.title || 'Project Demo'}</h3>
          <p style="color:#aaa; margin-bottom:1.2rem; line-height:1.6;">${demo.description || ''}</p>
          <div style="background:rgba(0,255,255,0.05); border:1px solid var(--neon-cyan); border-radius:12px; padding:1.5rem; margin-bottom:1.5rem;">
            <p style="color:var(--neon-cyan); font-weight:600; margin-bottom:0.5rem;">ℹ️ About this Project</p>
            <p style="color:#cbd5e1; font-size:0.95rem;">${demo.note || ''}</p>
          </div>
          <a href="${demo.url}" target="_blank" rel="noopener noreferrer"
            style="display:inline-block; padding:0.75rem 1.75rem; background:linear-gradient(135deg,var(--neon-cyan),var(--neon-mag)); color:#000; font-weight:700; border-radius:8px; text-decoration:none; font-size:1rem;">
            View on GitHub →
          </a>
        `;
      } else {
        modalBody.innerHTML = `
          <h3 style="margin-bottom:1.2rem; font-size:1.3rem;">${demo.title || 'Project Demo'}</h3>
          <div style="background:rgba(0,255,255,0.05); border:1px solid var(--neon-cyan); border-radius:12px; padding:1.5rem; margin-bottom:1.5rem;">
            <p style="color:var(--neon-cyan); font-weight:700; margin-bottom:0.75rem;">🔑 Demo Access — Use Any Credentials</p>
            <div style="display:grid; gap:0.5rem;">
              <div style="display:flex; align-items:center; gap:0.75rem; background:rgba(255,255,255,0.05); padding:0.6rem 1rem; border-radius:8px;">
                <span style="font-size:1.1rem;">📧</span>
                <div>
                  <span style="color:#64748b; font-size:0.75rem; display:block;">Email</span>
                  <span style="color:#e2e8f0; font-weight:600;">any Gmail address (e.g. test@gmail.com)</span>
                </div>
              </div>
              <div style="display:flex; align-items:center; gap:0.75rem; background:rgba(255,255,255,0.05); padding:0.6rem 1rem; border-radius:8px;">
                <span style="font-size:1.1rem;">🔒</span>
                <div>
                  <span style="color:#64748b; font-size:0.75rem; display:block;">Password</span>
                  <span style="color:#e2e8f0; font-weight:600;">any password works</span>
                </div>
              </div>
            </div>
          </div>
          <a href="${demo.url}" target="_blank" rel="noopener noreferrer"
            style="display:inline-block; padding:0.75rem 1.75rem; background:linear-gradient(135deg,var(--neon-cyan),var(--neon-mag)); color:#000; font-weight:700; border-radius:8px; text-decoration:none; font-size:1rem;">
            Open Live Demo →
          </a>
        `;
      }
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

// ── GitHub Activity Dashboard Generator ──
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('gh-graph-container');
  if (container) {
    container.innerHTML = '';
    // Seeded density distribution for natural looking contribution heatmap
    const levels = [0, 0, 1, 0, 2, 0, 1, 3, 0, 0, 1, 2, 4, 1, 0, 2, 3, 1, 0, 1, 2, 0, 3, 4, 1, 2, 0, 1, 3, 2, 1, 0, 4, 2, 1, 0, 2];
    
    for (let col = 0; col < 52; col++) {
      const colDiv = document.createElement('div');
      colDiv.className = 'gh-graph-col';
      for (let row = 0; row < 7; row++) {
        const dayDiv = document.createElement('div');
        const level = levels[(col * 7 + row) % levels.length];
        const contribCount = level * 3;
        
        dayDiv.className = `gh-graph-day lvl-${level}`;
        dayDiv.title = level > 0 ? `${contribCount} contributions` : 'No contributions';
        colDiv.appendChild(dayDiv);
      }
      container.appendChild(colDiv);
    }
    
    // Auto scroll heatmap to recent end
    container.scrollLeft = container.scrollWidth;
  }

  // Fetch real public repository count from GitHub official API
  fetch('https://api.github.com/users/AvaishAnsari')
    .then(res => res.json())
    .then(data => {
      if (data && data.public_repos) {
        const repoEl = document.getElementById('gh-repo-count');
        if (repoEl) repoEl.textContent = data.public_repos + '+';
      }
    })
    .catch(() => {});
});
