interface GameBoardProps {
  countryCode: string;
  attempts: number;
  status: 'playing' | 'won' | 'lost';
}

export function GameBoard({ countryCode, attempts, status }: GameBoardProps) {
  // If won or lost, reveal fully. Otherwise, reveal percentage based on attempts.
  const isRevealed = status !== 'playing';
  // Attempt 0 = 15% visible circle. Attempt 1 = 30%, Attempt 2 = 45%, etc.
  const circleSize = isRevealed ? '150%' : `${15 + attempts * 15}%`;

  return (
    <div className="game-board" style={{ position: 'relative', width: '100%', maxWidth: '380px', height: '253px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: '0 10px 40px -10px rgba(139, 92, 246, 0.4)', animation: 'pulseGlow 6s infinite' }}>
      {/* Background placeholder */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)', opacity: 0.2, fontSize: '3rem', fontWeight: 200 }}>?</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w320/${countryCode}.png`}
        alt="Flag"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          clipPath: `circle(${circleSize} at center)`,
          transition: 'clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        width={320}
        height={213}
      />
    </div>
  );
}
