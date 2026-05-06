// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
  ring.style.left = rx - 20 + 'px'; ring.style.top = ry - 20 + 'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a, button, .skill-card, .module-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; });
});



// 3D PHOTO TILT
const card = document.getElementById('photoCard');
const wrapper   = card?.parentElement?.parentElement;
wrapper?.addEventListener('mousemove', e => {
  const rect = wrapper.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const rx2 = (e.clientY - cy) / rect.height * 20;
  const ry2 = (e.clientX - cx) / rect.width * 20;
  card.style.transform = `rotateX(${-rx2}deg) rotateY(${ry2}deg)`;
});
wrapper?.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0) rotateY(0)';
});

// PARTICLE CANVAS
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3;
    this.r = Math.random() * 2; this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '108,99,255' : '0,212,255';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`; ctx.fill();
  }
}
for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108,99,255,${0.15 * (1 - d/100)})`;
        ctx.lineWidth = 0.5; ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); }) ;
  drawLines();
  requestAnimationFrame(animate);
}
animate();


// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.skill-card, .module-card, .stat-box, .tl-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// COUNTER ANIMATION
document.querySelectorAll('.stat-num').forEach(el => {
  const text = el.textContent;
  const num = parseInt(text);
  if (!isNaN(num)) {
    let start = 0;
    const dur = 1500;
    const step = (timestamp, startTime) => {
      const progress = Math.min((timestamp - startTime) / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * num) + (text.includes('+') ? '+' : '');
      if (progress < 1) requestAnimationFrame(t => step(t, startTime));
      else el.textContent = text;
    };
    const obs2 = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(t => step(t, t));
        obs2.disconnect();
      } 
    });
    obs2.observe(el);
  }
});