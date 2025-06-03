// src/pages/DossierPage.tsx
import React from 'react';
import Accordion, { AccordionItem } from '../components/UI/Accordion';
import styles from './DossierPage.module.css'; // Optional: for page-specific layout

const DossierPage: React.FC = () => {
  return (
    <div className={styles.dossierPageContainer}>
      <h2 className={styles.pageTitle}>THE DOSSIER: ABOUT US</h2>
      <Accordion>
        <AccordionItem title="BIOGRAPHY">
          <p>
            We are The Ectoplasmic Investigators, a team of four cousin brothers driven by a shared fascination with the paranormal that plagues rural Bangladesh. What began as a youthful curiosity and hobby has evolved into a dedicated pursuit of understanding and confronting the unseen forces that disrupt our world. We operate with a profound belief in the paranormal, recognizing it not as folklore, but as a tangible reality orchestrated by entities beyond our ordinary perception. Our investigations are rooted in the conviction that these disturbances are not random, but are deliberate actions from the realm of jinn, masterminds behind the enigmatic events we unravel.
          </p>
        </AccordionItem>
        <AccordionItem title="SKILLS">
          <p>
            Our expertise lies in the specialized art of paranormal investigation, honed through years of fieldwork and dedicated study of esoteric phenomena. We possess a deep understanding of the patterns and signatures associated with jinn activity, allowing us to effectively identify and analyze their influence in reported events. Our skills encompass:
          </p>
          <ul>
            <li><strong>Cultural Acumen:</strong> We are intimately familiar with the cultural landscape of rural Bangladesh, enabling us to interpret local reports and integrate traditional knowledge into our investigations, crucial for understanding the nuances of jinn manifestations within this specific context.</li>
            <li><strong>Analytical Investigation:</strong> We employ rigorous investigative techniques to dissect paranormal cases, meticulously gathering evidence and employing deductive reasoning to ascertain the involvement and objectives of jinn.</li>
            <li><strong>Advanced Equipment Operation:</strong> We are proficient in utilizing a range of specialized equipment designed to detect and record paranormal phenomena, ensuring comprehensive data collection during our on-site investigations. This includes spectral analyzers, EMF readers, thermal imaging, and sensitive audio-visual recording devices tailored to capture jinn-related energies.</li>
            <li><strong>Risk Management & Safety Protocols:</strong> Given the inherent unpredictability of paranormal encounters, particularly with jinn, we prioritize safety. We adhere to strict protocols and utilize protective measures to mitigate risks during investigations, ensuring the well-being of our team and those we assist.</li>
          </ul>
        </AccordionItem>
        <AccordionItem title="PROFESSIONAL BACKGROUND">
          <p>
            Though our origins are rooted in a shared personal interest, The Ectoplasmic Investigators operate with unwavering professionalism in every case we undertake. Our history is marked by a series of successful investigations across rural Bangladesh, each adding to our profound understanding of paranormal activities orchestrated by jinn. While we consider this work a deeply engaging pursuit, our commitment to thoroughness, discretion, and effective resolution rivals that of any formal organization. We maintain meticulous case files, ensuring every investigation is rigorously documented and analyzed. Our background is not just in solving mysteries, but in confronting and understanding the very real influence of jinn in the world, offering clarity and solutions to communities facing these often-unseen challenges. Our dedication is to the truth of the paranormal, and to assisting those affected by its manifestations.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DossierPage;
