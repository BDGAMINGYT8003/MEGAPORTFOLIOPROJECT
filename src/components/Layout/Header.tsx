// src/components/Layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import NavButton from '../UI/NavButton'; // Will create next

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>
          <h1>THE ECTOPLASMIC INVESTIGATORS</h1>
          <p>COMMAND CENTER • CLEARANCE LEVEL ALPHA</p>
        </Link>
      </div>
      <nav className={styles.navigation}>
        <NavButton to="/dossier" label="► THE DOSSIER" />
        <NavButton to="/laboratory" label="► THE LABORATORY" />
        <NavButton to="/casefiles" label="► CASE FILES" />
        <NavButton to="/evidence" label="► EVIDENCE ARCHIVES" />
        <NavButton to="/chronicle" label="► FIELD CHRONICLE" />
        <NavButton to="/oracle" label="► COMMAND ORACLE" />
        <NavButton to="/dispatch" label="► DISPATCH INQUIRY" />
      </nav>
    </header>
  );
};

export default Header;
