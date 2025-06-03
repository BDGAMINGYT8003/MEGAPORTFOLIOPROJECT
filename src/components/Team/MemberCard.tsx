// src/components/Team/MemberCard.tsx
import React from 'react';
import styles from './MemberCard.module.css';

interface MemberCardProps {
  imageUrl: string;
  altText: string;
  name: string;
  details: {
    role: string;
    expertise: string;
    strength: string;
    motto: string;
  };
}

const MemberCard: React.FC<MemberCardProps> = ({ imageUrl, altText, name, details }) => {
  return (
    <div className={styles.memberCard}>
      <img src={imageUrl} alt={altText} className={styles.profilePic} />
      <h3 className={styles.name}>{name}</h3>
      <ul className={styles.detailsList}>
        <li><strong>Role:</strong> {details.role}</li>
        <li><strong>Expertise:</strong> {details.expertise}</li>
        <li><strong>Strength:</strong> {details.strength}</li>
        <li><strong>Motto:</strong> "{details.motto}"</li>
      </ul>
    </div>
  );
};

export default MemberCard;
