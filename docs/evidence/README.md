---
title: Evidence Archive
editLink: false
lastUpdated: false
contributors: false
---

<div class="grid-overlay"></div>
<div class="scanline"></div>

<div class="container fade-in">
  <header class="header slide-down header-scan-effect">
    <h1>EVIDENCE ARCHIVE :: ARTIFACT DATABASE</h1>
    <p>CATALOGUED ANOMALIES & SPECTRAL SIGNATURES</p>
  </header>
  <main class="content-section slide-in-right">
    <p style="text-align: center; margin-bottom: 2rem; font-size: 1.1em;">This secure vault contains authenticated artifacts and data records from various field investigations. Each item represents a tangible link to phenomena that challenge conventional understanding. Access and analysis are restricted to authorized personnel. Handle all data with extreme caution and appropriate epistemological humility.</p>
    <div class="evidence-grid">
      <section class="evidence-card custom-card" v-for="(item, index) in evidenceItems" :key="index">
        <div class="image-container" @click="openModal(item)">
          <img class="gallery-thumb" :src="getImagePath(item.image)" :alt="item.alt">
          <div class="expand-message">Access File</div>
        </div>
        <!-- Details are now shown in modal, not hidden in card -->
      </section>
    </div>
  </main>

  <footer class="site-footer slide-in-bottom">
    <p class="copyright-info">
      <i class="copyright-icon"></i> 2025 THE ECTOPLASMIC INVESTIGATORS
    </p>
    <p>ARCHIVE INTEGRITY MONITORED. ALL ACCESS LOGGED.</p>
  </footer>
</div>

<!-- Modal Structure -->
<div class="modal" v-if="isModalOpen" @click.self="closeModal">
  <div class="modal-content custom-card">
    <span class="close-button" @click="closeModal">×</span>
    <div class="modal-image-container">
      <img :src="getImagePath(selectedEvidence.image)" :alt="selectedEvidence.alt" style="max-width: 100%; height: auto; border: 2px solid var(--border-color);">
    </div>
    <div class="modal-details-container evidence-details">
      <h2>{{ selectedEvidence.title }}</h2>
      <ul>
        <li><strong>Artifact ID:</strong> {{ selectedEvidence.id }}</li>
        <li><strong>Evidence Class:</strong> {{ selectedEvidence.type }}</li>
        <li><strong>Acquisition Date:</strong> {{ selectedEvidence.date }}</li>
        <li><strong>Case Correlation:</strong> {{ selectedEvidence.case }}</li>
        <li><strong>Description:</strong> {{ selectedEvidence.description }}</li>
      </ul>
      <span class="easter-egg easter-egg-blink"><strong>Analyst's Note:</strong> "{{ selectedEvidence.clue }}"</span>
    </div>
  </div>
</div>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useData } from 'vuepress/client';

const { site } = useData();

const getImagePath = (imageName) => {
  const base = site.value.base || '/';
  return `${base}images/${imageName}`;
};

