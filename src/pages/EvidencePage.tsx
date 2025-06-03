// src/pages/EvidencePage.tsx
import React, { useState } from 'react';
import EvidenceCard from '../components/Evidence/EvidenceCard';
import Modal from '../components/UI/Modal';
import styles from './EvidencePage.module.css';

// Placeholder image paths - these need to be replaced with actual paths
const placeholderBase = '/placeholder_evidence_'; // Vite will look in `public` or handle from `assets`

interface EvidenceItem {
  id: string;
  thumbnailUrl: string;
  fullImageUrl: string; // Could be same as thumbnail if no larger version
  altText: string;
  title: string;
  details: Array<{ label: string; value: string }>;
  footerText: string;
}

const evidenceData: EvidenceItem[] = [
  { id: 'ev001', thumbnailUrl: `${placeholderBase}001.jpg`, fullImageUrl: `${placeholderBase}001.jpg`, altText: 'Spectral Frequency Recording from Koelpur', title: 'Artifact #001', details: [{ label: 'Evidence Type', value: 'Spectral Frequency Recording' }, { label: 'Description', value: 'Audio analysis printout showcasing peaks of unexplained frequency, captured from radios in Koelpur during midnight static events. Possible djinn voice fragments detected.' }, { label: 'Date of Discovery', value: '2024-03-10' }], footerText: 'Hidden clue: "Frequency analysis holds secrets... within the static."' },
  { id: 'ev002', thumbnailUrl: `${placeholderBase}002.jpg`, fullImageUrl: `${placeholderBase}002.jpg`, altText: 'Amtali Bamboo Grove Mud Sample', title: 'Artifact #002', details: [{ label: 'Evidence Type', value: 'Bamboo Grove Mud Sample' }, { label: 'Description', value: 'A sample of mud collected from the vanishing point of footprints in Amtali. Analysis reveals faint, unidentifiable imprints beneath the surface and traces of ectoplasmic residue.' }, { label: 'Date of Discovery', value: '2024-03-12' }], footerText: 'Hidden clue: "Imprints in mud... whispers of unseen passage."' },
  { id: 'ev003', thumbnailUrl: `${placeholderBase}003.jpg`, fullImageUrl: `${placeholderBase}003.jpg`, altText: 'Srimangal Tea Stall Temporal Distortion Field Recording', title: 'Artifact #003', details: [{ label: 'Evidence Type', value: 'Temporal Distortion Field Recording' }, { label: 'Description', value: 'Audio recording capturing anomalous temporal distortions near the Srimangal tea stall. Sounds of the past momentarily overlap with the present.' }, { label: 'Date of Discovery', value: '2024-03-15' }], footerText: 'Hidden clue: "Time echoes... in the aroma of tea."' },
  { id: 'ev004', thumbnailUrl: `${placeholderBase}004.jpg`, fullImageUrl: `${placeholderBase}004.jpg`, altText: 'Kushtia Shadow Puppet Theater Ectoplasmic Residue Sample', title: 'Artifact #004', details: [{ label: 'Evidence Type', value: 'Ectoplasmic Residue Sample' }, { label: 'Description', value: 'Ectoplasmic residue collected from the strings of shadow puppets at the Kushtia theater, indicating paranormal manipulation beyond simple mechanics.' }, { label: 'Date of Discovery', value: '2024-03-18' }], footerText: 'Hidden clue: "Residue of performance... strings pulled by unseen hands."' },
  { id: 'ev005', thumbnailUrl: `${placeholderBase}005.jpg`, fullImageUrl: `${placeholderBase}005.jpg`, altText: 'Chalan Beel Sunken Village Sonar Image', title: 'Artifact #005', details: [{ label: 'Evidence Type', value: 'Sonar Image' }, { label: 'Description', value: 'Sonar image displaying anomalous structures beneath Chalan Beel, corresponding to local legends of a sunken village. Material composition is inconclusive.' }, { label: 'Date of Discovery', value: '2024-03-20' }], footerText: 'Hidden clue: "Depths conceal... villages lost to time."' },
  { id: 'ev006', thumbnailUrl: `${placeholderBase}006.jpg`, fullImageUrl: `${placeholderBase}006.jpg`, altText: 'Bogra University Library Anomalous Text Photograph', title: 'Artifact #006', details: [{ label: 'Evidence Type', value: 'Anomalous Text Photograph' }, { label: 'Description', value: 'Photographic evidence of text vanishing and reappearing in a Bogra University library book. High-speed captures show no signs of physical alteration.' }, { label: 'Date of Discovery', value: '2024-03-22' }], footerText: 'Hidden clue: "Words shift... knowledge seeks its own form."' },
  { id: 'ev007', thumbnailUrl: `${placeholderBase}007.jpg`, fullImageUrl: `${placeholderBase}007.jpg`, altText: 'Faridpur Market Whispering Winds Audio Spectrogram', title: 'Artifact #007', details: [{ label: 'Evidence Type', value: 'Audio Spectrogram' }, { label: 'Description', value: 'Spectrogram of audio from Faridpur market, revealing structured, non-random patterns within the "whispering winds." Possible linguistic elements detected.' }, { label: 'Date of Discovery', value: '2024-03-25' }], footerText: 'Hidden clue: "Winds carry whispers... patterns emerge from chaos."' },
  { id: 'ev008', thumbnailUrl: `${placeholderBase}008.jpg`, fullImageUrl: `${placeholderBase}008.jpg`, altText: 'Dhamrai Spectral Rickshaw EMF Readings', title: 'Artifact #008', details: [{ label: 'Evidence Type', value: 'EMF Readings' }, { label: 'Description', value: 'Electromagnetic field readings from the Dhamrai spectral rickshaw encounter site. Spikes correlate with visual sightings and temperature drops.' }, { label: 'Date of Discovery', value: '2024-03-28' }], footerText: 'Hidden clue: "Energy spikes... a spectral passage marked."' },
  { id: 'ev009', thumbnailUrl: `${placeholderBase}009.jpg`, fullImageUrl: `${placeholderBase}009.jpg`, altText: 'Anderkilla Weeping Well Water Sample Analysis (Pre-Dry State)', title: 'Artifact #009', details: [{ label: 'Evidence Type', value: 'Water Sample Analysis (Archival)' }, { label: 'Description', value: 'Archival analysis of water from Anderkilla well before it dried. Contains unusual mineral concentrations and trace organic compounds not native to the region.' }, { label: 'Date of Discovery', value: '2024-03-30' }], footerText: 'Hidden clue: "Water remembers... even when the well is dry."' },
  { id: 'ev010', thumbnailUrl: `${placeholderBase}010.jpg`, fullImageUrl: `${placeholderBase}010.jpg`, altText: 'Minarpara Musjid Minaret Survey Data', title: 'Artifact #010', details: [{ label: 'Evidence Type', value: 'Minarpara Musjid Minaret Survey Data' }, { label: 'Description', value: "Geodetic survey data documenting nocturnal shifts in the Minarpara Musjid minaret's position. Discrepancies indicate subtle, non-tectonic movements occurring consistently during night hours." }, { label: 'Date of Discovery', value: '2024-04-01' }], footerText: 'Hidden clue: "Data reveals wanderings... structures too can stir at night."' },
];

const EvidencePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

  const handleOpenModal = (evidence: EvidenceItem) => {
    setSelectedEvidence(evidence);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvidence(null);
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>THE EVIDENCE: SPECTRAL RECORDS</h2>
      <div className={styles.grid}>
        {evidenceData.map((item) => (
          <EvidenceCard
            key={item.id}
            thumbnailUrl={item.thumbnailUrl}
            altText={item.altText}
            onOpenModal={() => handleOpenModal(item)}
          />
        ))}
      </div>

      {selectedEvidence && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className={styles.modalContentContainer}>
            <h3 className={styles.modalTitle}>{selectedEvidence.title}</h3>
            <img src={selectedEvidence.fullImageUrl} alt={selectedEvidence.altText} className={styles.modalImage} />
            <ul className={styles.modalDetailsList}>
              {selectedEvidence.details.map(detail => (
                <li key={detail.label}><strong>{detail.label}:</strong> {detail.value}</li>
              ))}
            </ul>
            <p className={styles.modalFooterText}>{selectedEvidence.footerText}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default EvidencePage;
