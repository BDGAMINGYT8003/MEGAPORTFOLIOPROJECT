// src/components/Layout/PageLayout.tsx
import React, { ReactNode } from 'react';
import Header from './Header'; // Will create next
import Footer from './Footer'; // Will create next
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
