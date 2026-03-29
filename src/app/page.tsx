import { Game } from '@/components/Game';

export default function Home() {
  return (
    <main style={{ padding: '2rem 1rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, letterSpacing: '-0.02em', margin: 0, color: 'var(--foreground)' }}>
          Geography Connections
        </h1>
        <p style={{ marginTop: '0.5rem', color: 'var(--foreground)', opacity: 0.7, fontSize: '1rem', fontWeight: 400 }}>
          Group flags that share a common thread.
        </p>
      </header>
      
      <Game />
    </main>
  );
}
