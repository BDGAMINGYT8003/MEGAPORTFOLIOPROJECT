// src/pages/CaseFilesPage.tsx
import React from 'react';
import ContentCard from '../components/Content/ContentCard';
import styles from './CaseFilesPage.module.css';

const caseFilesData = [
  {
    title: 'Case File #010',
    details: [
      { label: 'Investigation', value: 'The Mobile Minaret of Minarpara Musjid' },
      { label: 'Description', value: "Minarpara, known for its ancient village mosque, now faces a bewildering phenomenon. Villagers swear the mosque's minaret subtly shifts its position during the night, imperceptible in daylight. Alarms ring of divine displeasure or a restless ‘earth spirit’. Is this architectural anomaly, or just mass delusion playing on age-old fears? Precise surveying is required to ascertain the minaret's nocturnal wanderings." },
      { label: 'Status', value: 'Closed – Case Successfully Resolved' },
      { label: 'Lead', value: 'Agent Fakhruddin' },
    ],
    footerText: 'Hidden clue: "What stands tall... may still shift with the unseen currents."',
  },
  {
    title: 'Case File #009',
    details: [
      { label: 'Investigation', value: 'The Weeping Well of Anderkilla' },
      { label: 'Description', value: "Anderkilla village holds an ancient, dried-up well, source of both history and recent disquiet. From its depths, villagers report hearing weeping and soft sobs late into the night, though the well is undeniably dry. A tragic myth tells of a woman drowned there centuries ago, her sorrow echoing through time. Is it a phantom's lament, or simply the earth exhaling its age-old sighs?" },
      { label: 'Status', value: 'Closed – Case Successfully Resolved' },
      { label: 'Lead', value: 'Agent Oli Ullah' },
    ],
    footerText: 'Hidden clue: "Tears may dry... but echoes can linger in stone."',
  },
  {
    title: 'Case File #008',
    details: [
      { label: 'Investigation', value: 'The Spectral Rickshaw of Dhamrai' },
      { label: 'Description', value: 'Late-night travelers in Dhamrai speak of a phantom rickshaw that appears silently, its puller shrouded in shadows, only to vanish when approached. Is it a local legend, a trick of the light, or something more ethereal haunting the old roads?' },
      { label: 'Status', value: 'Open – Preliminary Investigation Underway' },
      { label: 'Lead', value: 'Agent Moin Uddin' },
    ],
    footerText: 'Hidden clue: "Some journeys are not of this world."',
  },
  {
    title: 'Case File #007',
    details: [
      { label: 'Investigation', value: 'The Whispering Market of Faridpur' },
      { label: 'Description', value: 'The central market of Faridpur, bustling by day, allegedly becomes a hub of whispers by night. Shopkeepers report hearing faint, unintelligible voices when the market is deserted. Are these echoes of the past, or something more sinister lingering in the stalls?' },
      { label: 'Status', value: 'Open – Awaiting Acoustic Analysis' },
      { label: 'Lead', value: 'Agent Atif Ullah' },
    ],
    footerText: 'Hidden clue: "Commerce by day, whispers by night."',
  },
  {
    title: 'Case File #006',
    details: [
      { label: 'Investigation', value: 'The Vanishing Text of Bogra University' },
      { label: 'Description', value: "Students at Bogra University report vital passages in textbooks vanishing and reappearing randomly. Some claim it's a prank, others fear a mischievous spirit tied to the old library. Is it a simple case of disappearing ink, or is knowledge itself being manipulated?" },
      { label: 'Status', value: 'Open – Under Observation' },
      { label: 'Lead', value: 'Agent Nasir Uddin' },
    ],
    footerText: 'Hidden clue: "Knowledge can be fleeting."',
  },
  {
    title: 'Case File #005',
    details: [
      { label: 'Investigation', value: 'The Sunken Village of Chalan Beel' },
      { label: 'Description', value: "Fishermen in Chalan Beel claim to see the ghostly outline of a sunken village during misty dawns, complete with faint sounds of life. Is it a mirage, a collective memory, or are the spirits of the drowned village replaying their past?" },
      { label: 'Status', value: 'Open – Historical Records Review' },
      { label: 'Lead', value: 'Agent Moin Uddin' },
    ],
    footerText: 'Hidden clue: "The past lies just beneath the surface."',
  },
  {
    title: 'Case File #004',
    details: [
      { label: 'Investigation', value: 'The Shadow Puppets of Kushtia' },
      { label: 'Description', value: "A traditional shadow puppet theater in Kushtia is said to have puppets that move on their own after hours, re-enacting unknown dramas. The puppeteer fears they are possessed. Are these strings being pulled by unseen hands?" },
      { label: 'Status', value: 'Closed – Case Successfully Resolved' }, // Example of another closed case
      { label: 'Lead', value: 'Agent Oli Ullah' },
    ],
    footerText: 'Hidden clue: "Even puppets have their own tales to tell."',
  },
  {
    title: 'Case File #003',
    details: [
      { label: 'Investigation', value: 'The Time-Slip Tea Stall of Srimangal' },
      { label: 'Description', value: "Patrons of a remote tea stall in Srimangal report moments where the surroundings briefly revert to a bygone era. Is it a localized temporal anomaly, or the potent brew playing tricks on their minds?" },
      { label: 'Status', value: 'Open – Environmental Analysis Required' },
      { label: 'Lead', value: 'Agent Nasir Uddin' },
    ],
    footerText: 'Hidden clue: "Time is a river, sometimes it eddies."',
  },
  {
    title: 'Case File #002',
    details: [
      { label: 'Investigation', value: "The Bamboo Grove's Vanishing Tracks" },
      { label: 'Description', value: "Deep within a bamboo grove near Puthia, clear footprints appear on undisturbed paths, only to vanish moments later. Locals fear a 'Nishi Dak' (night spirit) lures victims. Are these supernatural prints, or a natural phenomenon yet to be understood?" },
      { label: 'Status', value: 'Open – Monitoring with Motion Sensors' },
      { label: 'Lead', value: 'Agent Atif Ullah' },
    ],
    footerText: 'Hidden clue: "What walks in shadows, leaves faint traces."',
  },
  {
    title: 'Case File #001',
    details: [
      { label: 'Investigation', value: 'The Phantom Radio Static of Koelpur' },
      { label: 'Description', value: "The sleepy village of Koelpur, nestled near Chapitala, is plagued by eerie midnight radio static. Villagers whisper of 'djinn voices' as radios power on and emit distorted transmissions in empty homes. Is it truly paranormal, or a clever deception masking something more earthly?" },
      { label: 'Status', value: 'Open – Analysis in progress' },
      { label: 'Lead', value: 'Agent Fakhruddin' },
    ],
    footerText: 'Hidden clue: "Listen closer... to the frequency of fear."',
  },
];

const CaseFilesPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>CASE FILES: INVESTIGATIONS UNDER SCRUTINY</h2>
      <div className={styles.grid}>
        {caseFilesData.map((caseItem) => (
          <ContentCard key={caseItem.title} title={caseItem.title} footerText={caseItem.footerText}>
            <ul>
              {caseItem.details.map((detail) => (
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
export default CaseFilesPage;
