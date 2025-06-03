document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('evidence-modal');
  const closeButton = document.querySelector('.close-button'); // Assuming only one close button for this modal

  // Guard clause: If essential modal elements aren't found, don't proceed
  if (!modal || !closeButton) {
    console.warn('Evidence page modal elements not found. Modal script not fully initialized.');
    return;
  }

  document.querySelectorAll('.evidence-card .image-container').forEach(container => {
    container.addEventListener('click', () => {
      const evidenceCard = container.closest('.evidence-card');
      if (!evidenceCard) return;

      const image = evidenceCard.querySelector('.gallery-thumb');
      const details = evidenceCard.querySelector('.details'); // This div contains the structured details

      if (!image || !details) {
        console.warn('Image or details not found in evidence card.');
        return;
      }

      const modalImageContainer = modal.querySelector('.modal-image-container');
      const modalDetailsContainer = modal.querySelector('.modal-details-container');

      if (!modalImageContainer || !modalDetailsContainer) {
        console.warn('Modal content containers not found.');
        return;
      }

      modalImageContainer.innerHTML = ''; // Clear previous image
      const modalImage = image.cloneNode(true); // Clone the image
      modalImageContainer.appendChild(modalImage);

      // Clone the details content to prevent it from being removed from the card
      modalDetailsContainer.innerHTML = ''; // Clear previous details
      const detailsClone = details.cloneNode(true);
      detailsClone.style.display = 'block'; // Ensure the cloned details are visible

      // Wrap detailsClone in a div with class 'evidence-details' if it's not already the case
      // (based on original HTML, .details div already contains the h2, ul, span)
      // So, we can directly append its content or the clone itself.
      // For simplicity, let's assume .details is structured correctly for direct cloning.
      modalDetailsContainer.appendChild(detailsClone);


      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    });
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
  console.log("Evidence Page Loaded. Specific script for evidence.html is running.");
});
