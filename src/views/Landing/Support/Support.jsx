import React, { useState } from 'react';
import './Support.css'; // Import the CSS file for styling

const Support = () => {
  // State to track which FAQ is expanded
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    // Toggle between expanding and collapsing the clicked FAQ
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <section>
      <h1>Support</h1>
      
      <h2>Need Help?</h2>
      <p>
        We're here to assist you. If you need help using our service, feel free to reach out to our support team at 
        <a href="mailto:support@VibeNet.com"> support@VibeNet.com</a>.
      </p>

      <h2>Frequently Asked Questions (FAQ)</h2>
      
      <div className="faq">
        <div className={`faq-item ${expandedFAQ === 1 ? 'expanded' : ''}`}>
          <h3 onClick={() => toggleFAQ(1)}>1. How do I reset my password?</h3>
          <p>
            If you've forgotten your password, you can reset it by clicking the "Forgot Password" link on the login page. You'll receive an email with instructions to reset your password.
          </p>
        </div>

        <div className={`faq-item ${expandedFAQ === 2 ? 'expanded' : ''}`}>
          <h3 onClick={() => toggleFAQ(2)}>2. How do I update my account information?</h3>
          <p>
            To update your account information, navigate to your profile page and click "Edit Profile." From there, you can update your email, username, and other personal information.
          </p>
        </div>

        <div className={`faq-item ${expandedFAQ === 3 ? 'expanded' : ''}`}>
          <h3 onClick={() => toggleFAQ(3)}>3. How do I delete my account?</h3>
          <p>
            If you wish to delete your account, please contact our support team at <a href="mailto:support@VibeNet.com">support@VibeNet.com</a>. Note that account deletion is permanent and cannot be undone.
          </p>
        </div>

        <div className={`faq-item ${expandedFAQ === 4 ? 'expanded' : ''}`}>
          <h3 onClick={() => toggleFAQ(4)}>4. Why am I not receiving notification emails?</h3>
          <p>
            If you're not receiving our emails, please check your spam or junk folder. You can also add our email address to your safe sender list. If the issue persists, contact our support team.
          </p>
        </div>

        <div className={`faq-item ${expandedFAQ === 5 ? 'expanded' : ''}`}>
          <h3 onClick={() => toggleFAQ(5)}>5. How do I report a bug or technical issue?</h3>
          <p>
            To report a bug, please send a detailed description of the issue, along with any relevant screenshots, to <a href="mailto:techsupport@VibeNet.com">techsupport@VibeNet.com</a>. Our technical team will investigate and get back to you as soon as possible.
          </p>
        </div>
      </div>

      <h2>Technical Support</h2>
      <p>
        For technical issues, please contact <a href="mailto:techsupport@VibeNet.com">techsupport@VibeNet.com</a>. Include details about the issue and any relevant screenshots.
      </p>

      <h2>Documentation</h2>
      <p>
        For detailed instructions on how to use the various features of our app, refer to our 
        <a href="/documentation"> documentation page</a>.
      </p>

      <h2>Contact Information</h2>
      <p>
        For further assistance, you can also reach out via phone at (+33)6 12 34 56 78.
      </p>
    </section>
  );
};

export default Support;
