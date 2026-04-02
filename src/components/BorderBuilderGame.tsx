'use client';

import { useMemo, useState, useEffect } from 'react';
import { getDailyBorderBuilder } from '@/data/borderBuilder';
import { countries } from '@/data/countries';

const TIMER_SECONDS = 60;

export function BorderBuilderGame() {
  const daily = getDailyBorderBuilder();
  const [chain, setChain] = useState<string[]>([daily.startCountry]);
  const [noRepeats, setNoRepeats] = useState(true);
  const [timerMode, setTimerMode] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const [status, setStatus] = useState<'playing' | 'ended'>('playing');

  const region = daily.region;
  const current = chain[chain.length - 1];
  const used = new Set(chain);

  const neighbors = useMemo(() => {
    const base = region.neighbors[current] || [];
    return noRepeats ? base.filter((code) => !used.has(code)) : base;
  }, [current, region.neighbors, noRepeats, used]);

  useEffect(() => {
    if (!timerMode || status !== 'playing') return;
    if (secondsLeft <= 0) {
      setStatus('ended');
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setStatus('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerMode, status, secondsLeft]);

  useEffect(() => {
    if (neighbors.length === 0) {
      setStatus('ended');
    }
  }, [neighbors.length]);

  const handlePick = (code: string) => {
    if (status !== 'playing') return;
    setChain([...chain, code]);
  };

  const handleReset = () => {
    setChain([daily.startCountry]);
    setSecondsLeft(TIMER_SECONDS);
    setStatus('playing');
  };

  const currentCountry = countries.find((c) => c.code === current);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '520px', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>
          Region: {region.name}
        </div>
        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>
          Daily Start: {currentCountry?.name || current}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '520px', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginBottom: '0.5rem' }}>
          Current Country
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={`https://flagcdn.com/w160/${current}.png`}
            alt={currentCountry?.name || current}
            style={{ width: '80px', borderRadius: '8px', border: '1px solid var(--border)' }}
          />
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{currentCountry?.name || current}</div>
            <div style={{ opacity: 0.6, fontSize: '0.9rem' }}>Chain length: {chain.length}</div>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '520px' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <button
            onClick={() => setNoRepeats((prev) => !prev)}
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: noRepeats ? 'var(--foreground)' : 'transparent',
              color: noRepeats ? 'var(--background)' : 'var(--foreground)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            No Repeats {noRepeats ? 'On' : 'Off'}
          </button>
          <button
            onClick={() => {
              setTimerMode((prev) => !prev);
              setSecondsLeft(TIMER_SECONDS);
              setStatus('playing');
            }}
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: timerMode ? 'var(--foreground)' : 'transparent',
              color: timerMode ? 'var(--background)' : 'var(--foreground)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Timer {timerMode ? 'On' : 'Off'}
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--foreground)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Reset
          </button>
          {timerMode && (
            <div style={{ fontWeight: 700, fontSize: '0.95rem', padding: '0.6rem 1.1rem', borderRadius: '999px', border: '1px solid var(--border)' }}>
              {secondsLeft}s
            </div>
          )}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6 }}>
          Neighbors
        </div>
        {status === 'ended' && (
          <div style={{ padding: '0.75rem', borderRadius: '12px', border: '1px dashed var(--border)', textAlign: 'center' }}>
            Chain ended at length {chain.length}. Reset to try again.
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
          {neighbors.map((code) => {
            const country = countries.find((c) => c.code === code);
            return (
              <button
                key={code}
                onClick={() => handlePick(code)}
                disabled={status !== 'playing'}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  background: 'var(--surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600,
                }}
              >
                <img src={`https://flagcdn.com/w160/${code}.png`} alt={country?.name || code} style={{ width: '64px', borderRadius: '6px' }} />
                <span>{country?.name || code}</span>
              </button>
            );
          })}
          {neighbors.length === 0 && status === 'playing' && (
            <div style={{ padding: '0.75rem', borderRadius: '12px', border: '1px dashed var(--border)', textAlign: 'center' }}>
              No valid neighbors left.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
