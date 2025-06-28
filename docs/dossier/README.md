---
title: The Dossier - Unclassified
editLink: false
lastUpdated: false
contributors: false
---

<div class="grid-overlay"></div>
<div class="scanline"></div>

<div class="container fade-in" :class="{ 'scroll-lock': isScrollLocked, 'scroll-unlock': !isScrollLocked }">
  <header class="header slide-down header-scan-effect">
    <h1>THE DOSSIER :: PERSONNEL & PROTOCOLS</h1>
    <p>UNCLASSIFIED BRIEFING // ECTOPLASMIC INVESTIGATORS UNIT</p>
  </header>
  <main class="content-section slide-in-right">
    <p style="text-align: center; margin-bottom: 2rem; font-size: 1.1em;">This dossier provides an unclassified overview of The Ectoplasmic Investigators: our origins, operational capabilities, and professional mandate. Access to further classified information requires Level Gamma clearance or higher.</p>
    <article class="section">
      <h2 class="section-title" @click="toggleSection('bio')">► UNIT BIOGRAPHY & GENESIS</h2>
      <div class="section-content custom-card" v-show="sections.bio">
        <p>
          The Ectoplasmic Investigators unit was informally founded by a quartet of cousins, bound by familial ties and an early, shared exposure to inexplicable phenomena that permeate the rural landscapes of Bangladesh. What began as youthful explorations into local folklore and whispered tales of the unseen rapidly evolved into a systematic and dedicated pursuit. Our core conviction, forged through direct encounters and rigorous analysis, is that many such events are not mere superstition, but tangible manifestations of intelligent, non-human entities – primarily those categorized within paranormal taxonomies as 'Jinn' or 'Ectomorphic Entities'.
        </p>
        <p>
          Our operational mandate is twofold: to scientifically investigate and document these occurrences, and to provide discreet assistance to communities affected by paranormal disturbances. We operate under the firm understanding that these entities are not random forces, but often act with discernible intent, their activities forming complex patterns that require nuanced understanding and sophisticated countermeasures.
        </p>
      </div>
    </article>
    <article class="section">
      <h2 class="section-title" @click="toggleSection('abilities')">► OPERATIONAL CAPABILITIES & SPECIALIZATIONS</h2>
      <div class="section-content custom-card" v-show="sections.abilities">
        <p>
          The unit's effectiveness stems from a multidisciplinary approach, blending traditional esoteric knowledge with modern investigative techniques and proprietary technology. Key capabilities include:
        </p>
        <ul>
          <li><strong>Advanced Spectral Analysis:</strong> Proficiency in the operation of wide-spectrum electromagnetic field detectors, thermal imagers, EVP (Electronic Voice Phenomenon) recorders, and psycho-kinetic sensors. Data is cross-referenced to identify anomalous energy signatures consistent with ectoplasmic manifestations or dimensional breaches.</li>
          <li><strong>Crypto-Linguistics & Symbolism:</strong> Specialized skills in deciphering unusual scripts, symbols, or vocalizations encountered during investigations, often associated with Jinn communication or ritualistic activities.</li>
          <li><strong>Environmental Anomaly Triangulation:</strong> Techniques for pinpointing the epicenter of paranormal activity through analysis of localized distortions in temperature, electromagnetism, and ambient sound.</li>
          <li><strong>Cultural & Folkloric Acumen:</strong> Deep understanding of regional Bangladeshi folklore, Jinn typologies (e.g., Ifrit, Marid, Ghul), and traditional warding practices, crucial for contextualizing evidence and interacting with affected communities respectfully and effectively.</li>
          <li><strong>Psychological Resilience & Counter-Influence Training:</strong> All agents undergo rigorous mental conditioning to withstand psychological manipulation attempts by sentient entities and to maintain objectivity during high-stress paranormal encounters.</li>
          <li><strong>Secure Evidence Archival:</strong> Maintenance of a classified digital and physical archive of all case files, artifact analyses, and entity interaction logs, employing multi-layered encryption and access protocols.</li>
        </ul>
      </div>
    </article>
    <article class="section">
      <h2 class="section-title" @click="toggleSection('history')">► PROFESSIONAL MANDATE & ETHICAL PROTOCOLS</h2>
      <div class="section-content custom-card" v-show="sections.history">
        <p>
          While The Ectoplasmic Investigators originated from personal dedication rather than institutional affiliation, our operational standards adhere to the highest levels of professionalism, discretion, and ethical conduct. Our primary objectives are the pursuit of knowledge regarding paranormal phenomena and the mitigation of negative impacts on human populations.
        </p>
        <p>
          Key ethical protocols include:
        </p>
        <ul>
          <li><strong>Consent and Confidentiality:</strong> All investigations on private property or involving individuals are conducted only with explicit, informed consent. The identities of witnesses and affected parties are kept strictly confidential, unless disclosure is mandated by extreme circumstances or legal requirements (which, given our operational sphere, are rare).</li>
          <li><strong>Non-Interference (Prime Directive Variant):</strong> In cases involving potentially benign or neutral entities, our primary role is observation and documentation, not aggressive intervention, unless the entity poses a clear and present danger.</li>
          <li><strong>Evidence Integrity:</strong> All collected evidence is meticulously documented, cataloged, and preserved using methods that minimize contamination or degradation. Data manipulation is strictly prohibited.</li>
          <li><strong>Community Debriefing & Support:</strong> Where appropriate and desired by the community, we provide factual, non-sensationalized debriefings of our findings and may offer guidance based on traditional or developed countermeasures, always respecting local beliefs and practices.</li>
          <li><strong>Continuous Research & Development:</strong> We are committed to ongoing research into the nature of paranormal entities and the refinement of our investigative technologies and methodologies.</li>
        </ul>
        <p>
          Our history of successful case resolutions and the trust we have built within the communities we serve stand as testament to our unwavering commitment to these principles. We are not ghost hunters; we are investigators of a complex, often misunderstood, aspect of reality.
        </p>
      </div>
    </article>
  </main>
  <footer class="site-footer slide-in-bottom">
    <p class="copyright-info">
      <i class="copyright-icon"></i> 2025 THE ECTOPLASMIC INVESTIGATORS
    </p>
    <p>DOSSIER LEVEL: UNCLASSIFIED. FURTHER DETAILS REQUIRE AUTHORIZATION.</p>
  </footer>
