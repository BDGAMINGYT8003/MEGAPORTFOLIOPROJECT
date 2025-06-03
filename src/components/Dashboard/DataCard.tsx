// src/components/Dashboard/DataCard.tsx
import React from 'react';
import styles from './DataCard.module.css';

interface DataCardProps {
  title: string;
  items: { label: string; value: string | number; id?: string }[];
}

const DataCard: React.FC<DataCardProps> = ({ title, items }) => {
  return (
    <div className={styles.dataCard}>
      <h3 className={styles.title}>{title}</h3>
      {items.map((item, index) => (
        <p key={index} className={styles.item}>
          <span className={styles.label}>{item.label}: </span>
          <span id={item.id} className={styles.value}>
            {item.value}
          </span>
        </p>
      ))}
    </div>
  );
};

export default DataCard;
