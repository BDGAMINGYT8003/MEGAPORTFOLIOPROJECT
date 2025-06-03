function toggleSection(sectionId) {
  const content = document.getElementById(sectionId);
  if (content) {
    const isDisplayed = content.style.display === 'block';
    content.style.display = isDisplayed ? 'none' : 'block';
    // Update ARIA attributes for accessibility if needed
    const titleElement = document.querySelector(`[onclick="toggleSection('${sectionId}')"]`);
    if (titleElement) {
      titleElement.setAttribute('aria-expanded', !isDisplayed);
    }
  }
}

// Make toggleSection globally accessible if it's called via onclick attributes in HTML
window.toggleSection = toggleSection;

console.log("Oracle Page Loaded. Specific script for oracle.html is running.");
