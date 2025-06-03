// src/pages/DispatchPage.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom'; // For "Go Back" button
import styles from './DispatchPage.module.css';

type InquiryType = 'General Inquiry' | 'Technical Support' | 'Partnerships' | 'Other';

const DispatchPage: React.FC = () => {
  const [formTitle, setFormTitle] = useState<InquiryType>('General Inquiry');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    inquiryType: 'General Inquiry' as InquiryType, // Hidden input value
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInquiryTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as InquiryType;
    setFormTitle(newType);
    setFormData(prev => ({ ...prev, inquiryType: newType }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    // Append inquiryType explicitly as it's managed by state for the hidden input
    data.set('inquiryType', formData.inquiryType);


    try {
      // NOTE: formsubmit.co with 'no-cors' mode means we won't get a direct success/failure response in JS.
      // It relies on formsubmit.co handling the redirect or showing its own success page.
      // For a better UX, a dedicated backend or AJAX submission with a service that allows CORS would be needed.
      // Given the original structure, we'll replicate the 'no-cors' behavior.
      await fetch(formElement.action, {
        method: 'POST',
        body: data,
        mode: 'no-cors', // This was in the original, implies we don't see the response
      });

      // Since 'no-cors' gives an opaque response, we assume success if fetch doesn't throw an error.
      // In a real scenario with a proper backend, you'd check response.ok.
      setIsSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.dispatchPageContainer}>
        <div className={styles.confirmationMessage}>
          <h2 className={styles.pageTitle}>MESSAGE SENT!</h2>
          <p>Thanks for reaching out. We'll get back to you shortly.</p>
          <Link to="/" className={styles.goBackButton}>Go Back to Command Center</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dispatchPageContainer}>
      <header className={styles.formHeader}>
        <h2 className={styles.pageTitle}>DISPATCH: {formTitle}</h2>
        <p className={styles.formSubtitle}>COMMUNICATION HUB</p>
        <div className={styles.inquiryTypeSelector}>
          <label htmlFor="contactType" className={styles.selectLabel}>Inquiry Type:</label>
          <select
            id="contactType"
            value={formTitle}
            onChange={handleInquiryTypeChange}
            className={styles.selectDropdown}
            disabled={isSubmitting}
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Partnerships">Partnerships</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </header>

      <form
        className={styles.contactForm}
        action="https://formsubmit.co/gizaimoin@gmail.com" // Same as original
        method="POST"
        onSubmit={handleSubmit}
      >
        {/* Hidden input for inquiryType, value managed by state */}
        <input type="hidden" name="inquiryType" value={formData.inquiryType} />
        {/* Hidden input to disable captcha, as in original */}
        <input type="hidden" name="_captcha" value="false" />
        {/* Optional: redirect URL after submission (formsubmit.co feature) */}
        {/* <input type="hidden" name="_next" value="YOUR_DOMAIN/dispatch/thankyou" /> */}

        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            className={styles.inputField}
            value={formData.name}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            className={styles.inputField}
            value={formData.email}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message here..."
            rows={5}
            required
            className={styles.textareaField}
            value={formData.message}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.buttonRow}>
          <Link to="/" className={`${styles.button} ${styles.goBackButton}`} style={{pointerEvents: isSubmitting ? 'none' : 'auto'}}>
            Go Back
          </Link>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`} disabled={isSubmitting}>
            {isSubmitting ? 'SENDING...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DispatchPage;
