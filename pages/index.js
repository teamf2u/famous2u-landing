export default function Home() {
  return (
    <main
      style={{
        height: '100vh',
        margin: 0,
        display: 'grid',
        placeItems: 'center',
        background: 'linear-gradient(135deg, #111 0%, #222 100%)',
        color: '#00E6FF', // bright cyan to avoid “white on white”
        textAlign: 'center',
        border: '6px solid #FF007A', // big border so you *see* it
        boxSizing: 'border-box',
      }}
    >
      <div>
        <h1 style={{ fontSize: 'clamp(2rem,6vw,4rem)' }}>
          Famous2U: Fame. Access. Connection.
        </h1>
        <p style={{ opacity: 1, marginTop: '0.75rem', color: '#fff' }}>
          Coming Soon — {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
