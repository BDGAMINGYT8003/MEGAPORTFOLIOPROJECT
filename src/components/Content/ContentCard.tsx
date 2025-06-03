// src/components/Content/ContentCard.tsx
import React, { ReactNode } from 'react';
import styles from './ContentCard.module.css';

interface ContentCardProps {
  title: string;
  children: ReactNode; // For the main content, like list of details
  footerText?: string; // For optional footer text like "Hidden clue" or "Detective"
}

const ContentCard: React.FC<ContentCardProps> = ({ title, children, footerText }) => {
  return (
    <article className={styles.contentCard}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>
        {children}
      </div>
      {footerText && (
        <footer className={styles.footer}>
          {footerText}
        </footer>
      )}
    </article>
  );
};

export default ContentCard;
