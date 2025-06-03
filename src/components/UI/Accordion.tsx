// src/components/UI/Accordion.tsx
import React, { useState, ReactNode } from 'react';
import styles from './Accordion.module.css';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean; // Allow pre-setting open state
  onToggle?: () => void; // Callback for when an item is toggled
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen = false, onToggle }) => {
  const [isContentVisible, setIsContentVisible] = useState(isOpen);

  const handleToggle = () => {
    setIsContentVisible(!isContentVisible);
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div className={`${styles.accordionItem} ${isContentVisible ? styles.open : ''}`}>
      <button className={styles.accordionTitle} onClick={handleToggle} aria-expanded={isContentVisible}>
        <span>{title}</span>
        <span className={styles.icon}>{isContentVisible ? '−' : '►'}</span>
      </button>
      {isContentVisible && (
        <div className={styles.accordionContent}>
          {children}
        </div>
      )}
    </div>
  );
};

interface AccordionProps {
    children: ReactNode | ReactNode[];
    // allowMultipleOpen?: boolean; // Future enhancement
    // defaultOpenIndex?: number; // Future enhancement
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return <div className={styles.accordion}>{children}</div>;
};

export default Accordion;
