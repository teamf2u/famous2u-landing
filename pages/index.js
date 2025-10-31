import { useEffect, useRef } from 'react';

/**
 * Click anywhere to launch fireworks.
 * Lightweight canvas particles, SSR-safe, mobile-friendly.
 */
export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Guard against SSR
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect "Reduce Motion"
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Size & resize
    const resize = () => {
      // Use device pixel ratio for crispness
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { innerWidth: w, innerHeight: h } = window;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles
    let particles = [];
    let rafId = 0;

    const COLORS = ['#ff0059', '#ffb300', '#00c2ff', '#05ff00', '#ff00f2', '#ffd166', '#06d6a0'];

    function spawnFirework(x, y) {
      const COUNT = 60;
      for (let i = 0; i < COUNT; i++) {
        const angle = (Math.PI * 2 * i) / COUNT + Math.random() * 0.3;
        const speed = 2 + Math.random() * 6;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1 + Math.random() * 2,
          life: 1, // 1 → 0
          color: COLORS[(Math.random() * COLORS.length) | 0],
          gravity: 0.05 + Math.random() * 0.08,
          drag: 0.985 + Math.random() * 0.01,
        });
      }
    }

    function hexToRgb(hex) {
      const n = parseInt(hex.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function draw() {
      // fade trail
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        // physics
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.012; // fade out

        // draw
        const [r, g, b] = hexToRgb(p.color);
        const alpha = Math.max(p.life, 0);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();

        // prune
        if (p.life <= 0) particles.splice(i, 1);
      }

      rafId = requestAnimationFrame(draw);
    }

    // Start loop
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!reduceMotion) {
      rafId = requestAnimationFrame(draw);
    }

    // Click/tap handler
    const onClick = (e) => {
      // Get click coords relative to canvas CSS size
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnFirework(x, y);
      // If motion is reduced, render one frame manually
      if (reduceMotion) {
        // draw a couple of frames to show the burst
        for (let i = 0; i < 20; i++) {
          particles.forEach((p) => {
            p.vx *= p.drag;
            p.vy = p.vy * p.drag + p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.04;
          });
        }
        // quick draw
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          const [r, g, b] = hexToRgb(p.color);
          const alpha = Math.max(p.life, 0);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
        });
        // prune dead
        particles = particles.filter((p) => p.life > 0);
      }
    };

    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = canvas.getBoundingClientRect();
      spawnFirework(t.clientX - rect.left, t.clientY - rect.top);
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      particles = [];
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#000', color: '#fff' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true"
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          padding: '2rem',
          pointerEvents: 'none', // allow clicks to reach canvas
        }}
      >
        <div>
          <h1 style={{ fontSize: 'clamp(2rem,6vw,4rem)', lineHeight: 1.1 }}>
            Famous2U: Fame. Access. Connection.
          </h1>
          <p style={{ opacity: 0.85, marginTop: '0.75rem' }}>Coming Soon — {year}</p>
          <p style={{ opacity: 0.6, marginTop: '0.5rem', fontSize: '0.95rem' }}>
            (Tap/click anywhere for fireworks)
          </p>
        </div>
      </div>
    </main>
  );
}
