import { useState, useRef, useEffect } from 'react';
import { countries } from '@/data/countries';

interface GuessInputProps {
  onGuess: (code: string) => void;
  guesses: string[];
}

export function GuessInput({ onGuess, guesses }: GuessInputProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const availableCountries = countries.filter(c => !guesses.includes(c.code));
  
  const filtered = availableCountries.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exactMatch = filtered.find(c => c.name.toLowerCase() === query.toLowerCase());
    if (exactMatch) {
      onGuess(exactMatch.code);
      setQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="animate-fade-in-up" style={{ position: 'relative', width: '100%', maxWidth: '380px', margin: '2rem auto', animationDelay: '0.4s' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={(e) => {
            setIsOpen(true);
            e.target.style.boxShadow = '0 0 0 2px var(--primary), 0 8px 32px rgba(139, 92, 246, 0.4)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
          }}
          placeholder="Guess a country..."
          className="guess-input glass"
          style={{ width: '100%', padding: '1.25rem 1.5rem', fontSize: '1.125rem', outline: 'none', color: 'var(--foreground)', borderRadius: '24px', letterSpacing: '0.02em', transition: 'all 0.3s ease' }}
        />
        <button type="submit" style={{ display: 'none' }}>Submit</button>
      </form>
      
      {isOpen && query && filtered.length > 0 && (
        <ul className="autocomplete glass animate-fade-in-up" style={{ position: 'absolute', top: 'calc(100% + 12px)', left: 0, right: 0, maxHeight: '240px', overflowY: 'auto', listStyle: 'none', margin: 0, padding: '0.5rem', zIndex: 10, borderRadius: '16px', animationDuration: '0.2s', animationDelay: '0s' }}>
          {filtered.map(c => (
            <li 
              key={c.code}
              onClick={() => {
                setQuery(c.name);
                onGuess(c.code);
                setQuery('');
                setIsOpen(false);
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              style={{ padding: '0.85rem 1.25rem', cursor: 'pointer', borderRadius: '8px', transition: 'background-color 0.2s ease', fontWeight: 500 }}
            >
              {c.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
