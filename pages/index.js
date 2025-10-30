export default function Home() {
  const year = new Date().getFullYear();
  return (
    <main style={{
      minHeight:'100vh',
      display:'grid',
      placeItems:'center',
      background:'#000',
      color:'#fff',
      padding:'2rem',
      textAlign:'center'
    }}>
      <div>
        <h1 style={{fontSize:'clamp(2rem,6vw,4rem)'}}>Famous2U: Fame. Access. Connection.</h1>
        <p style={{opacity:.8,marginTop:'0.75rem'}}>Coming Soon — {year}</p>
      </div>
    </main>
  );
}
