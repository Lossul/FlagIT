interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="How to Play"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'var(--surface)',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
          padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>How to Play</h2>
          <button
            onClick={onClose}
            style={{
              border: '1px solid var(--border)',
              background: 'transparent',
              borderRadius: '999px',
              padding: '0.3rem 0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>

        <div style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Goal</div>
          <div style={{ marginBottom: '0.75rem' }}>
            Select four flags that share a hidden connection. Solve all four groups to win.
          </div>

          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Rules</div>
          <div style={{ marginBottom: '0.75rem' }}>
            You get 4 mistakes. A wrong guess spends one mistake. When you run out, the game ends.
          </div>

          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Challenge Mode</div>
          <div style={{ marginBottom: '0.75rem' }}>
            Flags start fogged and improve as mistakes are spent. It stays harder until you earn clarity.
          </div>

          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Time Pressure</div>
          <div style={{ marginBottom: '0.75rem' }}>
            The signal decays over time. Every 45 seconds, the reveal drops one level.
          </div>

          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Hints</div>
          <div>
            Use a hint to reveal one group’s theme at the cost of one mistake.
          </div>
        </div>
      </div>
    </div>
  );
}
