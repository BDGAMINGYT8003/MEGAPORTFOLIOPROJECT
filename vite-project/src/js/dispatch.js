const contactTypeSelect = document.getElementById('contactType');
const formTitle = document.getElementById('form-title');
const inquiryTypeHidden = document.getElementById('inquiryType'); // This is for the hidden input, might need a more specific ID if conflicts arise
const contactForm = document.getElementById('contactForm');
const confirmationMessage = document.getElementById('confirmationMessage');

if (contactTypeSelect && formTitle && inquiryTypeHidden && contactForm && confirmationMessage) {
    contactTypeSelect.addEventListener('change', (event) => {
      const selectedType = event.target.value;
      // The title in the header is "DISPATCH: General Inquiry"
      // So, we update the span with id "form-title"
      formTitle.textContent = selectedType;
      inquiryTypeHidden.value = selectedType;
    });

    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      // Basic validation example (can be expanded)
      const name = contactForm.elements['name'].value;
      const email = contactForm.elements['email'].value;
      const message = contactForm.elements['message'].value;

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Simulate form submission for now as direct fetch to formsubmit.co
      // with mode: 'no-cors' might not give usable success/failure feedback here easily
      // and the original script also used 'no-cors' which means it wasn't expecting a direct response.

      // Assuming submission is "successful" for the purpose of UI change
      console.log('Form data:', {
        inquiryType: inquiryTypeHidden.value,
        name,
        email,
        message
      });

      contactForm.style.display = 'none';
      confirmationMessage.style.display = 'block';
      if(contactTypeSelect) contactTypeSelect.disabled = true; // Disable select after "submission"

      // In a real scenario with fetch, you'd handle response from formsubmit.co
      // fetch(contactForm.action, {
      //   method: "POST",
      //   body: new FormData(contactForm),
      //   // mode: 'no-cors' // 'no-cors' means you won't be able to see the response from JS
      //   headers: {
      //       'Accept': 'application/json' // formsubmit.co can return JSON
      //   }
      // }).then(response => {
      //    if (response.ok || response.status === 0) { // response.status === 0 for 'no-cors' success
      //       contactForm.style.display = 'none';
      //       confirmationMessage.style.display = 'block';
      //       contactTypeSelect.disabled = true;
      //    } else {
      //       return response.json().then(data => { // Or .text() if not JSON
      //           if (Object.hasOwn(data, 'errors')) {
      //               alert(data["errors"].map(error => error["message"]).join(", "));
      //           } else {
      //               alert('Oops! There was a problem submitting your form');
      //           }
      //       })
      //    }
      // }).catch((error) => {
      //   console.error('Error submitting the form:', error);
      //   alert('Oops! There was a problem submitting your form.');
      // });
    });
} else {
    console.warn("Dispatch page specific elements (contactType, formTitle, etc.) not all found. Form script not fully initialized.");
}

console.log("Dispatch (Contact) page Loaded. Specific script for dispatch.html is running.");
