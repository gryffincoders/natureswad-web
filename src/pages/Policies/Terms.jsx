// src/pages/Policies/Terms.jsx
import React, { useEffect } from 'react';
import { IoDocumentText, IoWarning, IoGlobe, IoCloseCircle, IoWallet, IoPerson, IoEllipse, IoCube, IoScale, IoInformationCircle, IoSettings, IoMail } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import './Policies.css';

export default function Terms() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="policy-main-container">
      <div className="bg-blob blob1" style={{ backgroundColor: '#E3F2FD' }}></div>
      <div className="bg-blob blob2"></div>
      <HeaderTemp showBack={true} />

      <main className="policy-content-wrapper">
        <div className="policy-hero-card fade-in-up" style={{ backgroundColor: '#0D47A1' }}>
          <div className="hero-icon-container"><IoDocumentText size={32} color="#FFF" /></div>
          <div>
            <h1 className="hero-main-title">Terms & Conditions</h1>
            <p className="hero-sub-title">Last Updated: March 2026</p>
          </div>
        </div>

        <div className="policy-notice-banner fade-in-up" style={{ backgroundColor: '#FFF3E0', color: '#E65100' }}>
          <IoWarning size={28} color="#E65100" />
          <p className="policy-notice-text">By accessing or using our services, you agree to be bound by these terms.</p>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="policy-section-header">
            <IoGlobe size={28} color="#1B5E20" />
            <h2 className="policy-section-title" style={{ color: '#1B5E20' }}>1. Welcome & Usage</h2>
          </div>
          <p className="policy-paragraph">Welcome to Natureswad Foods Private Limited. These Terms govern your use of our application and website.</p>
          
          <h3 className="policy-bold" style={{ marginTop: '24px', marginBottom: '12px' }}>User Conduct (You Must NOT):</h3>
          {['Misuse the application or attempt unauthorized access', 'Use the platform for illegal activities', 'Post harmful, offensive, or misleading content'].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <IoCloseCircle size={20} color="#E65100" />
              <span style={{ marginLeft: '12px', fontSize: '16px', color: '#444' }}>{text}</span>
            </div>
          ))}
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="policy-section-header">
            <IoWallet size={28} color="#1B5E20" />
            <h2 className="policy-section-title" style={{ color: '#1B5E20' }}>2. Accounts & Payments</h2>
          </div>
          <div className="policy-info-box">
            <IoPerson size={24} color="#2E7D32" />
            <p className="policy-info-text">Users must provide personal info (name, email). You are responsible for account confidentiality.</p>
          </div>
          <div className="policy-bullet-list">
            <div className="policy-bullet-item"><IoEllipse size={8} color="#33691E" className="policy-bullet-dot"/><p className="policy-bullet-text">All prices are in INR (₹) and subject to change without notice.</p></div>
            <div className="policy-bullet-item"><IoEllipse size={8} color="#33691E" className="policy-bullet-dot"/><p className="policy-bullet-text">Online payments are processed securely via Razorpay. We do not store banking details.</p></div>
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.3s', backgroundColor: '#FFF8E1', borderColor: '#FFCC80' }}>
          <div className="policy-section-header">
            <IoScale size={28} color="#E65100" />
            <h2 className="policy-section-title" style={{ color: '#E65100' }}>4. Legal & Liability</h2>
          </div>
          <p className="policy-paragraph"><span className="policy-bold">Intellectual Property:</span> All content and logos are owned by Natureswad Foods Private Limited.</p>
          <p className="policy-paragraph"><span className="policy-bold">Third-Party Services:</span> We use Razorpay and Firebase. We are not responsible for disruptions.</p>
          <p className="policy-paragraph"><span className="policy-bold">Limitation of Liability:</span> We shall not be liable for indirect damages or loss of data.</p>
          
          <div className="policy-info-box" style={{ backgroundColor: 'white', borderColor: '#FFE0B2', marginTop: '24px' }}>
            <IoInformationCircle size={24} color="#1B5E20" />
            <p className="policy-info-text" style={{ color: '#1B5E20' }}>Governed by the laws of India (Bengaluru, Karnataka jurisdiction).</p>
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="policy-section-header">
            <IoSettings size={28} color="#1B5E20" />
            <h2 className="policy-section-title" style={{ color: '#1B5E20' }}>Contact & Support</h2>
          </div>
          <p className="policy-paragraph">We reserve the right to update these Terms at any time. Continued use constitutes acceptance.</p>
          <a href="mailto:support@natureswad.com" className="policy-email-btn interactive-hover">
            <IoMail size={20} color="#FFF" /> support@natureswad.com
          </a>
        </div>
      </main>
    </div>
  );
}