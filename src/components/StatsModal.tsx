import { Puzzle } from '@/data/puzzles';

interface GameStats {
  totalPlayed: number;
  totalWins: number;
  currentStreak: number;
  maxStreak: number;
}

interface StatsModalProps {
  status: 'playing' | 'won' | 'lost';
  guessHistory: string[][];
  puzzle: Puzzle;
  stats: GameStats;
  challengeMode: 'standard' | 'challenge';
  timePressureMode: boolean;
  hintsUsed: number;
}

export function StatsModal({ status, guessHistory, puzzle, stats, challengeMode, timePressureMode, hintsUsed }: StatsModalProps) {
  if (status === 'playing') return null;

  const isWin = status === 'won';
  const winRate = stats.totalPlayed > 0 ? Math.round((stats.totalWins / stats.totalPlayed) * 100) : 0;

  // Generate emoji grid
  const emojiMap: Record<number, string> = {
    1: '🟨', 2: '🟩', 3: '🟦', 4: '🟪'
  };

  const getEmojiForCode = (code: string) => {
    let level = 0;
    for (const group of puzzle.groups) {
      if (group.members.includes(code)) {
        level = group.level;
        break;
      }
    }
    return emojiMap[level] || '⬛';
  };

  const gridText = guessHistory.map(guess => {
    return guess.map(getEmojiForCode).join('');
  }).join('\n');

  const handleShare = () => {
    const modeTags = [
      challengeMode === 'challenge' ? 'Challenge' : 'Standard',
      timePressureMode ? 'Pressure' : null,
      hintsUsed > 0 ? `Hints:${hintsUsed}` : null,
    ].filter(Boolean).join(' • ');

    const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
    const textToShare = `Geography Connections #${puzzle.id} (${puzzle.date})\n${gridText}\n${modeTags}\nPlay now at ${shareUrl}`;
    navigator.clipboard.writeText(textToShare);
    alert('Copied results to clipboard!');
  };

  return (
    <div className="animate-fade-in-up" style={{ padding: '2rem 1rem', marginTop: '2rem', textAlign: 'center', maxWidth: '420px', margin: '2rem auto 0 auto', animationDelay: '0.2s', borderTop: '1px solid var(--border)' }}>
      <h2 style={{ color: isWin ? 'var(--foreground)' : 'var(--error)', marginBottom: '1rem', fontSize: '2rem', fontWeight: 800 }}>
        {isWin ? 'Great Job!' : 'Better Luck Next Time'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: '0.25rem' }}>Played</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{stats.totalPlayed}</div>
        </div>
        <div style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: '0.25rem' }}>Win Rate</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{winRate}%</div>
        </div>
        <div style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: '0.25rem' }}>Streak</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{stats.currentStreak}</div>
        </div>
        <div style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: '0.25rem' }}>Best</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{stats.maxStreak}</div>
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', opacity: 0.75, marginBottom: '1.25rem' }}>
        Mode: {challengeMode === 'challenge' ? 'Challenge' : 'Standard'}
        {timePressureMode ? ' • Pressure' : ''}
        {hintsUsed > 0 ? ` • Hints used: ${hintsUsed}` : ''}
      </div>
      
      <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.5rem', lineHeight: '1.4', marginBottom: '2rem', letterSpacing: '0.1em' }}>
        {gridText}
      </div>
      
      <button 
        onClick={handleShare}
        style={{
          background: 'var(--foreground)',
          color: 'var(--background)',
          border: 'none',
          padding: '1rem 2.5rem',
          borderRadius: '32px',
          fontSize: '1.125rem',
          cursor: 'pointer',
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        Share Result
      </button>
    </div>
  );
}
