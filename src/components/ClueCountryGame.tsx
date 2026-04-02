'use client';

import { useEffect, useState } from 'react';
import { getDayIndex, getLocalDateKey } from '@/lib/daily';
import { cluePuzzles } from '@/data/clueCountry';
import { countries } from '@/data/countries';
import { GuessInput } from './GuessInput';

export function ClueCountryGame() {
  const today = new Date();
  const dailyIndex = getDayIndex(today, cluePuzzles.length);
  const [mode, setMode] = useState<'daily' | 'practice'>('daily');
  const [practiceOffset, setPracticeOffset] = useState(1);
  const puzzleIndex = mode === 'daily'
    ? dailyIndex
    : (dailyIndex + practiceOffset) % cluePuzzles.length;
  const puzzle = cluePuzzles[puzzleIndex];
  const dateLabel = getLocalDateKey(today);
  const [clueIndex, setClueIndex] = useState(1);
  const [status, setStatus] = useState<'playing' | 'won'>('playing');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setClueIndex(1);
    setStatus('playing');
    setGuesses([]);
    setMessage('');
  }, [puzzleIndex, mode]);

  const answer = puzzle.answer;
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
          {mode === 'daily' ? `Daily Clue #${puzzle.id}` : `Practice Clue #${puzzle.id}`} • {dateLabel}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {puzzle.clues.slice(0, clueIndex).map((clue, idx) => (
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
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          <button
            onClick={() => setMode((prev) => (prev === 'daily' ? 'practice' : 'daily'))}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: mode === 'practice' ? 'var(--foreground)' : 'transparent',
              color: mode === 'practice' ? 'var(--background)' : 'var(--foreground)',
              fontWeight: 700,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {mode === 'practice' ? 'Practice On' : 'Practice Off'}
          </button>
          {mode === 'practice' && (
            <button
              onClick={() => setPracticeOffset((prev) => (prev + 1) % cluePuzzles.length)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--foreground)',
                fontWeight: 700,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Next Clue
            </button>
          )}
        </div>
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
