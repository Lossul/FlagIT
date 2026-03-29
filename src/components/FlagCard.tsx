import { countries } from '@/data/countries';

const revealStyles = [
  {
    filter: 'grayscale(1) brightness(0.35) contrast(1.2) blur(1px)',
    showName: false,
  },
  {
    filter: 'grayscale(1) brightness(0.7) contrast(1.05)',
    showName: false,
  },
  {
    filter: 'none',
    showName: false,
  },
  {
    filter: 'none',
    showName: true,
  },
] as const;

export function FlagCard({ code, selected, revealStage, onClick }: { code: string, selected: boolean, revealStage: number, onClick: () => void }) {
  const country = countries.find(c => c.code === code);
  const reveal = revealStyles[Math.min(Math.max(revealStage, 0), 3)];
  
  return (
    <button 
      onClick={onClick}
      className={`card ${selected ? 'selected animate-bounce-up' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        backgroundColor: selected ? 'var(--foreground)' : 'var(--surface)',
        color: selected ? 'var(--background)' : 'var(--foreground)',
        border: selected ? 'none' : '1px solid var(--border)',
        boxShadow: selected ? '0 8px 16px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <img 
        src={`https://flagcdn.com/w160/${code}.png`} 
        alt={country?.name || code} 
        style={{ 
          width: '64%', 
          borderRadius: '4px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          filter: reveal.filter,
          transition: 'filter 0.3s ease'
        }}
      />
      <span style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: reveal.showName ? 1 : 0.6 }}>
        {reveal.showName ? (country?.name || code) : 'Name Hidden'}
      </span>
    </button>
  );
}