const evidenceItems = ref([
  {
    id: 'GPI-EV-001A',
    image: 'IMG-20250217-WA0004.jpg',
    alt: 'Spectral waveform analysis from Koelpur radio static',
    title: 'Artifact #001: Koelpur Waveform Anomaly',
    type: 'Auditory Data (Spectral Analysis Printout)',
    date: '2024-03-10',
    case: 'GPI-CF-001K (Koelpur Static Whispers)',
    description: 'Visual representation of frequency spectrum analysis from anomalous radio static recorded in Koelpur. Note the unusual peak modulations and non-standard carrier wave patterns inconsistent with known broadcast signals or natural interference. Suspected EVP embedded within complex noise layers.',
    clue: 'The patterns within the noise suggest a structured, if unintelligible, signal. Further decryption protocols recommended.'
  },
  {
    id: 'GPI-EV-002B',
    image: 'FB_IMG_1739953366991.jpg',
    alt: 'Soil sample from Amtali bamboo grove under magnification',
    title: 'Artifact #002: Amtali Grove Soil Sample',
    type: 'Biological/Trace Evidence (Agglomerated Soil Compound)',
    date: '2024-03-12',
    case: 'GPI-CF-002A (Amtali Vanishing Tracks)',
    description: 'A preserved sample of unique soil composition from the precise terminus point of unexplained footprints within the Amtali bamboo grove. Microscopic analysis revealed trace elements not native to the region and faint, rapidly degrading bio-luminescent particles. Ectoplasmic residue confirmed by spectrography.',
    clue: 'The soil itself seems to react to specific energy frequencies. Consider its potential as a recording medium.'
  },
  {
    id: 'GPI-EV-003C',
    image: 'evidence3.png',
    alt: 'Damaged clock hand from Shonargaon exhibiting temporal flux',
    title: 'Artifact #003: Shonargaon Chronometric Fragment',
    type: 'Physical Object (Temporally Affected Alloy)',
    date: '2024-03-15',
    case: 'GPI-CF-003S (Shonargaon Temporal Anomalies)',
    description: 'A metallic clock hand recovered from the Shonargaon Zamindar Bari ruins. Exhibits localized temporal distortion; atomic decay rates are inconsistent when measured within proximity. The alloy shows signs of micro-fractures consistent with exposure to high-energy temporal flux.',
    clue: 'The object appears to exist in multiple temporal states simultaneously. Handle with chroniton shielding.'
  },
  {
    id: 'GPI-EV-004D',
    image: 'evidence4.png',
    alt: 'Bark scraping from the Bottola Baobab tree',
    title: 'Artifact #004: Bottola Baobab Vocal Imprint',
    type: 'Botanical/Sonic Evidence (Resonance-Infused Bark)',
    date: '2024-03-18',
    case: 'GPI-CF-004B (Bottola Whispering Baobab)',
    description: 'A sample of bark from the ancient Baobab tree in Bottola. When subjected to sonic resonance testing, the cellular structure emits complex, low-frequency vibrations that correlate with the reported "whispers." Analysis suggests the wood has absorbed and can reproduce specific vocal energy patterns.',
    clue: 'The tree is not speaking; it is replaying. What was the original message, and who was the speaker?'
  },
  // Rewriting the rest for consistency and enhanced detail
  {
    id: 'GPI-EV-005E',
    image: 'evidence5.png',
    alt: 'Water sample from Dhoar Paani Lake under spectral analysis',
    title: 'Artifact #005: Dhoar Paani Reflective Medium',
    type: 'Aqueous Sample (Light-Refractive Particulate Suspension)',
    date: '2024-03-20',
    case: 'GPI-CF-005J (Dhoar Paani Lake of Lost Reflections)',
    description: 'A sealed vial containing water from the Dhoar Paani lake. The water holds a high concentration of unidentified crystalline particulates that exhibit unusual light-refracting properties. When exposed to specific light frequencies, fleeting, coherent images can be observed on its surface, mirroring witness accounts of phantom visions.',
    clue: 'The "mirror spirit" may be a phenomenon of light interacting with an exotic medium. Investigate particulate origins.'
  },
  {
    id: 'GPI-EV-006F',
    image: 'evidence6.png',
    alt: 'Wood shard from the "cursed" charpai of Kumarpur',
    title: 'Artifact #006: Kumarpur Somnambulant Wood',
    type: 'Physical Object (Bio-Interactive Timber)',
    date: '2024-03-22',
    case: 'GPI-CF-006K (Cursed Charpai of Kumarpur)',
    description: 'A fragment of wood from the infamous Kumarpur charpai. EEG scans of subjects in proximity during REM sleep show anomalous neural activity and consistent reports of vivid, shared nightmares. The wood seems to interact with human consciousness on a subconscious level, potentially through emission of specific infrasonic frequencies or psychoactive spores (mycological analysis pending).',
    clue: 'The "curse" is an interaction. What triggers it, and can it be shielded?'
  },
  {
    id: 'GPI-EV-007G',
    image: 'evidence7.png',
    alt: 'Resin from the Screaming Silk Cotton Tree of Shimultola',
    title: 'Artifact #007: Shimultola Sonic Resin',
    type: 'Botanical/Sonic Evidence (Vibration-Conductive Resin)',
    date: '2024-03-25',
    case: 'GPI-CF-007S (Screaming Silk Cotton Tree)',
    description: 'A sample of solidified resin from the Shimultola Silk Cotton tree. The resin possesses an unusual molecular structure that amplifies and distorts ambient sounds, particularly wind passing through the tree\'s hollows, into complex, high-frequency shrieks. These emissions are most pronounced during full moon phases, possibly due to tidal stresses on the tree structure.',
    clue: 'The tree is an instrument, and the wind its player. But who composed the melody of fear?'
  },
  {
    id: 'GPI-EV-008H',
    image: 'evidence8.png',
    alt: 'Dust particles from Polashpur Night Market that project shadows',
    title: 'Artifact #008: Polashpur Phantasmal Dust',
    type: 'Particulate Matter (Photo-Reactive Compound)',
    date: '2024-03-27',
    case: 'GPI-CF-008P (Shadow Puppets of Polashpur)',
    description: 'Fine particulate matter collected from the Polashpur Night Market. When suspended in air and illuminated by specific light wavelengths (UV and near-IR), these particles coalesce to form fleeting, three-dimensional shadow-like figures. The effect is transient and highly localized. Chemical analysis indicates an unknown organic compound mixed with ferrous material.',
    clue: 'The "shadows" are reactive. The true mystery lies in the source and purpose of this engineered particulate.'
  },
  {
    id: 'GPI-EV-009I',
    image: 'evidence9.png',
    alt: 'Stone fragment from Anderkilla Weeping Well displaying hygroscopic properties',
    title: 'Artifact #009: Anderkilla Hydro-Resonant Stone',
    type: 'Geological Sample (Anomalously Hygroscopic Mineral)',
    date: '2024-03-29',
    case: 'GPI-CF-009A (Weeping Well of Anderkilla)',
    description: 'A fragment of stone from the inner lining of the Anderkilla well. The stone exhibits abnormally high hygroscopic properties, absorbing atmospheric moisture even in arid conditions. This moisture, when interacting with the stone\'s unique crystalline structure, produces subtle sonic vibrations that mimic the sound of weeping, amplified by the well shaft.',
    clue: 'The stone doesn\'t just weep; it filters sorrow from the very air. What is the true source of this ambient grief?'
  },
  {
    id: 'GPI-EV-010J',
    image: 'evidence10.png',
    alt: 'Geodetic survey data showing minaret displacement',
    title: 'Artifact #010: Minarpara Displacement Log',
    type: 'Geospatial Data (Nocturnal Positional Telemetry)',
    date: '2024-04-01',
    case: 'GPI-CF-010M (Mobile Minaret of Minarpara)',
    description: 'A compilation of geodetic survey data collected over several nights at the Minarpara Musjid. The logs document minute but statistically significant nocturnal displacements of the minaret, inconsistent with standard tectonic activity or subsidence. The movements correlate with fluctuations in local electromagnetic fields and subterranean water levels.',
    clue: 'The minaret moves in response to unseen currents. Are these currents terrestrial, or something more... ethereal?'
  }
]);

