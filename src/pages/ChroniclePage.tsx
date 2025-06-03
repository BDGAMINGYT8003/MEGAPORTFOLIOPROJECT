// src/pages/ChroniclePage.tsx
import React from 'react';
import ContentCard from '../components/Content/ContentCard';
import styles from './ChroniclePage.module.css';

const chronicleEntriesData = [
  {
    title: 'Entry #010',
    details: [
      { label: 'Date', value: '2025-04-24' },
      { label: 'Subject', value: 'Minarpara Mobile Minaret - Surveying the Shift' },
      { label: 'Entry', value: "The Minarpara mosque's minaret's 'nocturnal wanderings' are, surprisingly, not entirely unfounded. Precise laser surveying conducted over several nights reveals minute, almost imperceptible, shifts in the minaret's position. Geological instability and slow soil creep are identified as the cause. The 'divine displeasure' is simply the earth subtly rearranging itself. While not paranormal, the phenomenon is a testament to the slow, powerful forces of nature. Case resolved; recommending structural assessment of the mosque." },
      { label: 'Detective', value: 'Agent Fakhruddin' },
    ],
    footerText: 'Hidden clue: "Even the steadfast can be moved by unseen forces."',
  },
  {
    title: 'Entry #009',
    details: [
      { label: 'Date', value: '2025-04-17' },
      { label: 'Subject', value: 'Anderkilla Weeping Well - Unearthing the Lament' },
      { label: 'Entry', value: "The weeping well of Anderkilla is indeed emanating sounds of distress, even in its dryness. Seismic sensors placed around the well detect subtle vibrations originating deep underground. Geological survey reveals an underground water cavity where trapped air is being slowly released through narrow fissures, creating low, sobbing sounds. The 'phantom's lament' is the earth itself sighing. Case resolved; a poignant reminder of nature's subtle voices." },
      { label: 'Detective', value: 'Agent Oli Ullah' },
    ],
    footerText: 'Hidden clue: "Earth\'s sorrow echoes in the quiet depths."',
  },
  {
    title: 'Entry #008',
    details: [
      { label: 'Date', value: '2025-04-10' },
      { label: 'Subject', value: 'Dhamrai Spectral Rickshaw - First Contact' },
      { label: 'Entry', value: "Initial night-time observation in Dhamrai. Witnessed the spectral rickshaw phenomenon. It appeared suddenly at a crossroads, eerily silent. Our EMF meters spiked briefly. Attempted to approach, but it vanished into the fog. The air grew cold. No photographic evidence captured this time. The local legends hold a strong grip here. Further investigation warranted." },
      { label: 'Detective', value: 'Agent Moin Uddin' },
    ],
    footerText: 'Hidden clue: "Some roads are travelled by more than the living."',
  },
  {
    title: 'Entry #007',
    details: [
      { label: 'Date', value: '2025-04-03' },
      { label: 'Subject', value: 'Faridpur Market Whispers - Acoustic Patrol' },
      { label: 'Entry', value: "Conducted a late-night acoustic sweep of Faridpur market. The reported whispers are subtle, almost subliminal. Our parabolic microphones picked up faint, overlapping murmurs with no discernible language. Could be wind drafts, or something else. Setting up more sensitive, shielded recording devices for the next phase." },
      { label: 'Detective', value: 'Agent Atif Ullah' },
    ],
    footerText: 'Hidden clue: "The silence of the market is never truly silent."',
  },
  {
    title: 'Entry #006',
    details: [
      { label: 'Date', value: '2025-03-27' },
      { label: 'Subject', value: 'Bogra University Vanishing Text - Initial Findings' },
      { label: 'Entry', value: "Interviewed students and faculty at Bogra University. The 'vanishing text' seems localized to specific older books in the main library. Examined affected pages; no immediate signs of chemical alteration. The library itself has a heavy, oppressive atmosphere. Could be a highly localized psychic imprint or a very clever prank. Long-term observation needed." },
      { label: 'Detective', value: 'Agent Nasir Uddin' },
    ],
    footerText: 'Hidden clue: "Words have power, even when they disappear."',
  },
  {
    title: 'Entry #005',
    details: [
      { label: 'Date', value: '2025-03-20' },
      { label: 'Subject', value: 'Chalan Beel Sunken Village - Dawn Observation' },
      { label: 'Entry', value: "Observed Chalan Beel at dawn. The mist was thick. Saw faint, shimmering outlines that could be interpreted as structures, but too indistinct. The 'sounds of life' were likely distorted calls of birds or other wildlife. However, the local conviction is strong. We will cross-reference with historical maps for any records of actual submerged settlements." },
      { label: 'Detective', value: 'Agent Moin Uddin' },
    ],
    footerText: 'Hidden clue: "Memories can be as fleeting as mist on water."',
  },
  {
    title: 'Entry #004',
    details: [
      { label: 'Date', value: '2025-03-13' },
      { label: 'Subject', value: 'Kushtia Shadow Puppets - Strings of Deception' },
      { label: 'Entry', value: "The Kushtia shadow puppets were indeed moving after hours. However, careful observation revealed fine, almost invisible threads manipulated by a disgruntled former employee of the theater, seeking to create a 'haunted' reputation to drive the current owner out. A clever ruse, but ultimately mundane. Case closed. The real drama was human, not spectral." },
      { label: 'Detective', value: 'Agent Oli Ullah' },
    ],
    footerText: 'Hidden clue: "The greatest puppeteers are often unseen by choice."',
  },
  {
    title: 'Entry #003',
    details: [
      { label: 'Date', value: '2025-03-06' },
      { label: 'Subject', value: 'Srimangal Time-Slip Tea Stall - Brewing Theories' },
      { label: 'Entry', value: "Visited the tea stall in Srimangal. The 'time-slip' experiences are sporadic and subjective. The owner mentioned using locally sourced, potent herbs in his tea. Samples collected for analysis. Could it be a mild hallucinogenic effect from the unique tea blend, or is there a genuine environmental anomaly? The area is known for unusual magnetic fields." },
      { label: 'Detective', value: 'Agent Nasir Uddin' },
    ],
    footerText: 'Hidden clue: "Some brews stir more than just the senses."',
  },
  {
    title: 'Entry #002',
    details: [
      { label: 'Date', value: '2025-02-20' },
      { label: 'Subject', value: "Puthia Bamboo Grove - Track Analysis" },
      { label: 'Entry', value: "Set up motion-activated cameras and infrared sensors in the Puthia bamboo grove. Captured images of wild boar and deer, but no vanishing tracks. The ground is soft and loamy, prone to rapid shifts from wind and small animal activity. The 'Nishi Dak' legend is powerful here, perhaps influencing perception. Continued monitoring needed to definitively rule out paranormal activity." },
      { label: 'Detective', value: 'Agent Atif Ullah' },
    ],
    footerText: 'Hidden clue: "Nature erases many secrets quickly."',
  },
  {
    title: 'Entry #001',
    details: [
      { label: 'Date', value: '2025-03-01' }, // Date corrected to match case file example, original was 2025-02-13
      { label: 'Subject', value: 'The Koelpur Static Anomaly' },
      { label: 'Entry', value: "Commenced investigation in Koelpur. The reports of phantom radio static are indeed persistent. Utilizing spectral analysis equipment, we are attempting to isolate the source frequency. Initial readings suggest anomalies beyond conventional radio waves. The villagers' unease is palpable, a thick layer of fear clinging to the air itself. Further analysis is crucial to discern if this is a technological deception or something of a more…ethereal nature." },
      { label: 'Detective', value: 'Agent Fakhruddin' },
    ],
    footerText: 'Hidden clue: "In static, voices may hide."',
  },
];

const ChroniclePage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>THE CHRONICLE: MUSINGS & UPDATES FROM THE FIELD</h2>
      <div className={styles.grid}>
        {chronicleEntriesData.map((entry) => (
          <ContentCard key={entry.title} title={entry.title} footerText={entry.footerText}>
            <ul>
              {entry.details.map((detail) => (
                <li key={detail.label}>
                  <strong>{detail.label}:</strong> {detail.value}
                </li>
              ))}
            </ul>
          </ContentCard>
        ))}
      </div>
    </div>
  );
};
export default ChroniclePage;
