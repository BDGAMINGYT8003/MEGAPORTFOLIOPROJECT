// js/page-specific.js

/**
 * Initializes accordion functionality for pages like dossier.html and oracle.html.
 * Looks for elements with class "section-title" and "section-content".
 */
function initializeAccordion(containerSelector = document) {
    const sections = containerSelector.querySelectorAll('.section');

    sections.forEach(section => {
        const button = section.querySelector('.section-title');
        const content = section.querySelector('.section-content');

        if (button && content) {
            // Ensure content has an ID for aria-controls, generate if missing
            if (!content.id) {
                // Generate a unique ID, e.g., based on button's text or a random string
                const randomId = `accordion-content-${Math.random().toString(36).substring(2, 9)}`;
                content.id = randomId;
            }
            button.setAttribute('aria-controls', content.id);
            button.setAttribute('aria-expanded', 'false'); // Default state
            content.setAttribute('role', 'region');
            // If button has an id, content can use aria-labelledby referring to it.
            // For now, assuming button text itself is descriptive enough.


            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    content.style.display = 'none';
                    button.classList.remove('active');
                    button.setAttribute('aria-expanded', 'false');
                } else {
                    content.style.display = 'block';
                    button.classList.add('active');
                    button.setAttribute('aria-expanded', 'true');
                }

                // Specific scroll lock logic for dossier page
                if (document.body.classList.contains('page-dossier')) {
                    updateDossierScrollLock();
                }
            });
        }
    });
}

/**
 * Specific scroll lock functionality for the dossier page.
 */
function updateDossierScrollLock() {
    const contents = document.querySelectorAll('.section-content');
    const isSectionOpen = Array.from(contents).some(c => c.style.display === 'block');
    document.body.classList.toggle('scroll-unlock', isSectionOpen);
    document.body.classList.toggle('scroll-lock', !isSectionOpen);
}


/**
 * Initializes modal functionality for the evidence page.
 */
function initializeEvidenceModal() {
    const modal = document.getElementById('evidence-modal');
    if (!modal) return;

    const closeButton = modal.querySelector('.close-button');
    const modalImageContainer = modal.querySelector('.modal-image-container');
    const modalDetailsContainer = modal.querySelector('.modal-details-container');
    let focusedElementBeforeModal;

    document.querySelectorAll('button.image-container').forEach(container => {
        container.addEventListener('click', () => {
            focusedElementBeforeModal = document.activeElement;

            const evidenceCard = container.closest('.evidence-card');
            const image = evidenceCard.querySelector('.gallery-thumb');
            const details = evidenceCard.querySelector('.details');
            
            modalImageContainer.innerHTML = ''; 
            const modalImage = image.cloneNode();
            modalImageContainer.appendChild(modalImage);
            
            modalDetailsContainer.innerHTML = `<div class="evidence-details" tabindex="-1">${details.innerHTML}</div>`;

            modal.style.display = 'block';
            document.body.classList.add('modal-open');
            
            if(closeButton) closeButton.focus();
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        if (focusedElementBeforeModal) {
            focusedElementBeforeModal.focus();
        }
    }

    if(closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

/**
 * Initializes form handling for the dispatch page.
 */
function initializeDispatchForm() {
    const contactTypeSelect = document.getElementById('contactType');
    const formTitle = document.getElementById('form-title');
    const inquiryTypeHidden = document.getElementById('inquiryType');
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (!contactTypeSelect || !formTitle || !inquiryTypeHidden || !contactForm || !confirmationMessage) {
        return;
    }

    contactTypeSelect.addEventListener('change', (event) => {
        const selectedType = event.target.value;
        formTitle.textContent = selectedType;
        inquiryTypeHidden.value = selectedType;
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            mode: 'no-cors'
        }).then(() => {
            contactForm.style.display = 'none';
            confirmationMessage.style.display = 'block';
            contactTypeSelect.disabled = true;
        }).catch((error) => {
            console.error('Error submitting the dispatch form:', error);
        });
    });
}


/**
 * Main initialization function for page-specific scripts.
 * Determines which page is currently loaded and calls the appropriate initializers.
 */
export function initializePageSpecificScripts() {
    const bodyClasses = document.body.classList;

    if (bodyClasses.contains('page-dossier') || bodyClasses.contains('page-oracle')) {
        initializeAccordion();
        if (bodyClasses.contains('page-dossier')) {
             // Initial call for dossier scroll lock in case sections are open by default (e.g. via URL hash)
            updateDossierScrollLock();
        }
    }
    if (bodyClasses.contains('page-evidence')) {
        initializeEvidenceModal();
    }
    if (bodyClasses.contains('page-dispatch')) {
        initializeDispatchForm();
    }
}
