'use client';

import { useEffect, useMemo, useState } from 'react';
import { getDailyMapClick, mapCountryMarkers } from '@/data/mapClick';
import { countries } from '@/data/countries';

const TIMER_SECONDS = 75;

export function MapClickGame() {
  const daily = getDailyMapClick();
  const [targetIndex, setTargetIndex] = useState(daily.startIndex);
  const [streak, setStreak] = useState(0);
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [timerMode, setTimerMode] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const [status, setStatus] = useState<'playing' | 'ended'>('playing');

  const regionCodes = daily.region.countries;
  const targetCode = regionCodes[targetIndex % regionCodes.length];
  const targetCountry = countries.find((c) => c.code === targetCode)?.name || targetCode.toUpperCase();

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

  const handlePick = (code: string) => {
    if (status !== 'playing') return;
    setLastClicked(code);
    if (code === targetCode) {
      setMessage('Nice! Keep the streak going.');
      setStreak((prev) => prev + 1);
      setTargetIndex((prev) => (prev + 1) % regionCodes.length);
    } else {
      const clickedName = countries.find((c) => c.code === code)?.name || code.toUpperCase();
      setMessage(`${clickedName} is not the target.`);
      setStreak(0);
    }
  };

  const handleReset = () => {
    setStatus('playing');
    setSecondsLeft(TIMER_SECONDS);
    setStreak(0);
    setTargetIndex(daily.startIndex);
    setLastClicked(null);
    setMessage('');
  };

  const markers = useMemo(() => mapCountryMarkers, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.6 }}>
          Region Focus: {daily.region.name}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setTimerMode((prev) => !prev);
              setSecondsLeft(TIMER_SECONDS);
              setStatus('playing');
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: timerMode ? 'var(--foreground)' : 'transparent',
              color: timerMode ? 'var(--background)' : 'var(--foreground)',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Timer {timerMode ? 'On' : 'Off'}
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--foreground)',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Reset
          </button>
          {timerMode && (
            <div style={{ padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid var(--border)', fontWeight: 700 }}>
              {secondsLeft}s
            </div>
          )}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '900px', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.6 }}>
          Click the country:
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.35rem' }}>{targetCountry}</div>
        <div style={{ opacity: 0.6, marginTop: '0.25rem' }}>Streak: {streak}</div>
      </div>

      <div style={{ width: '100%', maxWidth: '900px', overflow: 'hidden', borderRadius: '18px', border: '1px solid var(--border)' }}>
        <svg viewBox="0 0 1000 560" style={{ width: '100%', height: 'auto', background: 'radial-gradient(circle at top, #fef3c7, #e2e8f0)' }}>
          <g fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" opacity="0.9">
            <path d="M60 120 L80 80 L140 60 L220 70 L300 90 L320 130 L290 160 L240 160 L190 150 L150 170 L110 190 L70 170 Z" />
            <path d="M280 250 L320 230 L360 250 L380 310 L350 360 L320 430 L300 450 L270 420 L250 360 L260 300 Z" />
            <path d="M520 120 L560 110 L610 120 L650 145 L690 170 L680 210 L640 230 L600 210 L560 190 L520 160 Z" />
            <path d="M540 230 L600 250 L650 270 L680 320 L680 380 L650 430 L600 450 L550 420 L520 360 L520 300 Z" />
            <path d="M700 150 L760 130 L840 140 L920 170 L960 220 L940 260 L880 250 L830 240 L780 260 L740 240 L700 200 Z" />
            <path d="M780 300 L830 300 L870 330 L910 360 L920 420 L880 460 L820 450 L790 420 L770 360 Z" />
          </g>

          {markers.map((marker) => {
            const isRegion = regionCodes.includes(marker.code);
            const isLast = lastClicked === marker.code;
            const isCorrect = isLast && marker.code === targetCode;
            const fill = isCorrect ? '#86efac' : isLast ? '#fecaca' : '#ffffff';
            return (
              <g key={marker.code}>
                <circle
                  cx={marker.cx}
                  cy={marker.cy}
                  r={marker.r}
                  onClick={() => handlePick(marker.code)}
                  style={{
                    cursor: 'pointer',
                    fill,
                    stroke: isRegion ? '#0f172a' : '#94a3b8',
                    strokeWidth: isRegion ? 2 : 1,
                    opacity: isRegion ? 1 : 0.4,
                    transition: 'all 0.2s ease',
                  }}
                />
                <circle
                  cx={marker.cx}
                  cy={marker.cy}
                  r={marker.r + 10}
                  fill="transparent"
                  onClick={() => handlePick(marker.code)}
                  style={{ cursor: 'pointer' }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {message && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', width: '100%', maxWidth: '520px', textAlign: 'center' }}>
          {message}
        </div>
      )}

      {status === 'ended' && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: '1px dashed var(--border)', width: '100%', maxWidth: '520px', textAlign: 'center' }}>
          Time’s up. Final streak: {streak}. Reset to play again.
        </div>
      )}
    </div>
  );
}
