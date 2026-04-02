import Link from 'next/link';

export default function MapClickPage() {
  return (
    <main style={{ padding: '2rem 1rem 3rem', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--foreground)', opacity: 0.6 }}>
          ← Back to Arcade
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.02em', margin: '0.75rem 0 0', color: 'var(--foreground)' }}>
          Map Click Challenge
        </h1>
        <p style={{ marginTop: '0.5rem', color: 'var(--foreground)', opacity: 0.7, fontSize: '1rem', fontWeight: 400 }}>
          Click the country on a blank map as fast as you can.
        </p>
      </header>

      <div style={{ border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
        <iframe
          src="/map-click.html"
          title="Map Click Challenge"
          style={{ width: '100%', height: '780px', border: 'none' }}
        />
      </div>
    </main>
  );
}
