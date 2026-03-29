'use client';
import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { ConnectionsBoard } from './ConnectionsBoard';
import { Controls } from './Controls';
import { StatsModal } from './StatsModal';
import { HowToPlayModal } from './HowToPlayModal';

export function Game() {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const { 
    puzzle, mounted, selected, solvedGroups, mistakesRemaining, 
    guessHistory, status, boardOrder, oneAway, challengeMode,
    revealedHintThemes, hintsRemaining, timePressureMode, elapsedSeconds, stats,
    toggleSelection, deselectAll, shuffleBoard, submitGuess, toggleChallengeMode, toggleTimePressure, revealHint
  } = useGameState();

  if (!mounted) {
    return (
      <div style={{ padding: '4rem', opacity: 0.5, fontFamily: 'Georgia, serif' }}>
        Loading puzzle...
      </div>
    );
  }

  // Generate little mistake circles
  const maxMistakes = 4;
  const mistakesArray = Array.from({ length: maxMistakes }).map((_, i) => i < mistakesRemaining);
  const mistakesUsed = Math.max(0, maxMistakes - mistakesRemaining);
  const PRESSURE_STEP_SECONDS = 45;
  const baseRevealStage = status === 'playing'
    ? (challengeMode === 'challenge' ? Math.min(3, mistakesUsed) : 3)
    : 3;
  const timePenalty = timePressureMode && status === 'playing'
    ? Math.floor(elapsedSeconds / PRESSURE_STEP_SECONDS)
    : 0;
  const revealStage = Math.max(0, baseRevealStage - timePenalty);
  const signalLabels = ['Fogged', 'Muted', 'Clear', 'Named'];
  const signalLabel = signalLabels[revealStage] || 'Clear';
  const timeToNextPenalty = PRESSURE_STEP_SECONDS - (elapsedSeconds % PRESSURE_STEP_SECONDS);
  const pressureMinutes = Math.floor(timeToNextPenalty / 60).toString().padStart(2, '0');
  const pressureSeconds = (timeToNextPenalty % 60).toString().padStart(2, '0');
  const pressureCountdown = `${pressureMinutes}:${pressureSeconds}`;
  const hintDisabled = status !== 'playing' || hintsRemaining === 0 || mistakesRemaining === 0;

  return (
    <div className="game-container animate-fade-in-up" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      <div style={{ borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', padding: '0.5rem 0', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span>Puzzle #{puzzle.id}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span>{puzzle.date}</span>
          {challengeMode === 'challenge' && (
            <span style={{ fontSize: '0.75rem', opacity: 0.7, letterSpacing: '0.08em' }}>Signal: {signalLabel}</span>
          )}
          {timePressureMode && status === 'playing' && (
            <span style={{ fontSize: '0.75rem', opacity: 0.7, letterSpacing: '0.08em' }}>Pressure: {pressureCountdown}</span>
          )}
          <button
            onClick={toggleChallengeMode}
            aria-pressed={challengeMode === 'challenge'}
            style={{
              borderRadius: '999px',
              border: '1px solid var(--border)',
              padding: '0.35rem 0.85rem',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: challengeMode === 'challenge' ? 'var(--foreground)' : 'transparent',
              color: challengeMode === 'challenge' ? 'var(--background)' : 'var(--foreground)',
              transition: 'all 0.2s',
            }}
          >
            {challengeMode === 'challenge' ? 'Challenge On' : 'Challenge Off'}
          </button>
          <button
            onClick={toggleTimePressure}
            aria-pressed={timePressureMode}
            style={{
              borderRadius: '999px',
              border: '1px solid var(--border)',
              padding: '0.35rem 0.85rem',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: timePressureMode ? 'var(--foreground)' : 'transparent',
              color: timePressureMode ? 'var(--background)' : 'var(--foreground)',
              transition: 'all 0.2s',
            }}
          >
            {timePressureMode ? 'Pressure On' : 'Pressure Off'}
          </button>
          <button
            onClick={() => setShowHowToPlay(true)}
            style={{
              borderRadius: '999px',
              border: '1px solid var(--border)',
              padding: '0.35rem 0.85rem',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: 'transparent',
              color: 'var(--foreground)',
              transition: 'all 0.2s',
            }}
          >
            How to Play
          </button>
        </div>
      </div>

      {revealedHintThemes.length > 0 && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1px dashed var(--border)', background: 'var(--surface)', textAlign: 'left', fontSize: '0.9rem', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem', opacity: 0.7 }}>
            Hints Used
          </div>
          {revealedHintThemes.map((theme, idx) => (
            <div key={theme} style={{ fontWeight: 600 }}>
              Hint {idx + 1}: {theme}
            </div>
          ))}
        </div>
      )}

      <ConnectionsBoard 
        boardOrder={boardOrder}
        solvedGroups={solvedGroups}
        selected={selected}
        revealStage={revealStage}
        toggleSelection={toggleSelection}
      />
      
      {status === 'playing' && (
        <div style={{ marginTop: '1rem', textAlign: 'center', minHeight: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.8 }}>Mistakes remaining:</span>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {mistakesArray.map((isRemaining, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    width: '12px', height: '12px', 
                    borderRadius: '50%', 
                    backgroundColor: isRemaining ? 'var(--foreground)' : 'var(--border)',
                    transition: 'background-color 0.3s'
                  }} 
                />
              ))}
            </div>
          </div>
          
          <div style={{ height: '24px', opacity: oneAway ? 1 : 0, transition: 'opacity 0.3s', color: 'var(--error)', fontWeight: 600, animation: oneAway ? 'shake 0.4s' : 'none' }}>
            One away...
          </div>
          
          <Controls 
            selectedCount={selected.length}
            shuffleBoard={shuffleBoard}
            deselectAll={deselectAll}
            submitGuess={submitGuess}
            revealHint={revealHint}
            hintDisabled={hintDisabled}
            hintsRemaining={hintsRemaining}
            status={status}
          />
        </div>
      )}

      {status !== 'playing' && (
        <StatsModal 
          status={status} 
          guessHistory={guessHistory} 
          puzzle={puzzle}
          stats={stats}
          challengeMode={challengeMode}
          timePressureMode={timePressureMode}
          hintsUsed={revealedHintThemes.length}
        />
      )}

      <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
      
    </div>
  );
}
