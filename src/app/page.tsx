import { GameCard } from '@/components/GameCard';
import { StreakPill } from '@/components/StreakPill';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.eyebrow}>Daily Geography Games</div>
          <h1 className={styles.title}>
            FlagIT <span className={styles.titleAccent}>Arcade</span>
          </h1>
          <p className={styles.subcopy}>
            A new daily lineup of geography puzzles — from flag connections to border chains and clue challenges.
          </p>
          <StreakPill className={styles.streak} dotsClassName={styles.streakDots} />
        </header>

        <div className={styles.sectionTitle}>Today&apos;s Games</div>

        <section className={styles.grid}>
          <GameCard
            title="Connections"
            description="Group 16 flags into 4 hidden categories. Challenge mode adds fog and time pressure."
            href="/connections"
            tag="Daily puzzle"
            status="live"
            icons={['🇧🇷', '🇦🇺', '🇳🇿', '🇫🇯']}
            index={1}
          />
          <GameCard
            title="Border Builder"
            description="Start from a country and build the longest chain of bordering neighbors."
            href="/border-builder"
            tag="Daily challenge"
            status="live"
            icons={['🇫🇷', '🇩🇪', '🇵🇱', '🇺🇦']}
            index={2}
          />
          <GameCard
            title="Clue-to-Country"
            description="Solve the country using progressive clues. Fewer clues means more points."
            href="/clue-country"
            tag="Daily puzzle"
            status="live"
            icons={['🇯🇵', '🇮🇳', '🇹🇷', '🇰🇷']}
            index={3}
          />
          <GameCard
            title="Odd One Out"
            description="Four countries, one doesn’t belong. Find the intended logic."
            href="/odd-one-out"
            tag="Daily puzzle"
            status="live"
            icons={['🇳🇬', '🇬🇭', '🇸🇪', '🇵🇹']}
            index={4}
          />
          <GameCard
            title="Map Click Challenge"
            description="Click the prompted country on a blank map. Precision matters."
            href="/map-click"
            tag="Daily challenge"
            status="live"
            icons={['🌍', '🌎', '🌏']}
            index={5}
          />
        </section>
      </main>
    </div>
  );
}
