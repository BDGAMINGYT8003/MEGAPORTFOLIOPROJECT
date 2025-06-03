// src/components/Evidence/EvidenceCard.tsx
import React from 'react';
import styles from './EvidenceCard.module.css';

interface EvidenceCardProps {
  thumbnailUrl: string;
  altText: string;
  onOpenModal: () => void; // Function to call when card is clicked
}

const EvidenceCard: React.FC<EvidenceCardProps> = ({ thumbnailUrl, altText, onOpenModal }) => {
  return (
    <div className={styles.evidenceCard} onClick={onOpenModal} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpenModal()}>
      <div className={styles.imageContainer}>
        <img src={thumbnailUrl} alt={altText} className={styles.galleryThumb} />
        <div className={styles.expandMessage}>Click to Expand</div>
      </div>
      {/* Title/short description could be added here if needed directly on card */}
    </div>
  );
};

export default EvidenceCard;
