import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Home() {
  useEffect(() => {
    const duration = 10 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#000',color:'#fff',padding:'2rem'}}>
      <div style={{textAlign:'center'}}>
        <h1 style={{fontSize:'clamp(2rem,6vw,4rem)'}}>Famous2U: Fame. Access. Connection.</h1>
        <p style={{opacity:.8,marginTop:'0.75rem'}}>Coming Soon — 2026</p>
      </div>
    </main>
  );
}
