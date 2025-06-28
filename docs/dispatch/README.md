---
title: Secure Dispatch
editLink: false
lastUpdated: false
contributors: false
# layout: FullWidthLayout # Example if a custom layout is needed
---

<div class="grid-overlay"></div>
<div class="scanline"></div>

<div class="container fade-in">
  <header class="header slide-down header-scan-effect">
    <h1>SECURE DISPATCH: <span id="form-title-vue">{{ formTitleVue }}</span></h1>
    <p>ESTABLISH COMMUNICATION WITH THE ECTOPLASMIC INVESTIGATORS</p>
    <div class="inquiry-type" style="margin-top: 1rem;">
      <label for="contactTypeVue">Select Inquiry Protocol:</label>
      <select id="contactTypeVue" @change="updateFormTitle" :disabled="formSubmitted">
        <option value="General Inquiry" selected>General Inquiry</option>
        <option value="Field Report Submission">Field Report Submission</option>
        <option value="Technical Consultation">Technical Consultation</option>
        <option value="Collaboration Proposal">Collaboration Proposal</option>
        <option value="Secure Data Transmit">Secure Data Transmit</option>
        <option value="Other Classified">Other (Specify)</option>
      </select>
    </div>
  </header>

  <main class="content-section slide-in-right">
    <p style="text-align: center; margin-bottom: 1.5rem; font-size: 1.1em;" v-if="!formSubmitted">
      This channel is encrypted and monitored for authorized communications. Select the appropriate protocol for your inquiry and transmit your message. All transmissions are logged.
    </p>

    <form class="contact-form custom-card" id="contactFormVue" @submit.prevent="submitForm" v-if="!formSubmitted">
      <input type="hidden" name="inquiryType" id="inquiryTypeVue" :value="selectedInquiryType" />
      <input type="hidden" name="_captcha" value="false">
      <!-- New: Subject Line for formsubmit.co -->
      <input type="hidden" name="_subject" :value="`GPI Dispatch: ${selectedInquiryType} - From ${formData.name || 'Unknown Sender'}`">


      <label for="nameVue">Agent Name / Alias:</label>
      <input type="text" id="nameVue" name="name" placeholder="Enter your designation" required v-model="formData.name">

      <label for="emailVue">Secure Commlink (Email):</label>
      <input type="email" id="emailVue" name="email" placeholder="valid.return@channel.null" required v-model="formData.email">

      <label for="messageVue">Message Body (Encrypted String Recommended for Sensitive Data):</label>
      <textarea id="messageVue" name="message" placeholder="Compose your transmission..." rows="5" required v-model="formData.message"></textarea>

      <div class="button-row" style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
        <RouterLink to="/" class="go-back-button button">Return to Command</RouterLink>
        <button type="submit">Transmit Message</button>
      </div>
    </form>

    <div class="confirmation-message custom-card" id="confirmationMessageVue" v-if="formSubmitted" style="text-align:center;">
      <h2>TRANSMISSION RECEIVED</h2>
      <p style="font-size: 1.2em; color: var(--accent-color);">Your message has been successfully dispatched to The Ectoplasmic Investigators' secure server.</p>
      <p>A field agent will review your transmission and respond via the provided commlink if further action is warranted.</p>
      <p>Reference ID: <span style="color: var(--accent-color);">{{ transmissionId }}</span></p>
      <div class="button-row" style="display: flex; justify-content: center; margin-top: 20px;">
        <RouterLink to="/" class="go-back-button button">Return to Command Center</RouterLink>
      </div>
    </div>
  </main>

  <footer class="site-footer slide-in-bottom">
    <p class="copyright-info">
      <i class="copyright-icon"></i> 2025 THE ECTOPLASMIC INVESTIGATORS
    </p>
    <p>ALL COMMUNICATIONS MONITORED. UNAUTHORIZED USE IS PROHIBITED.</p>
  </footer>
</div>

<script setup>
import { ref, onMounted } from 'vue';

const formTitleVue = ref('General Inquiry');
const selectedInquiryType = ref('General Inquiry');
const formSubmitted = ref(false);
const transmissionId = ref('');

const formData = ref({
  name: '',
  email: '',
  message: '',
  inquiryType: 'General Inquiry'
});

const updateFormTitle = (event) => {
  selectedInquiryType.value = event.target.value;
  formTitleVue.value = event.target.value;
  formData.value.inquiryType = event.target.value;
};

const generateTransmissionId = () => {
  // Simple ID generator for display
  return `GPI-TRX-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

const submitForm = async () => {
  const formElement = document.getElementById('contactFormVue');
  if (!formElement) return;

  const actualFormData = new FormData(formElement);
  // Ensure the hidden subject field is correctly populated based on current Vue data
  actualFormData.set('_subject', `GPI Dispatch: ${selectedInquiryType.value} - From ${formData.value.name || 'Unknown Sender'}`);
  actualFormData.set('inquiryType', selectedInquiryType.value);


  try {
    const response = await fetch('https://formsubmit.co/gizaimoin@gmail.com', {
      method: 'POST',
      body: actualFormData,
      mode: 'no-cors'
    });

    transmissionId.value = generateTransmissionId();
    formSubmitted.value = true;
    const selectElement = document.getElementById('contactTypeVue');
    if(selectElement) selectElement.disabled = true;

  } catch (error) {
    console.error('Error submitting the form:', error);
    alert('Transmission Failed. Secure channel compromised or unavailable. Please try again later.');
  }
};

</script>
