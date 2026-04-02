import { GameCard } from '@/components/GameCard';

export default function Home() {
  return (
    <main style={{ padding: '2.5rem 1.25rem 3rem', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.24em', opacity: 0.6, marginBottom: '0.5rem' }}>
          Daily Geography Games
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 500, letterSpacing: '-0.03em', margin: 0, color: 'var(--foreground)' }}>
          FlagIT Arcade
        </h1>
        <p style={{ marginTop: '0.75rem', color: 'var(--foreground)', opacity: 0.75, fontSize: '1.05rem', maxWidth: '640px' }}>
          Play a new daily lineup of geography puzzles — from flag connections to border chains and clue challenges.
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <GameCard
          title="Connections"
          description="Group 16 flags into 4 hidden categories. Challenge mode adds fog and time pressure."
          href="/connections"
          tag="Daily puzzle"
          status="live"
        />
        <GameCard
          title="Border Builder"
          description="Start from a country and build the longest chain of bordering neighbors."
          href="/border-builder"
          tag="New mode"
          status="beta"
        />
        <GameCard
          title="Clue-to-Country"
          description="Solve the country using progressive clues. Fewer clues means more points."
          href="/clue-country"
          tag="Daily puzzle"
          status="live"
        />
        <GameCard
          title="Odd One Out"
          description="Four countries, one doesn’t belong. Find the intended logic."
          href="/odd-one-out"
          tag="Daily puzzle"
          status="live"
        />
        <GameCard
          title="Map Click Challenge"
          description="Click the prompted country on a blank map. Precision matters."
          href="/map-click"
          tag="Coming soon"
          status="soon"
        />
      </section>
    </main>
  );
}
