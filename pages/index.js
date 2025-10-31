<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your Product — Do one clear thing well</title>
  <meta name="description" content="A simple, fast landing page template with a clear value prop and call to action." />
  <meta property="og:title" content="Your Product" />
  <meta property="og:description" content="A simple, fast landing page template." />
  <meta name="theme-color" content="#0f172a" />
  <style>
    :root{
      --bg: #0b1020;         /* page background (dark slate) */
      --card: #0f172a;       /* card background */
      --text: #e5e7eb;       /* body text */
      --muted: #94a3b8;      /* secondary text */
      --brand: #60a5fa;      /* primary */
      --brand-ink: #0b1020;  /* contrast ink on brand */
      --ring: rgba(96,165,250,.5);
      --shadow: 0 10px 30px rgba(0,0,0,.3);
      --radius: 14px;
      --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji";
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: var(--font);
      background: radial-gradient(1200px 800px at 80% -10%, #1a2746 0%, transparent 60%) no-repeat var(--bg);
      color: var(--text);
      line-height:1.6;
    }
    a{color:inherit;text-decoration:none}
    .container{max-width:1100px;margin:0 auto;padding:24px}
    header{
      position:sticky; top:0; z-index:40;
      background: linear-gradient(180deg, rgba(15,23,42,.85), rgba(15,23,42,.65) 60%, transparent);
      backdrop-filter: blur(6px);
    }
    .nav{display:flex;align-items:center;justify-content:space-between;gap:16px}
    .brand{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:.2px}
    .brand-badge{
      width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#60a5fa,#22d3ee);
      box-shadow: 0 6px 18px rgba(34,211,238,.35);
    }
    .nav-links{display:flex;gap:22px}
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-weight:600;border-radius:10px;border:1px solid transparent;cursor:pointer}
    .btn-primary{background:var(--brand); color:var(--brand-ink); padding:12px 18px}
    .btn-outline{border-color:#263249;color:#cbd5e1;padding:10px 14px;background:rgba(255,255,255,.02)}
    .btn:focus-visible{outline:3px solid var(--ring); outline-offset:2px}

    .hero{padding:80px 24px 30px}
    .hero-inner{
      display:grid; grid-template-columns: 1.15fr 1fr; gap:32px; align-items:center;
    }
    .headline{font-size: clamp(32px, 5vw, 52px); line-height:1.1; margin:0 0 12px; letter-spacing:-.02em}
    .sub{color:var(--muted); margin:0 0 20px; font-size: clamp(16px, 2.5vw, 18px)}
    .hero-card{
      background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01));
      border:1px solid #1f2a44; border-radius: var(--radius); padding:22px; box-shadow: var(--shadow);
    }
    .hero-form{display:flex;gap:10px;flex-wrap:wrap}
    .input{
      flex:1 1 240px; background:#0b1328; border:1px solid #24304d; color:#e5e7eb; border-radius:10px; padding:12px 14px;
    }
    .input::placeholder{color:#7082a7}
    .mini{font-size:12px;color:#8aa0c3;margin-top:8px}

    .mock{
      background: linear-gradient(135deg, #0b1328, #0b1328 60%, #0f1a35);
      border:1px solid #1f2a44; border-radius: var(--radius); padding:18px; box-shadow: var(--shadow);
      min-height:220px; display:grid; gap:12px;
    }
    .mock .bar{height:12px;background:#1f2a44;border-radius:8px}
    .mock .pill{height:34px;background:#142045;border-radius:10px;border:1px solid #22325a}
    .mock .cta{height:42px;background:var(--brand);border-radius:12px}

    .section{padding:30px 24px}
    .grid{display:grid; gap:16px; grid-template-columns: repeat(3, 1fr)}
    .card{
      background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01));
      border:1px solid #1f2a44; border-radius: var(--radius); padding:18px; box-shadow: var(--shadow);
    }
    .kicker{font-size:12px; text-transform:uppercase; letter-spacing:.16em; color:#93c5fd}
    h3{margin:.2rem 0 .2rem 0}
    p{margin:.2rem 0 .2rem 0; color:var(--muted)}

    .cta-wrap{
      margin-top:18px; display:flex; gap:10px; flex-wrap:wrap
    }

    footer{padding:40px 24px;color:#8aa0c3;border-top:1px solid #1f2a44}
    .footer-inner{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
    .tiny{font-size:12px;color:#6b7fa5}

    @media (max-width: 900px){
      .hero-inner{grid-template-columns:1fr}
      .grid{grid-template-columns:1fr}
      header{position:static;background:transparent}
    }
  </style>
</head>
<body>
  <header>
    <div class="container nav">
      <div class="brand" aria-label="Brand">
        <div class="brand-badge" aria-hidden="true"></div>
        <span>Your Product</span>
      </div>
      <nav class="nav-links" aria-label="Primary">
        <a href="#features" class="btn btn-outline">Features</a>
        <a href="#cta" class="btn btn-outline">Pricing</a>
        <a href="#signup" class="btn btn-primary">Get Started</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="kicker">New • Fast • Simple</p>
          <h1 class="headline">Ship a clear value prop, not a labyrinth of features.</h1>
          <p class="sub">A minimal landing page template that focuses on clarity, speed, and conversion — easy to customize and launch today.</p>

          <form id="signup" class="hero-card" onsubmit="return false" aria-label="Early access form">
            <label class="tiny" for="email">Join the waitlist</label>
            <div class="hero-form">
              <input id="email" class="input" type="email" placeholder="you@example.com" autocomplete="email" required />
              <button class="btn btn-primary" id="cta">Notify me</button>
            </div>
            <p class="mini" id="form-note">No spam. Unsubscribe anytime.</p>
          </form>

          <div class="cta-wrap">
            <a class="btn btn-outline" href="#features">See how it works</a>
            <a class="btn btn-primary" href="#signup">Start free</a>
          </div>
        </div>

        <div class="mock" role="img" aria-label="Product preview mockup">
          <div class="bar" style="width:60%"></div>
          <div class="bar" style="width:35%"></div>
          <div class="pill"></div>
          <div class="bar" style="width:80%"></div>
          <div class="bar" style="width:45%"></div>
          <div class="cta"></div>
        </div>
      </div>
    </section>

    <section id="features" class="section">
      <div class="container">
        <div class="grid">
          <article class="card">
            <p class="kicker">Speed</p>
            <h3>Under 10KB, no deps</h3>
            <p>Pure HTML/CSS/JS. Loads fast on any device and is easy to host anywhere.</p>
          </article>
          <article class="card">
            <p class="kicker">Clarity</p>
            <h3>One message, one action</h3>
            <p>Keep your headline focused and your CTA obvious. Remove distractions.</p>
          </article>
          <article class="card">
            <p class="kicker">Accessible</p>
            <h3>Keyboard & screen reader friendly</h3>
            <p>Proper labels, contrast, and focus states out of the box.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container card">
        <h3 style="margin-top:0">A simple, honest price</h3>
        <p class="tiny">No trials, no surprises.</p>
        <div style="display:flex;gap:18px;align-items:end;flex-wrap:wrap;margin-top:10px">
          <div style="font-size:42px;font-weight:800">€9<span class="tiny">/mo</span></div>
          <a class="btn btn-primary" href="#signup" aria-label="Choose Basic plan">Choose Basic</a>
          <a class="btn btn-outline" href="#" aria-label="Learn about Team plan">Talk to Sales</a>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container footer-inner">
      <div>&copy; <span id="year"></span> Your Company</div>
      <div class="tiny">Built with vanilla HTML/CSS/JS.</div>
    </div>
  </footer>

  <script>
    // Tiny enhancements: year, basic form handling, safe hash links
    document.getElementById('year').textContent = new Date().getFullYear();

    const form = document.getElementById('signup');
    const note = document.getElementById('form-note');
    const email = document.getElementById('email');
    form.addEventListener('submit', () => {
      if (!email.checkValidity()) { email.reportValidity(); return; }
      note.textContent = "Thanks! We'll be in touch soon.";
      form.reset();
    });

    // Smooth scroll for internal links (respects reduced motion)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
          const id = a.getAttribute('href').slice(1);
          const el = document.getElementById(id);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior:'smooth', block:'start' });
            history.pushState(null, '', `#${id}`);
          }
        });
      });
    }
  </script>
</body>
</html>
