// src/pages/LaboratoryPage.tsx
import React from 'react';
import MemberCard from '../components/Team/MemberCard';
import styles from './LaboratoryPage.module.css';

// --- IMAGE IMPORT ISSUE ---
// The original image files (Moin.png, Atif.png, etc.) are not available
// in the current project structure (e.g., src/assets/images/).
// Using placeholder strings for now. If images become available,
// these imports and paths should be updated.
// import moinImg from '../assets/images/Moin.png';
// import atifImg from '../assets/images/Atif.png';
// import fakhruddinImg from '../assets/images/Fakhruddin.png';
// import oliImg from '../assets/images/Oli.png';
// import nasirImg from '../assets/images/Nasir.png';

const placeholderImg = '/placeholder_image.png'; // A generic placeholder

const teamMembers = [
  {
    imageUrl: placeholderImg, // moinImg
    altText: 'Moin Uddin',
    name: 'Moin Uddin',
    details: {
      role: 'Lead Investigator',
      expertise: 'Ectoplasmic anomalies',
      strength: 'Analytical and fearless approach',
      motto: 'Uncovering secrets beyond the ordinary.',
    },
  },
  {
    imageUrl: placeholderImg, // atifImg
    altText: 'Atif Ullah',
    name: 'Atif Ullah',
    details: {
      role: 'Paranormal Acoustics Specialist',
      expertise: 'EVP analysis & spectral sound phenomena',
      strength: 'Exceptional auditory perception & pattern recognition',
      motto: 'Listen closely—the unseen speaks volumes.',
    },
  },
  {
    imageUrl: placeholderImg, // fakhruddinImg
    altText: 'Fakhruddin',
    name: 'Fakhruddin',
    details: {
      role: 'Tech Specialist',
      expertise: 'Digital archiving & data decryption',
      strength: 'Precision and methodical analysis',
      motto: 'Every byte holds a clue.',
    },
  },
  {
    imageUrl: placeholderImg, // oliImg
    altText: 'Oli Ullah',
    name: 'Oli Ullah',
    details: {
      role: 'Creative Field Operative',
      expertise: 'Artistic documentation of paranormal events',
      strength: 'Intuitive and innovative perspective',
      motto: 'Seeing the unseen with creativity.',
    },
  },
  {
    imageUrl: placeholderImg, // nasirImg
    altText: 'Nasir Uddin',
    name: 'Nasir Uddin',
    details: {
      role: 'Medical Expert',
      expertise: 'Human physiology and anomalous biological effects',
      strength: 'Calm under pressure, diagnostic precision',
      motto: 'Understanding the body\'s response to the unknown.',
    },
  },
];

const LaboratoryPage: React.FC = () => {
  return (
    <div className={styles.laboratoryPageContainer}>
      <h2 className={styles.pageTitle}>THE LABORATORY: CLASSIFIED TEAM INFO</h2>
      <div className={styles.memberGrid}>
        {teamMembers.map((member) => (
          <MemberCard
            key={member.name}
            imageUrl={member.imageUrl}
            altText={member.altText}
            name={member.name}
            details={member.details}
          />
        ))}
      </div>
    </div>
  );
};

export default LaboratoryPage;
