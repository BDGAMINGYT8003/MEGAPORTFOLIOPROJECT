// src/components/Layout/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';
// Placeholder for a proper icon later
const CopyrightIcon = () => <span className={styles.copyrightIcon}>©</span>;

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyrightInfo}>
        <CopyrightIcon /> {new Date().getFullYear()} THE ECTOPLASMIC INVESTIGATORS
      </p>
      <p>SECRET LOGS AWAIT DISCOVERY</p>
    </footer>
  );
};

export default Footer;
