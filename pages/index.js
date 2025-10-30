import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['#ff0059', '#ffb300', '#00c2ff', '#05ff00', '#ff00f2'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    function createFirework(x, y) {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x,
          y,
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 6 + 2,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
        });
      }
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed + 1;
        p.alpha -= 0.015;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
        ctx.fill();
        if (p.alpha <= 0) particles.splice(i, 1);
      });
      requestAnimationFrame(draw);
    }

    function hexToRgb(hex) {
      const bigint = parseInt(hex.replace('#', ''), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    }

    const interval = setInterval(() => {
      createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.7);
    }, 900);

    draw();

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <main style={{position:'relative', overflow:'hidden'}}>
      <canvas ref={canvasRef} style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} />
      <div style={{
        position:'absolute', 
        top:'50%', left:'50%', transform:'translate(-50%, -50%)',
        textAlign:'center', color:'#fff', zIndex:1
      }}>
        <h1 style={{fontSize:'clamp(2rem,6vw,4rem)'}}>Famous2U: Fame. Access. Connection.</h1>
        <p style={{opacity:.8,marginTop:'0.75rem'}}>Coming Soon — 2026</p>
      </div>
    </main>
  );
}
