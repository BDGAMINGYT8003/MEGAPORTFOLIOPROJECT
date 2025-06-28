---
title: Personnel Laboratory
editLink: false
lastUpdated: false
contributors: false
---

<div class="grid-overlay"></div>
<div class="scanline"></div>

<div class="container fade-in">
  <header class="header slide-down header-scan-effect">
    <h1>PERSONNEL LABORATORY & FIELD ROSTER</h1>
    <p>CLASSIFIED OPERATIVE PROFILES – ECTOPLASMIC INVESTIGATORS UNIT</p>
  </header>
  <main class="content-section slide-in-right">
    <p style="text-align: center; margin-bottom: 2rem; font-size: 1.1em;">The Ectoplasmic Investigators unit comprises a dedicated team of specialists, each bringing a unique skill set to the complex field of paranormal research and intervention. Below are the unclassified profiles of our core operatives. Full psychological and operational dossiers require Level Delta clearance.</p>
    <div class="member-grid">
      <section class="member-card custom-card" v-for="member in teamMembers" :key="member.name">
        <img class="profile-pic" :src="getImagePath(member.image)" :alt="member.name">
        <h2>Agent {{ member.name }}</h2>
        <ul>
          <li><strong>Designation:</strong> {{ member.role }}</li>
          <li><strong>Specialization:</strong> {{ member.expertise }}</li>
          <li><strong>Key Attributes:</strong> {{ member.strength }}</li>
          <li><strong>Field Quote:</strong> "{{ member.motto }}"</li>
        </ul>
      </section>
    </div>
  </main>
  <footer class="site-footer slide-in-bottom">
    <p class="copyright-info">
      <i class="copyright-icon"></i> 2025 THE ECTOPLASMIC INVESTIGATORS
    </p>
    <p>PROFILES CLASSIFIED. UNAUTHORIZED DISSEMINATION PROHIBITED.</p>
  </footer>
</div>

<script setup>
import { ref } from 'vue';
import { useData } from 'vuepress/client';

const { site } = useData();

const getImagePath = (imageName) => {
  const base = site.value.base || '/';
  // Ensure image names are correct and present in .vuepress/public/images/
  return `${base}images/${imageName}`;
};

const teamMembers = ref([
  {
    name: 'Moin Uddin',
    role: 'Lead Field Investigator & Strategist',
    expertise: 'Ectoplasmic Entity Behavior, Dimensional Anomaly Theory, Advanced Sigilography',
    strength: 'Unflinching analytical faculties, strategic crisis management, intuitive grasp of non-Euclidean geometries',
    motto: 'Where logic ends, true investigation begins. We chart the spaces between realities.',
    image: 'Moin.png'
  },
  {
    name: 'Atif Ullah',
    role: 'Paranormal Acoustics & EVP Analysis Lead',
    expertise: 'Spectral Sound Propagation, Infrasonic Communication, Multi-Dimensional Audio Triangulation',
    strength: 'Hyper-acute auditory perception, deciphering complex layered vocalizations, resilience to sonic manipulation',
    motto: 'Silence has a voice. We possess the instruments and the will to hear its deepest secrets.',
    image: 'Atif.png'
  },
  {
    name: 'Fakhruddin',
    role: 'Chief Technical Officer & Data Cryptographer',
    expertise: 'Quantum Entanglement Comms, Esoteric Algorithm Development, Paranormal Hardware Engineering',
    strength: 'Mastery of secure data systems, reverse-engineering anomalous artifacts, innovation under extreme pressure',
    motto: 'Information is the key. Even the most chaotic phenomenon has an underlying data structure.',
    image: 'Fakhruddin.png'
  },
  {
    name: 'Oli Ullah',
    role: 'Field Operative & Esoteric Symbology Expert',
    expertise: 'Psychometry, Aura Field Analysis, Ritualistic Pattern Identification, Creative Containment Solutions',
    strength: 'Profound intuitive insight, empathic resonance with residual energies, unconventional problem-solving',
    motto: 'The veil is thin for those who know how to look. We paint the unseen, and map the impossible.',
    image: 'Oli.png'
  },
  {
    name: 'Nasir Uddin',
    role: 'Chief Medical Officer & Bio-Spectral Analyst',
    expertise: 'Human Physiological Responses to Paranormal Stimuli, Ecto-Biological Contaminants, Psychic Trauma Care',
    strength: 'Exceptional diagnostic acumen in anomalous conditions, steadfast composure in biohazard situations, advanced field surgery',
    motto: 'The body remembers what the mind tries to forget. We treat the wounds inflicted by the unseen.',
    image: 'Nasir.png'
  }
]);
</script>

<style scoped>
.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Slightly wider cards */
  gap: 1.5rem; /* Increased gap */
}

.member-card img.profile-pic {
  width: 120px; /* Larger profile pic */
  height: 120px;
  border: 3px solid var(--accent-color); /* Accent border for pic */
  box-shadow: 0px 0px 15px var(--accent-color); /* Glow effect */
  object-fit: cover;
  margin-bottom: 15px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
}

.member-card h2 {
  font-size: 1.8em; /* Adjusted heading size */
  margin-bottom: 12px;
}

.member-card ul li {
  font-size: 1em; /* Adjusted list item font size */
  margin-bottom: 10px; /* Spacing for list items */
  line-height: 1.5; /* Improved readability */
}
.member-card ul li strong {
  display: block; /* Make strong tags take full width */
  margin-bottom: 3px; /* Space after strong tag */
  color: var(--accent-color);
}

/* Other styles are inherited from global .custom-card or can be added here */
</style>
