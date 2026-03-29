import { useState, useEffect } from 'react';
import { getDailyPuzzle, PuzzleGroup } from '@/data/puzzles';

interface GameStats {
  totalPlayed: number;
  totalWins: number;
  currentStreak: number;
  maxStreak: number;
  lastPlayedDate: string | null;
  lastWinDate: string | null;
}

const defaultStats: GameStats = {
  totalPlayed: 0,
  totalWins: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastPlayedDate: null,
  lastWinDate: null,
};

export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function useGameState() {
  const [mounted, setMounted] = useState(false);
  
  const puzzle = getDailyPuzzle();
  
  const [selected, setSelected] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<PuzzleGroup[]>([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [guessHistory, setGuessHistory] = useState<string[][]>([]);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [boardOrder, setBoardOrder] = useState<string[]>([]);
  const [oneAway, setOneAway] = useState(false);
  const [challengeMode, setChallengeMode] = useState<'standard' | 'challenge'>('challenge');
  const [revealedHintThemes, setRevealedHintThemes] = useState<string[]>([]);
  const [timePressureMode, setTimePressureMode] = useState(false);
  const [pressureStart, setPressureStart] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [stats, setStats] = useState<GameStats>(defaultStats);

  // Initialize board
  useEffect(() => {
    setMounted(true);
    const savedState = localStorage.getItem('geo-connections-' + puzzle.id);
    const savedStats = localStorage.getItem('geo-connections-stats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats({
          totalPlayed: parsedStats.totalPlayed ?? 0,
          totalWins: parsedStats.totalWins ?? 0,
          currentStreak: parsedStats.currentStreak ?? 0,
          maxStreak: parsedStats.maxStreak ?? 0,
          lastPlayedDate: parsedStats.lastPlayedDate ?? null,
          lastWinDate: parsedStats.lastWinDate ?? null,
        });
      } catch (e) {
        setStats(defaultStats);
      }
    }
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        const allMembers = puzzle.groups.flatMap(g => g.members);
        const boardOrder: string[] | undefined = parsed.boardOrder;
        const boardOrderIsValid = Array.isArray(boardOrder)
          && boardOrder.length === allMembers.length
          && boardOrder.every(code => allMembers.includes(code))
          && new Set(boardOrder).size === allMembers.length;

        if (boardOrderIsValid) {
          const parsedHints: string[] = Array.isArray(parsed.revealedHintThemes)
            ? (parsed.revealedHintThemes as unknown[]).filter((t: unknown): t is string => typeof t === 'string')
            : [];
          const validHintThemes = parsedHints.filter((t) => puzzle.groups.some(g => g.theme === t));
          const savedPressureMode = parsed.timePressureMode === true;
          const savedPressureStart = typeof parsed.pressureStart === 'number' ? parsed.pressureStart : null;

          setSolvedGroups(parsed.solvedGroups);
          setMistakesRemaining(parsed.mistakesRemaining);
          setGuessHistory(parsed.guessHistory);
          setStatus(parsed.status);
          setBoardOrder(boardOrder);
          setChallengeMode(parsed.challengeMode ?? 'challenge');
          setRevealedHintThemes(validHintThemes);
          setTimePressureMode(savedPressureMode);
          if (savedPressureMode && savedPressureStart) {
            setPressureStart(savedPressureStart);
            setElapsedSeconds(Math.max(0, Math.floor((Date.now() - savedPressureStart) / 1000)));
          } else {
            setPressureStart(null);
            setElapsedSeconds(0);
          }
          return;
        }
      } catch (e) {
        // fail silently, reset
      }
    }

    // Default init
    const allMembers = puzzle.groups.flatMap(g => g.members);
    setBoardOrder(shuffleArray(allMembers));
  }, [puzzle.id]);

  // Save state
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('geo-connections-' + puzzle.id, JSON.stringify({
      solvedGroups,
      mistakesRemaining,
      guessHistory,
      status,
      boardOrder,
      challengeMode,
      revealedHintThemes,
      timePressureMode,
      pressureStart
    }));
  }, [solvedGroups, mistakesRemaining, guessHistory, status, boardOrder, puzzle.id, mounted, challengeMode, revealedHintThemes, timePressureMode, pressureStart]);

  const toggleChallengeMode = () => {
    setChallengeMode((mode) => (mode === 'challenge' ? 'standard' : 'challenge'));
  };

  const toggleTimePressure = () => {
    setTimePressureMode((prev) => {
      const next = !prev;
      if (next) {
        const now = Date.now();
        setPressureStart(now);
        setElapsedSeconds(0);
      } else {
        setPressureStart(null);
        setElapsedSeconds(0);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!mounted) return;
    if (!timePressureMode || status !== 'playing' || pressureStart === null) return;

    const tick = () => {
      const seconds = Math.max(0, Math.floor((Date.now() - pressureStart) / 1000));
      setElapsedSeconds(seconds);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [mounted, timePressureMode, status, pressureStart]);

  const hintedThemesSet = new Set(revealedHintThemes);
  const solvedThemesSet = new Set(solvedGroups.map(g => g.theme));
  const hintCandidates = puzzle.groups.filter(g => !solvedThemesSet.has(g.theme) && !hintedThemesSet.has(g.theme));
  const hintsRemaining = hintCandidates.length;

  const revealHint = () => {
    if (status !== 'playing' || mistakesRemaining <= 0 || hintCandidates.length === 0) return;

    const nextHint = hintCandidates[Math.floor(Math.random() * hintCandidates.length)];
    const newMistakes = Math.max(0, mistakesRemaining - 1);

    setRevealedHintThemes([...revealedHintThemes, nextHint.theme]);
    setMistakesRemaining(newMistakes);
    setOneAway(false);

    if (newMistakes === 0) {
      setStatus('lost');
      setSelected([]);
    }
  };

  useEffect(() => {
    if (!mounted) return;
    if (status === 'playing') return;

    const historyKey = 'geo-connections-history';
    const statsKey = 'geo-connections-stats';
    const todayKey = puzzle.date;

    const historyRaw = localStorage.getItem(historyKey);
    let history: Record<string, unknown> = {};
    if (historyRaw) {
      try {
        history = JSON.parse(historyRaw);
      } catch (e) {
        history = {};
      }
    }

    if (history[todayKey]) return;

    const entry = {
      status,
      guesses: guessHistory.length,
      challengeMode,
      timePressureMode,
      hintsUsed: revealedHintThemes.length,
      completedAt: Date.now(),
    };

    history[todayKey] = entry;
    localStorage.setItem(historyKey, JSON.stringify(history));

    const nextStats: GameStats = { ...stats };
    nextStats.totalPlayed += 1;
    nextStats.totalWins += status === 'won' ? 1 : 0;
    nextStats.lastPlayedDate = todayKey;

    if (status === 'won') {
      if (nextStats.lastWinDate) {
        const lastWin = new Date(nextStats.lastWinDate + 'T00:00:00');
        const today = new Date(todayKey + 'T00:00:00');
        const diffDays = Math.round((today.getTime() - lastWin.getTime()) / (1000 * 60 * 60 * 24));
        nextStats.currentStreak = diffDays === 1 ? nextStats.currentStreak + 1 : 1;
      } else {
        nextStats.currentStreak = 1;
      }
      nextStats.lastWinDate = todayKey;
      nextStats.maxStreak = Math.max(nextStats.maxStreak, nextStats.currentStreak);
    } else {
      nextStats.currentStreak = 0;
    }

    setStats(nextStats);
    localStorage.setItem(statsKey, JSON.stringify(nextStats));
  }, [mounted, status, puzzle.date, guessHistory.length, challengeMode, timePressureMode, revealedHintThemes.length, stats]);

  const toggleSelection = (code: string) => {
    if (status !== 'playing') return;
    
    setOneAway(false); // clear one away message
    if (selected.includes(code)) {
      setSelected(selected.filter(c => c !== code));
    } else if (selected.length < 4) {
      setSelected([...selected, code]);
    }
  };

  const deselectAll = () => setSelected([]);

  const shuffleBoard = () => {
    if (status !== 'playing') return;
    
    const solvedCodes = new Set(solvedGroups.flatMap(g => g.members));
    const unsolvedCodes = boardOrder.filter(code => !solvedCodes.has(code));
    
    // Create new order: keep solved at top, shuffle the rest
    const newOrder = [
      ...boardOrder.filter(code => solvedCodes.has(code)),
      ...shuffleArray(unsolvedCodes)
    ];
    setBoardOrder(newOrder);
  };

  const submitGuess = () => {
    if (selected.length !== 4 || status !== 'playing') return;

    // Check if exactly this guess was already made
    const alreadyGuessed = guessHistory.some(
      guess => guess.length === 4 && guess.every(g => selected.includes(g))
    );
    if (alreadyGuessed) return;

    const newHistory = [...guessHistory, [...selected]];
    setGuessHistory(newHistory);

    // Check for match
    let matchedGroup = null;
    let maxOverlap = 0;

    for (const group of puzzle.groups) {
      const overlap = group.members.filter(m => selected.includes(m)).length;
      if (overlap === 4) {
        matchedGroup = group;
        break;
      }
      if (overlap > maxOverlap) maxOverlap = overlap;
    }

    if (matchedGroup) {
      // Solved!
      const newSolved = [...solvedGroups, matchedGroup];
      setSolvedGroups(newSolved);
      setSelected([]);
      setOneAway(false);

      // Reorder board to put newly solved at top
      const solvedCodes = new Set(newSolved.flatMap(g => g.members));
      const unsolvedCodes = boardOrder.filter(code => !selected.includes(code) && !solvedCodes.has(code));
      
      const newOrder = [
        ...boardOrder.filter(code => solvedCodes.has(code) && !selected.includes(code)),
        ...selected,
        ...unsolvedCodes
      ];
      setBoardOrder(newOrder);

      if (newSolved.length === 4) {
        setStatus('won');
      }
    } else {
      // Mistake
      const newMistakes = mistakesRemaining - 1;
      setMistakesRemaining(newMistakes);
      setOneAway(maxOverlap === 3);

      if (newMistakes === 0) {
        setStatus('lost');
        setSelected([]);
        // reorder board to reveal all? Just end game for now.
      }
    }
  };

  return {
    puzzle,
    mounted,
    selected,
    solvedGroups,
    mistakesRemaining,
    guessHistory,
    status,
    boardOrder,
    oneAway,
    challengeMode,
    revealedHintThemes,
    hintsRemaining,
    timePressureMode,
    elapsedSeconds,
    stats,
    toggleSelection,
    deselectAll,
    shuffleBoard,
    submitGuess,
    toggleChallengeMode,
    toggleTimePressure,
    revealHint
  };
}
