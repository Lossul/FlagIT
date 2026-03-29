import { PuzzleGroup } from '@/data/puzzles';
import { FlagCard } from './FlagCard';
import { countries } from '@/data/countries';

interface ConnectionsBoardProps {
  boardOrder: string[];
  solvedGroups: PuzzleGroup[];
  selected: string[];
  revealStage: number;
  toggleSelection: (code: string) => void;
}

export function ConnectionsBoard({ boardOrder, solvedGroups, selected, revealStage, toggleSelection }: ConnectionsBoardProps) {
  const solvedCodes = new Set(solvedGroups.flatMap(g => g.members));
  const activeFlags = boardOrder.filter(code => !solvedCodes.has(code));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      
      {/* Solved Groups */}
      {solvedGroups.map((group, idx) => (
        <div 
          key={idx} 
          className={`group-${group.level} animate-fade-in-up`}
          style={{
            width: '100%',
            padding: '1.25rem 1rem',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            marginBottom: '0.5rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.1em' }}>
            {group.theme}
          </span>
          <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            {group.members.map(code => countries.find(c => c.code === code)?.name).join(', ')}
          </span>
        </div>
      ))}

      {/* Unsolved Grid */}
      {activeFlags.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
          {activeFlags.map(code => (
            <FlagCard 
              key={code}
              code={code}
              selected={selected.includes(code)}
              revealStage={revealStage}
              onClick={() => toggleSelection(code)}
            />
          ))}
        </div>
      )}
      
    </div>
  );
}
