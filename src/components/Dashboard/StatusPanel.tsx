// src/components/Dashboard/StatusPanel.tsx
import React from 'react';
import styles from './StatusPanel.module.css';

interface StatusPanelProps {
  items: { label: string; value: string | number; id?: string; indicator?: 'active' | 'passive' | 'none' }[];
}

const StatusPanel: React.FC<StatusPanelProps> = ({ items }) => {
  return (
    <div className={styles.statusPanel}>
      {items.map((item, index) => (
        <span key={index} className={styles.statusItem}>
          {item.label}:{' '}
          <span id={item.id} className={styles.value}>
            {item.value}
          </span>
          {item.indicator && item.indicator !== 'none' && (
            <span className={`${styles.statusIndicator} ${item.indicator === 'active' ? styles.statusActive : styles.statusPassive}`} />
          )}
        </span>
      ))}
    </div>
  );
};

export default StatusPanel;
