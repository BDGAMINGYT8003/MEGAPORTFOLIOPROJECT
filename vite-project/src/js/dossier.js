function toggleSection(sectionId) {
  const content = document.getElementById(sectionId);
  if (content) {
    const isDisplayed = content.style.display === 'block';
    content.style.display = isDisplayed ? 'none' : 'block';
    // Update ARIA attributes for accessibility if needed (e.g., aria-expanded)
    const titleElement = document.querySelector(`[onclick="toggleSection('${sectionId}')"]`);
    if (titleElement) {
      titleElement.setAttribute('aria-expanded', !isDisplayed);
    }
  }
  updateScrollLock();
}

function updateScrollLock() {
  const contents = document.querySelectorAll('.section-content');
  const isSectionOpen = Array.from(contents).some(c => c.style.display === 'block');
  document.body.classList.toggle('scroll-unlock', isSectionOpen);
  document.body.classList.toggle('scroll-lock', !isSectionOpen);
}

// Make toggleSection globally accessible if it's called via onclick attributes in HTML
// For modules, it's better to add event listeners programmatically.
// However, to keep the HTML structure as is for now:
window.toggleSection = toggleSection;

// Initialize scroll lock state when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateScrollLock);
} else {
  updateScrollLock(); // Already loaded
}

console.log("Dossier Page Loaded. Specific script for dossier.html is running.");
