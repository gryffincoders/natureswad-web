// src/pages/Policies/Compliance.jsx
import React, { useEffect } from 'react';
import { IoShieldCheckmark, IoTrash, IoLockClosed, IoKey, IoMail, IoCheckmarkCircle, IoInformationCircle } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import './Policies.css';

export default function Compliance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      <HeaderTemp showBack={true} />

      <main className="policy-content-wrapper">
        
        {/* Header Hero Card */}
        <div className="policy-hero-card fade-in-up" style={{ background: '#2E7D32' }}>
          <div className="hero-icon-container">
            <IoShieldCheckmark size={32} color="#FFF" />
          </div>
          <div className="hero-text-group">
            <h1 className="hero-main-title">App Compliance</h1>
            <p className="hero-sub-title">Last Updated: March 2026</p>
          </div>
        </div>

        {/* 1. Account Deletion */}
        <section className="policy-section-card fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="policy-section-header">
            <IoTrash size={26} color="#D84315" />
            <h2 className="policy-section-title">1. Account Deletion Policy</h2>
          </div>
          <p className="policy-paragraph">
            In accordance with global data protection regulations, Natureswad users have the full right to request the permanent deletion of their account and all associated personal data.
          </p>
          <div className="policy-info-box">
            <IoInformationCircle size={24} color="#1B5E20" />
            <p className="policy-info-text">Deletion requests are processed within <strong>5–7 business days</strong>. Once deleted, this action cannot be undone.</p>
          </div>
          <ul className="policy-bullet-list">
            <li className="policy-bullet-item">
              <IoCheckmarkCircle size={18} color="#2E7D32" className="policy-bullet-dot" />
              <p className="policy-bullet-text">Request deletion via the <strong>Profile Settings</strong> section of the Natureswad App.</p>
            </li>
            <li className="policy-bullet-item">
              <IoCheckmarkCircle size={18} color="#2E7D32" className="policy-bullet-dot" />
              <p className="policy-bullet-text">Or email us directly at <span className="policy-highlight">support@natureswad.com</span> from your registered email address.</p>
            </li>
          </ul>
        </section>

        {/* 2. Data Safety */}
        <section className="policy-section-card fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="policy-section-header">
            <IoLockClosed size={26} color="#1B5E20" />
            <h2 className="policy-section-title">2. Data Safety Declaration</h2>
          </div>
          <p className="policy-paragraph">
            We prioritize the security of your information. Below is how we handle your data:
          </p>
          
          <div className="policy-feature-grid">
            <div className="policy-feature-box">
              <div className="policy-feature-text">
                <span className="policy-bold">Collected Data:</span>
                <p>Name, Phone, Email, Delivery Address, and Order History.</p>
              </div>
            </div>
            <div className="policy-feature-box">
              <div className="policy-feature-text">
                <span className="policy-bold">Third Parties:</span>
                <p>Firebase (Auth/Analytics) and Razorpay (Payments).</p>
              </div>
            </div>
          </div>

          <p className="policy-paragraph" style={{ marginTop: '24px' }}>
            Natureswad <strong>does not sell</strong> your personal data to unauthorized third parties. All data transmission is encrypted via SSL/TLS protocols.
          </p>
        </section>

        {/* 3. Test Credentials */}
        <section className="policy-section-card fade-in-up" style={{ animationDelay: '0.3s', background: '#E0F7FA', borderColor: '#B2EBF2' }}>
          <div className="policy-section-header">
            <IoKey size={26} color="#006064" />
            <h2 className="policy-section-title" style={{ color: '#006064' }}>3. Reviewer Access</h2>
          </div>
          <p className="policy-paragraph" style={{ color: '#006064' }}>
            For app store review purposes, use the following credentials to access full app functionality:
          </p>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #B2EBF2' }}>
            <p className="policy-paragraph" style={{ margin: 0 }}><strong>Phone:</strong> 9999999999</p>
            <p className="policy-paragraph" style={{ margin: 0 }}><strong>OTP / Password:</strong> 123456</p>
          </div>
        </section>

        {/* 4. Contact */}
        <section className="policy-section-card fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="policy-section-header">
            <IoMail size={26} color="#1B5E20" />
            <h2 className="policy-section-title">4. Support & Compliance</h2>
          </div>
          <p className="policy-paragraph">
            If you have questions regarding our compliance or data handling, please reach out:
          </p>
          <a href="mailto:support@natureswad.com" className="policy-email-btn interactive-hover">
            <IoMail size={20} />
            Email Support
          </a>
        </section>

      </main>
    </div>
  );
}