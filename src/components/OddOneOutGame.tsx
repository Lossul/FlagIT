'use client';

import { useState } from 'react';
import { getDailyOddOneOut } from '@/data/oddOneOut';
import { countries } from '@/data/countries';

export function OddOneOutGame() {
  const daily = getDailyOddOneOut();
  const [picked, setPicked] = useState<string | null>(null);
  const [status, setStatus] = useState<'playing' | 'won'>('playing');
  const [message, setMessage] = useState('');

  const handlePick = (code: string) => {
    if (status !== 'playing') return;
    setPicked(code);
    if (code === daily.puzzle.answer) {
      setStatus('won');
      setMessage(`Correct. ${daily.puzzle.reason}`);
    } else {
      setMessage('Not quite. Try another option.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '520px', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginBottom: '0.5rem' }}>
          Daily Puzzle #{daily.puzzle.id}
        </div>
        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Pick the country that doesn’t belong.</div>
      </div>

      <div style={{ width: '100%', maxWidth: '600px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        {daily.puzzle.options.map((code) => {
          const country = countries.find((c) => c.code === code);
          const isPicked = picked === code;
          const isCorrect = code === daily.puzzle.answer && status === 'won';
          return (
            <button
              key={code}
              onClick={() => handlePick(code)}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '1rem',
                background: isCorrect ? 'var(--foreground)' : 'var(--surface)',
                color: isCorrect ? 'var(--background)' : 'var(--foreground)',
                boxShadow: isPicked ? '0 8px 16px rgba(0,0,0,0.12)' : 'none',
                fontWeight: 600,
              }}
            >
              <img src={`https://flagcdn.com/w160/${code}.png`} alt={country?.name || code} style={{ width: '72px', borderRadius: '8px' }} />
              <div style={{ marginTop: '0.5rem' }}>{country?.name || code}</div>
            </button>
          );
        })}
      </div>

      {message && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', width: '100%', maxWidth: '520px', textAlign: 'center' }}>
          {message}
        </div>
      )}
    </div>
  );
}
