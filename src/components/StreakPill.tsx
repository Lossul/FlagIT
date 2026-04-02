'use client';

import { useEffect, useState } from 'react';

interface StreakPillProps {
  className?: string;
  dotsClassName?: string;
}

export function StreakPill({ className, dotsClassName }: StreakPillProps) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const statsRaw = localStorage.getItem('geo-connections-stats');
    if (!statsRaw) return;
    try {
      const stats = JSON.parse(statsRaw);
      if (typeof stats.currentStreak === 'number') {
        setStreak(stats.currentStreak);
      }
    } catch {
      setStreak(0);
    }
  }, []);

  const dots = Math.min(4, Math.max(0, streak));

  return (
    <div className={className}>
      <span className={dotsClassName}>
        {[0, 1, 2, 3].map((idx) => (
          <span key={idx} className={idx < dots ? 'active' : ''} />
        ))}
      </span>
      <span>{streak > 0 ? `${streak}-day streak` : 'Start a streak'}</span>
    </div>
  );
}
