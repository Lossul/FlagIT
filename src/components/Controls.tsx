interface ControlsProps {
  selectedCount: number;
  shuffleBoard: () => void;
  deselectAll: () => void;
  submitGuess: () => void;
  revealHint: () => void;
  hintDisabled: boolean;
  hintsRemaining: number;
  status: 'playing' | 'won' | 'lost';
}

export function Controls({ selectedCount, shuffleBoard, deselectAll, submitGuess, revealHint, hintDisabled, hintsRemaining, status }: ControlsProps) {
  if (status !== 'playing') return null;

  return (
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
      <button 
        onClick={revealHint}
        disabled={hintDisabled}
        style={{ padding: '0.75rem 1.5rem', borderRadius: '24px', border: '1px solid var(--border)', background: hintDisabled ? 'var(--border)' : 'transparent', color: 'var(--foreground)', opacity: hintDisabled ? 0.5 : 1, fontWeight: 700, fontSize: '1rem', transition: 'all 0.2s' }}
      >
        Hint (-1){hintsRemaining > 0 ? ` • ${hintsRemaining} left` : ''}
      </button>
      <button 
        onClick={shuffleBoard}
        style={{ padding: '0.75rem 1.5rem', borderRadius: '24px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)', fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s' }}
      >
        Shuffle
      </button>
      <button 
        onClick={deselectAll}
        disabled={selectedCount === 0}
        style={{ padding: '0.75rem 1.5rem', borderRadius: '24px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)', opacity: selectedCount === 0 ? 0.5 : 1, fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s' }}
      >
        Deselect All
      </button>
      <button 
        onClick={submitGuess}
        disabled={selectedCount !== 4}
        style={{ padding: '0.75rem 1.5rem', borderRadius: '24px', border: 'none', background: selectedCount === 4 ? 'var(--foreground)' : 'var(--border)', color: selectedCount === 4 ? 'var(--background)' : 'var(--foreground)', opacity: selectedCount !== 4 ? 0.5 : 1, fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s', boxShadow: selectedCount === 4 ? '0 4px 12px rgba(0,0,0,0.1)' : 'none' }}
      >
        Submit
      </button>
    </div>
  );
}
