<!-- Add somewhere in <body> -->
<canvas id="fireworks"></canvas>

<style>
  html, body { height: 100%; margin: 0; }
  #fireworks {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;             /* above hero, below modals if needed */
    pointer-events: none;      /* doesn't block clicks/links */
  }
</style>

<script>
(() => {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d', { alpha: true });

  // Resize & DPR scaling
  const resize = () => {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width  = Math.floor(canvas.clientWidth  * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  window.addEventListener('resize', resize);
  resize();

  // Utilities
  const rand = (min, max) => Math.random() * (max - min) + min;
  const hsla = (h, s, l, a=1) => `hsla(${h}, ${s}%, ${l}%, ${a})`;

  // Particle + Rocket
  class Particle {
    constructor(x, y, vx, vy, life, color) {
      this.x = x; this.y = y;
      this.vx = vx; this.vy = vy;
      this.life = life; this.maxLife = life;
      this.color = color;
      this.size = rand(1, 2.2);
    }
    step(dt) {
      this.life -= dt;
      // gravity + drag
      this.vy += 300 * dt;
      this.vx *= (1 - 0.6 * dt);
      this.vy *= (1 - 0.06 * dt);
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }
    draw(ctx) {
      const t = Math.max(this.life / this.maxLife, 0);
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = this.color.replace(/([\d.]+)\)$/, `${0.2 + 0.8 * t})`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    alive() { return this.life > 0; }
  }

  class Rocket {
    constructor(x, y, targetY, hue) {
      this.x = x; this.y = y;
      this.vx = rand(-60, 60);
      this.vy = -rand(380, 520);
      this.targetY = targetY;
      this.hue = hue;
      this.alive = true;
    }
    step(dt) {
      this.vy += 220 * dt; // gravity
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      if (this.vy >= -80 || this.y <= this.targetY) this.explode();
    }
    draw(ctx) {
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = hsla(this.hue, 100, 70, 0.9);
      ctx.fillRect(this.x - 1.5, this.y - 1.5, 3, 3);
    }
    explode() {
      this.alive = false;
      const count = Math.floor(rand(60, 100));
      const burst = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(80, 260);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const sat = Math.floor(rand(70, 100));
        const light = Math.floor(rand(55, 70));
        const a = rand(0.7, 1);
        const color = `hsla(${this.hue + rand(-10, 10)}, ${sat}%, ${light}%, ${a})`;
        burst.push(new Particle(this.x, this.y, vx, vy, rand(0.8, 1.6), color));
      }
      particles.push(...burst);
      // crackle
      for (let i = 0; i < 25; i++) {
        particles.push(new Particle(this.x, this.y, rand(-40, 40), rand(-40, 40), rand(0.3, 0.6), hsla(this.hue, 100, 80, 0.8)));
      }
    }
  }

  const rockets = [];
  const particles = [];

  const launch = (x, y) => {
    const hue = rand(0, 360);
    const targetY = y ?? rand(canvas.clientHeight * 0.15, canvas.clientHeight * 0.45);
    rockets.push(new Rocket(x ?? rand(canvas.clientWidth * 0.2, canvas.clientWidth * 0.8), canvas.clientHeight + 10, targetY, hue));
  };

  // Click to launch
  window.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    launch(e.clientX - rect.left, e.clientY - rect.top);
  }, { passive: true });

  // Occasional auto bursts
  let autoTimer = 0;

  // Animation loop
  let last = performance.now();
  const loop = (now) => {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;

    // fade trail
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // step/draw
    rockets.forEach(r => { r.step(dt); r.draw(ctx); });
    for (let i = rockets.length - 1; i >= 0; i--) if (!rockets[i].alive) rockets.splice(i, 1);

    particles.forEach(p => { p.step(dt); p.draw(ctx); });
    for (let i = particles.length - 1; i >= 0; i--) if (!particles[i].alive()) particles.splice(i, 1);

    // auto-launch every ~0.7–1.6s
    autoTimer -= dt;
    if (autoTimer <= 0) {
      launch();
      autoTimer = rand(0.7, 1.6);
    }

    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
})();
</script>
