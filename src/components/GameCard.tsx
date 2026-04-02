import Link from 'next/link';

interface GameCardProps {
  title: string;
  description: string;
  href: string;
  tag?: string;
  status?: 'live' | 'beta' | 'soon';
}

const statusStyles = {
  live: { background: 'var(--foreground)', color: 'var(--background)' },
  beta: { background: '#dbeafe', color: '#1e3a8a' },
  soon: { background: 'var(--border)', color: 'var(--foreground)' },
};

export function GameCard({ title, description, href, tag, status = 'live' }: GameCardProps) {
  const badge = statusStyles[status];

  return (
    <Link
      href={href}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        background: 'var(--surface)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.35rem' }}>{title}</h2>
        <span style={{ ...badge, fontSize: '0.7rem', padding: '0.25rem 0.6rem', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
          {status}
        </span>
      </div>
      <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>{description}</p>
      {tag && (
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6 }}>
          {tag}
        </span>
      )}
    </Link>
  );
}