const isModalOpen = ref(false);
const selectedEvidence = ref(null);

const openModal = (item) => {
  selectedEvidence.value = item;
  isModalOpen.value = true;
  if (typeof window !== 'undefined') {
    document.body.classList.add('modal-open');
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedEvidence.value = null;
  if (typeof window !== 'undefined') {
    document.body.classList.remove('modal-open');
  }
};

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal();
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown);
    document.body.classList.remove('modal-open');
  }
});
</script>

<style scoped>
/* Modal styles are now in global index.css */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  /* background-color is var(--secondary-bg) via .custom-card from global */
  padding: 2rem;
  border: 2px solid var(--border-color);
  width: 80%;
  max-width: 800px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.8em;
  font-weight: bold;
  color: var(--accent-color);
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

.close-button:hover {
  color: var(--text-color);
}

.modal-image-container {
  text-align: center;
  margin-bottom: 1rem;
}

.evidence-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.evidence-card .image-container {
  position: relative;
  cursor: pointer;
}

.evidence-card img.gallery-thumb {
  width: 100%;
  height: 200px; /* Fixed height for uniform look */
  object-fit: cover; /* Cover ensures the image fills the space, might crop */
  display: block;
  border: 2px solid var(--border-color);
  box-shadow: 3px 3px 0px var(--primary-bg);
}

.evidence-card .expand-message {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.75); /* Slightly more opaque */
  color: var(--accent-color);
  text-align: center;
  padding: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 0.9em;
}

.evidence-card:hover .expand-message {
  opacity: 1;
}

/* Ensure details text is readable in modal */
.evidence-details ul {
  list-style: disc;
  margin-left: 20px;
  font-size: 1em; /* Ensure readability */
  text-align: left;
  color: var(--text-color);
}
.evidence-details ul li {
  margin-bottom: 0.5rem; /* Consistent spacing */
}
.evidence-details ul li strong {
  color: var(--accent-color);
}
.evidence-details .easter-egg strong { /* Analyst note bold part */
   color: var(--accent-color);
}


@media (max-width: 480px) {
  .modal-content {
    width: 95%; /* More screen use on small devices */
    padding: 1rem;
  }
  .evidence-card .expand-message {
    opacity: 1;
    font-size: 0.8em;
  }
  .evidence-card img.gallery-thumb {
    height: 150px; /* Smaller thumbs on mobile */
  }
}
</style>