</div>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const sections = ref({
  bio: false,
  abilities: false,
  history: false,
});

const isAnySectionOpen = computed(() => {
  return Object.values(sections.value).some(isOpen => isOpen);
});

// Initialize isScrollLocked based on whether any section is open by default.
// If all sections start closed, then scroll should be locked initially.
const isScrollLocked = ref(!isAnySectionOpen.value);


const toggleSection = (sectionId) => {
  sections.value[sectionId] = !sections.value[sectionId];
};

const updateScrollLockFromBody = () => {
  if (typeof window !== 'undefined') {
    if (isAnySectionOpen.value) {
      document.body.classList.remove('scroll-lock');
      document.body.classList.add('scroll-unlock');
    } else {
      document.body.classList.add('scroll-lock');
      document.body.classList.remove('scroll-unlock');
    }
  }
};


// Watch for changes in isAnySectionOpen and update the body class
// and the local isScrollLocked ref for the container.
watch(isAnySectionOpen, (newValue) => {
  isScrollLocked.value = !newValue; // Local ref for container class
  updateScrollLockFromBody();       // Function to update body class
}, { immediate: true });


onMounted(() => {
  // Set initial body class state
  updateScrollLockFromBody();

  // Add event listener for escape key to close all sections (optional)
  const handleEsc = (event) => {
    if (event.key === 'Escape' && isAnySectionOpen.value) {
      Object.keys(sections.value).forEach(key => {
        sections.value[key] = false;
      });
    }
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleEsc);
  }
  // Cleanup on unmount
  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleEsc);
      // Ensure body classes are cleaned up if necessary
      document.body.classList.remove('scroll-lock', 'scroll-unlock');
    }
  });
});

</script>

<style scoped>
/* Scoped styles if needed */
.container.scroll-lock {
  /* Styles for when the container itself should lock scroll */
  /* e.g., overflow-y: hidden; height: 100vh; */
}
.container.scroll-unlock {
  /* Styles for when the container allows scroll */
  /* e.g., overflow-y: auto; */
}

/* The actual body scroll lock/unlock is handled by global CSS in index.css */
/* and the classes are added/removed in the script here. */
</style>
