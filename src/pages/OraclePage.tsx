// src/pages/OraclePage.tsx
import React from 'react';
import Accordion, { AccordionItem } from '../components/UI/Accordion';
import styles from './OraclePage.module.css';

const OraclePage: React.FC = () => {
  return (
    <div className={styles.oraclePageContainer}>
      <h2 className={styles.pageTitle}>THE ORACLE: FREQUENTLY ASKED QUESTIONS</h2>
      <Accordion>
        <AccordionItem title="What exactly do The Ectoplasmic Investigators of Chapitala do?">
          <p>We are a dedicated paranormal investigation team operating in rural Bangladesh, focused on understanding and addressing the unsettling events reported by villagers. We believe these events are genuine paranormal occurrences, and we use our expertise and respect for local understanding to uncover the underlying causes and bring resolution to affected communities.</p>
        </AccordionItem>
        <AccordionItem title="What types of cases do you typically investigate?">
          <p>Our work addresses a range of paranormal phenomena common in rural Bangladesh, often echoing local folklore. The disturbances we investigate frequently include:</p>
          <ul>
            <li><strong>Auditory Anomalies:</strong> Unexplained sounds that defy natural sources, like disembodied voices or strange static.</li>
            <li><strong>Visual Phenomena:</strong> Sightings of apparitions, mysterious lights, or unsettling distortions of the environment.</li>
            <li><strong>Time and Space Warps:</strong> Anomalies where time or space seems altered, such as temporal shifts or impossible object movements.</li>
            <li><strong>Object-Related Mysteries:</strong> Cases involving objects or locations that exhibit unusual or disturbing paranormal properties.</li>
          </ul>
        </AccordionItem>
        <AccordionItem title="Are you actually dealing with ghosts and spirits?">
          <p>Yes, we are directly engaged with what are commonly perceived as ghosts and spirits. We firmly believe that these are manifestations of paranormal entities. While others might seek mundane explanations, we recognize these occurrences as genuinely supernatural and approach our investigations with this understanding as our foundation. Our aim is to comprehend and document these paranormal interactions.</p>
        </AccordionItem>
        <AccordionItem title="How do you investigate a potential paranormal case?">
          <p>Our investigative process is thorough, combining established methods with specialized tools to effectively address paranormal events:</p>
          <ul>
            <li><strong>Initial Interviews:</strong> We begin by carefully documenting the experiences of those affected, gathering detailed accounts of the paranormal events and local context.</li>
            <li><strong>On-Site Exploration:</strong> We conduct on-site investigations, often during the times when paranormal activity is most reported, to directly observe the phenomena.</li>
            <li><strong>Evidence Collection:</strong> We utilize a range of equipment, including spectral analyzers, recorders, and visual recording devices, specifically chosen to capture paranormal evidence.</li>
            <li><strong>Analysis and Deduction:</strong> We meticulously analyze the collected data to understand the patterns and nature of the paranormal activity in each case.</li>
            <li><strong>Resolution and Reporting:</strong> Our goal is to resolve the paranormal disturbances, offer reassurance to the community, and create comprehensive reports of our findings.</li>
          </ul>
        </AccordionItem>
        <AccordionItem title="What makes The Ectoplasmic Investigators different?">
          <p>Our distinctiveness comes from our core principles and approach:</p>
          <ul>
            <li><strong>Local Expertise:</strong> Our profound understanding of rural Bangladeshi culture and environment is essential for interpreting paranormal events in this region.</li>
            <li><strong>Direct Paranormal Focus:</strong> We operate on the firm belief in the reality of paranormal phenomena as the cause of disturbances.</li>
            <li><strong>Discreet Operations:</strong> We prioritize discretion and community reassurance in our investigations, avoiding sensationalism.</li>
            <li><strong>Unwavering Belief:</strong> We are committed to acknowledging and investigating the paranormal nature of the cases we handle.</li>
          </ul>
        </AccordionItem>
        <AccordionItem title="Have you encountered cases that are truly unexplainable?">
          <p>Indeed, we have encountered numerous cases that defy conventional explanation, unequivocally demonstrating the presence of paranormal forces. Cases like "The Phantom Radio Static of Koelpur" (Case #001) and "The Bamboo Grove's Vanishing Tracks" (Case #002) presented evidence that traditional science cannot account for, solidifying our understanding of the genuine mysteries we investigate.</p>
        </AccordionItem>
        <AccordionItem title="Is paranormal investigation dangerous?">
          <p>Yes, investigating paranormal phenomena inherently involves risks. We prioritize safety through rigorous planning, extensive preparation, and strict protocols. We equip ourselves with specialized tools and rely on our team's collective experience to minimize potential hazards. We recognize the unpredictable nature of paranormal events and approach every investigation with utmost caution and professionalism.</p>
        </AccordionItem>
        <AccordionItem title="How can I report a potential paranormal event to your team?">
          <p>If you are experiencing unusual events in rural Bangladesh that you believe are paranormal and warrant investigation, please navigate through "THE DISPATCH" section on our website and send us a detailed message about what is happening. Include specific information such as the location, times, descriptions of the events, and any local stories associated with them. We will review your report and contact you if it aligns with our investigative focus.</p>
        </AccordionItem>
        <AccordionItem title="Do you charge for your services?">
          <p>The Ectoplasmic Investigators of Chapitala are primarily dedicated to the research of paranormal phenomena and to providing support to rural communities in Bangladesh experiencing these events. As a non-profit team, we generally do not charge for our investigative services. Depending on the specifics of a case and its location, community support or logistical assistance may be appreciated, but this is discussed on a case-by-case basis. Our primary mission is to understand the truth of paranormal occurrences and assist communities, not financial gain.</p>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default OraclePage;
