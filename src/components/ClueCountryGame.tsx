'use client';

import { useState } from 'react';
import { getDailyCluePuzzle } from '@/data/clueCountry';
import { countries } from '@/data/countries';
import { GuessInput } from './GuessInput';

export function ClueCountryGame() {
  const daily = getDailyCluePuzzle();
  const [clueIndex, setClueIndex] = useState(1);
  const [status, setStatus] = useState<'playing' | 'won'>('playing');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const answer = daily.puzzle.answer;
  const country = countries.find((c) => c.code === answer);
  const points = Math.max(1, 4 - clueIndex);

  const handleGuess = (code: string) => {
    if (status !== 'playing') return;
    setGuesses((prev) => [...prev, code]);
    if (code === answer) {
      setStatus('won');
      setMessage(`Correct! You earned ${points} point${points === 1 ? '' : 's'}.`);
    } else {
      setMessage('Not quite. Try another country or reveal a clue.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '520px', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginBottom: '0.5rem' }}>
          Daily Clue #{daily.puzzle.id}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {daily.puzzle.clues.slice(0, clueIndex).map((clue, idx) => (
            <div key={idx} style={{ padding: '0.65rem 0.75rem', borderRadius: '10px', border: '1px dashed var(--border)' }}>
              Clue {idx + 1}: {clue}
            </div>
          ))}
        </div>
        {status === 'playing' && clueIndex < 3 && (
          <button
            onClick={() => setClueIndex((prev) => Math.min(3, prev + 1))}
            style={{
              marginTop: '1rem',
              padding: '0.65rem 1.1rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: 'transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Reveal Next Clue (-1 point)
          </button>
        )}
      </div>

      <div style={{ width: '100%', maxWidth: '520px' }}>
        <GuessInput onGuess={handleGuess} guesses={guesses} />
      </div>

      {message && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', width: '100%', maxWidth: '520px', textAlign: 'center' }}>
          {message}
        </div>
      )}

      {status === 'won' && (
        <div style={{ width: '100%', maxWidth: '520px', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--surface)', textAlign: 'center' }}>
          <img src={`https://flagcdn.com/w160/${answer}.png`} alt={country?.name || answer} style={{ width: '96px', borderRadius: '10px' }} />
          <div style={{ fontWeight: 800, fontSize: '1.4rem', marginTop: '0.5rem' }}>{country?.name || answer}</div>
          <div style={{ opacity: 0.7, marginTop: '0.25rem' }}>Score: {points} points</div>
        </div>
      )}
    </div>
  );
}
