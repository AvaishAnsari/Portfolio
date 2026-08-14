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

// ── GitHub Activity Dashboard – Live Data from GitHub API ──
document.addEventListener('DOMContentLoaded', () => {
  const GH_USERNAME = 'AvaishAnsari';
  const API_BASE = `https://api.github.com/users/${GH_USERNAME}`;

  // ─── Color palette for languages ───
  const LANG_COLORS = {
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'C': '#555555',
    'Shell': '#89e051',
    'Dart': '#00B4AB',
    'Kotlin': '#A97BFF',
    'Go': '#00ADD8',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'Jupyter Notebook': '#DA5B0B',
    'Dockerfile': '#384d54',
    'SCSS': '#c6538c',
    'Vue': '#41b883',
    'EJS': '#a91e50'
  };
  const DEFAULT_LANG_COLOR = '#8b949e';

  // ─── 1. Fetch profile → repo count ───
  fetch(API_BASE)
    .then(r => r.json())
    .then(data => {
      if (data && data.public_repos) {
        const el = document.getElementById('gh-repo-count');
        if (el) el.textContent = data.public_repos + '+';
      }
    })
    .catch(() => {});

  // ─── 2. Fetch REAL contribution data from GitHub contributions API ───
  // This API scrapes the actual GitHub contribution graph, giving us the exact
  // same data shown on the GitHub profile (accurate count + heatmap levels 0-4)
  fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USERNAME}?y=last`)
    .then(r => r.json())
    .then(data => {
      // Update total contribution count
      const contribEl = document.getElementById('gh-contrib-count');
      if (contribEl && data.total && data.total.lastYear !== undefined) {
        contribEl.textContent = data.total.lastYear + '+';
      }

      // Render heatmap from real contribution data
      const container = document.getElementById('gh-graph-container');
      if (container && data.contributions && data.contributions.length > 0) {
        container.innerHTML = '';

        const contributions = data.contributions; // already sorted by date

        // Find the starting Sunday to align the grid
        const firstDate = new Date(contributions[0].date + 'T00:00:00');
        const dayOfWeek = firstDate.getDay(); // 0=Sun, 6=Sat

        // Create week columns
        let colDiv = document.createElement('div');
        colDiv.className = 'gh-graph-col';

        // Pad the first week with empty cells if it doesn't start on Sunday
        for (let i = 0; i < dayOfWeek; i++) {
          const emptyDiv = document.createElement('div');
          emptyDiv.className = 'gh-graph-day lvl-0';
          emptyDiv.style.visibility = 'hidden';
          colDiv.appendChild(emptyDiv);
        }

        let cellsInCol = dayOfWeek;

        contributions.forEach(contrib => {
          if (cellsInCol === 7) {
            container.appendChild(colDiv);
            colDiv = document.createElement('div');
            colDiv.className = 'gh-graph-col';
            cellsInCol = 0;
          }

          const dayDiv = document.createElement('div');
          // Use the level directly from the API (0-4) — matches GitHub exactly
          dayDiv.className = `gh-graph-day lvl-${contrib.level}`;
          dayDiv.title = `${contrib.count} contributions on ${contrib.date}`;
          colDiv.appendChild(dayDiv);
          cellsInCol++;
        });

        // Append the last column
        if (cellsInCol > 0) {
          container.appendChild(colDiv);
        }

        // Scroll to the most recent end
        container.scrollLeft = container.scrollWidth;
      }
    })
    .catch(() => {
      // Fallback: render empty heatmap if API fails
      const container = document.getElementById('gh-graph-container');
      if (container) {
        container.innerHTML = '';
        for (let col = 0; col < 52; col++) {
          const colDiv = document.createElement('div');
          colDiv.className = 'gh-graph-col';
          for (let row = 0; row < 7; row++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'gh-graph-day lvl-0';
            colDiv.appendChild(dayDiv);
          }
          container.appendChild(colDiv);
        }
      }
    });

  // ─── 3. Fetch all repos → real language breakdown ───
  fetch(`${API_BASE}/repos?per_page=100&sort=updated`)
    .then(r => r.json())
    .then(repos => {
      if (!Array.isArray(repos)) return;

      // Fetch language bytes for each repo
      const langPromises = repos
        .filter(r => !r.fork)
        .map(repo =>
          fetch(repo.languages_url)
            .then(r => r.json())
            .catch(() => ({}))
        );

      return Promise.all(langPromises);
    })
    .then(langResults => {
      if (!langResults) return;

      // Aggregate language bytes across all repos
      const langTotals = {};
      langResults.forEach(langs => {
        Object.entries(langs).forEach(([lang, bytes]) => {
          langTotals[lang] = (langTotals[lang] || 0) + bytes;
        });
      });

      // Sort by bytes descending and take top 6
      const sorted = Object.entries(langTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

      const totalBytes = sorted.reduce((sum, [, b]) => sum + b, 0);
      if (totalBytes === 0) return;

      // Render language bar
      const barEl = document.getElementById('gh-lang-bar');
      const legendEl = document.getElementById('gh-lang-legend');
      if (!barEl || !legendEl) return;

      barEl.innerHTML = '';
      legendEl.innerHTML = '';

      sorted.forEach(([lang, bytes]) => {
        const pct = ((bytes / totalBytes) * 100).toFixed(1);
        const color = LANG_COLORS[lang] || DEFAULT_LANG_COLOR;

        // Bar segment
        const seg = document.createElement('div');
        seg.className = 'lang-segment';
        seg.style.width = `${pct}%`;
        seg.style.backgroundColor = color;
        seg.title = `${lang} ${pct}%`;
        barEl.appendChild(seg);

        // Legend tag
        const tag = document.createElement('span');
        tag.className = 'lang-tag';
        tag.innerHTML = `<span class="dot" style="background:${color}"></span> ${lang} ${pct}%`;
        legendEl.appendChild(tag);
      });
    })
    .catch(() => {});
});
