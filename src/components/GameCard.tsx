import Link from 'next/link';
import styles from './GameCard.module.css';

interface GameCardProps {
  title: string;
  description: string;
  href: string;
  tag?: string;
  status?: 'live' | 'beta' | 'soon';
  icons?: string[];
  index?: number;
}

export function GameCard({ title, description, href, tag, status = 'live', icons = [], index }: GameCardProps) {
  const badgeClass = status === 'live'
    ? styles.badgeLive
    : status === 'beta'
      ? styles.badgeBeta
      : styles.badgeSoon;

  return (
    <Link href={href} className={styles.card} data-index={index ? String(index) : ''}>
      <div className={styles.cardHeader}>
        <div className={styles.icons}>
          {icons.map((icon, idx) => (
            <span key={`${title}-icon-${idx}`}>{icon}</span>
          ))}
        </div>
        <span className={`${styles.badge} ${badgeClass}`}>{status}</span>
      </div>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <span>{tag ?? ''}</span>
        <span className={styles.cta}>Play →</span>
      </div>
    </Link>
  );
}
