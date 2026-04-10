
// src/pages/Contact/ContactUs.jsx
import React, { useState, useEffect } from 'react';
import { 
  IoChatbubbleEllipses, 
  IoMail, 
  IoOpenOutline, 
  IoMailOutline, 
  IoPaperPlaneOutline, 
  IoRefresh 
} from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import './contact.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDirectEmail = () => {
    const subject = encodeURIComponent('Inquiry about Natureswad');
    const body = encodeURIComponent('Hello, I would like to inquire about...');
    window.location.href = `mailto:sales@natureswad.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    
    // Basic validation
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Missing Information: Please fill in all required fields marked with *');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert('Invalid Email: Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate a brief loading state for UX, then trigger email client
    setTimeout(() => {
      const emailSubject = encodeURIComponent(`Inquiry from ${formData.firstName} ${formData.lastName}`);
      const emailBody = encodeURIComponent(
        `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );

      window.location.href = `mailto:sales@natureswad.com?subject=${emailSubject}&body=${emailBody}`;
      
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-main-container">
      {/* Ambient Blobs */}
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      <HeaderTemp showBack={true} />

      <main className="contact-content-wrapper">
        
        {/* Premium Header */}
        <div className="premium-header fade-in-up">
          <div className="header-icon-container">
            <IoChatbubbleEllipses size={28} color="#FFF" />
          </div>
          <div className="premium-header-text">
            <h1 className="main-title">Contact Us</h1>
            <p className="sub-title">We're here to help you</p>
          </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="contact-grid-layout">
          
          {/* Left: Hero Card */}
          <div className="hero-card fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="hero-text-container">
              <h2 className="hero-title">Say Hello!</h2>
              <p className="hero-subtitle">
                We're a friendly bunch here at Natureswad. Place an inquiry and we'll get back to you the same day.
              </p>
            </div>

            <button className="direct-email-btn interactive-hover" onClick={handleDirectEmail}>
              <IoMail size={20} />
              <span>sales@natureswad.com</span>
              <IoOpenOutline size={18} style={{ marginLeft: '4px' }} />
            </button>
          </div>

          {/* Right: Form Card */}
          <div className="form-card shadow-premium fade-in-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit}>
              
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="firstName">First Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <div className="input-with-icon">
                 
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="your mail" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="message">Your Message <span className="required">*</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  placeholder="How can we help you today?" 
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-btn interactive-hover ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <IoRefresh size={24} className="spin-icon" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <IoPaperPlaneOutline size={20} style={{ marginLeft: '8px' }} />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
}