'use client';

import { useEffect, useState } from 'react';
import { getDayIndex, getLocalDateKey } from '@/lib/daily';
import { readStorageJSON, writeStorageJSON } from '@/lib/browserStorage';
import { oddOneOutPuzzles } from '@/data/oddOneOut';
import { countries } from '@/data/countries';

const PREFS_KEY = 'geo-odd-one-out-prefs';
const SESSION_PREFIX = 'geo-odd-one-out-session';

interface OddOneOutPrefs {
  mode: 'daily' | 'practice';
  practiceOffset: number;
}

interface OddOneOutSession {
  picked: string | null;
  status: 'playing' | 'won';
  message: string;
}

export function OddOneOutGame() {
  const today = new Date();
  const dailyIndex = getDayIndex(today, oddOneOutPuzzles.length);
  const [mode, setMode] = useState<'daily' | 'practice'>('daily');
  const [practiceOffset, setPracticeOffset] = useState(1);
  const [hydrated, setHydrated] = useState(false);
  const puzzleIndex = mode === 'daily'
    ? dailyIndex
    : (dailyIndex + practiceOffset) % oddOneOutPuzzles.length;
  const puzzle = oddOneOutPuzzles[puzzleIndex];
  const dateLabel = getLocalDateKey(today);
  const sessionKey = `${SESSION_PREFIX}-${dateLabel}-${mode}-${puzzle.id}`;

  const [picked, setPicked] = useState<string | null>(null);
  const [status, setStatus] = useState<'playing' | 'won'>('playing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const prefs = readStorageJSON<Partial<OddOneOutPrefs>>(PREFS_KEY, {});
    if (prefs.mode === 'daily' || prefs.mode === 'practice') {
      setMode(prefs.mode);
    }
    if (typeof prefs.practiceOffset === 'number' && Number.isFinite(prefs.practiceOffset) && prefs.practiceOffset >= 0) {
      setPracticeOffset(Math.floor(prefs.practiceOffset));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorageJSON<OddOneOutPrefs>(PREFS_KEY, {
      mode,
      practiceOffset,
    });
  }, [hydrated, mode, practiceOffset]);

  useEffect(() => {
    if (!hydrated) return;
    const saved = readStorageJSON<OddOneOutSession | null>(sessionKey, null);
    if (saved) {
      setPicked(typeof saved.picked === 'string' ? saved.picked : null);
      setStatus(saved.status === 'won' ? 'won' : 'playing');
      setMessage(typeof saved.message === 'string' ? saved.message : '');
      return;
    }

    setPicked(null);
    setStatus('playing');
    setMessage('');
  }, [hydrated, sessionKey]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorageJSON<OddOneOutSession>(sessionKey, {
      picked,
      status,
      message,
    });
  }, [hydrated, sessionKey, picked, status, message]);

  const handlePick = (code: string) => {
    if (status !== 'playing') return;
    setPicked(code);
    if (code === puzzle.answer) {
      setStatus('won');
      setMessage(`Correct. ${puzzle.reason}`);
    } else {
      setMessage('Not quite. Try another option.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '520px', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginBottom: '0.5rem' }}>
          {mode === 'daily' ? `Daily Puzzle #${puzzle.id}` : `Practice Puzzle #${puzzle.id}`} • {dateLabel}
        </div>
        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Pick the country that doesn’t belong.</div>
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
              onClick={() => setPracticeOffset((prev) => (prev + 1) % oddOneOutPuzzles.length)}
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
              Next Puzzle
            </button>
          )}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '600px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        {puzzle.options.map((code) => {
          const country = countries.find((c) => c.code === code);
          const isPicked = picked === code;
          const isCorrect = code === puzzle.answer && status === 'won';
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
