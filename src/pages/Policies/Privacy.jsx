// src/pages/Policies/Privacy.jsx
import React, { useEffect } from 'react';
import { IoShieldCheckmark, IoInformationCircle, IoCloudDownload, IoFlag, IoCard, IoChatbubbles, IoStatsChart, IoNotifications, IoLockClosed, IoFingerPrint, IoTrash, IoPerson, IoBody, IoSettings, IoRefresh, IoMail, IoEllipse, IoCheckmarkCircle } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import './Policies.css';

export default function Privacy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="policy-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <HeaderTemp showBack={true} />

      <main className="policy-content-wrapper">
        <div className="policy-hero-card fade-in-up" style={{ backgroundColor: '#1B5E20' }}>
          <div className="hero-icon-container"><IoShieldCheckmark size={32} color="#FFF" /></div>
          <div>
            <h1 className="hero-main-title">Privacy Policy</h1>
            <p className="hero-sub-title">Last Updated: March 2026</p>
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="policy-section-header">
            <IoInformationCircle size={28} color="#33691E" />
            <h2 className="policy-section-title" style={{ color: '#1B5E20' }}>Policy Overview</h2>
          </div>
          <p className="policy-paragraph">
            <span className="policy-highlight">Natureswad Foods Private Limited</span> ("Natureswad", "we", "our", "us") operates both a mobile application and website.
          </p>
          <p className="policy-paragraph">This Privacy Policy explains how we collect, use, and protect your information. By using our services, you agree to this Privacy Policy.</p>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="policy-section-header">
            <IoCloudDownload size={28} color="#33691E" />
            <h2 className="policy-section-title" style={{ color: '#1B5E20' }}>1. Information We Collect</h2>
          </div>
          <p className="policy-paragraph">We may collect:</p>
          <div className="policy-bullet-list">
            {['Name, phone number, email address', 'Delivery address and order details', 'Device and usage data', 'IP address and app interactions'].map((text, i) => (
              <div key={i} className="policy-bullet-item">
                <IoEllipse size={8} color="#33691E" className="policy-bullet-dot" />
                <p className="policy-bullet-text">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.3s', backgroundColor: '#FFF8E1', borderColor: '#FFECB3' }}>
          <div className="policy-section-header">
            <IoFlag size={28} color="#D84315" />
            <h2 className="policy-section-title" style={{ color: '#D84315' }}>2. How We Use Your Data</h2>
          </div>
          <p className="policy-paragraph">We use your data to:</p>
          <div className="policy-feature-grid">
            <div className="policy-feature-box"><IoCard size={24} color="#D84315" /><p className="policy-feature-text" style={{color: '#D84315'}}>Process & deliver orders</p></div>
            <div className="policy-feature-box"><IoChatbubbles size={24} color="#D84315" /><p className="policy-feature-text" style={{color: '#D84315'}}>Provide customer support</p></div>
            <div className="policy-feature-box"><IoStatsChart size={24} color="#D84315" /><p className="policy-feature-text" style={{color: '#D84315'}}>Improve performance</p></div>
            <div className="policy-feature-box"><IoNotifications size={24} color="#D84315" /><p className="policy-feature-text" style={{color: '#D84315'}}>Send order updates</p></div>
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.4s', backgroundColor: '#263238', borderColor: '#37474F', color: 'white' }}>
          <div className="policy-section-header">
            <IoLockClosed size={28} color="#FFF" />
            <h2 className="policy-section-title" style={{ color: '#FFF' }}>3. Third-Party & 4. Security</h2>
          </div>
          <p className="policy-paragraph" style={{ color: 'rgba(255,255,255,0.8)' }}>We use:</p>
          <div className="policy-bullet-list">
            <div className="policy-bullet-item"><IoCheckmarkCircle size={20} color="#4CAF50" style={{marginRight: '12px'}}/><p className="policy-bullet-text" style={{ color: '#FFF' }}>Firebase (authentication and analytics)</p></div>
            <div className="policy-bullet-item"><IoCheckmarkCircle size={20} color="#4CAF50" style={{marginRight: '12px'}}/><p className="policy-bullet-text" style={{ color: '#FFF' }}>Razorpay (secure payment processing)</p></div>
          </div>
          <div className="policy-info-box" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
            <IoLockClosed size={24} color="#FFF" />
            <p className="policy-info-text" style={{ color: '#FFF' }}>We do not store card or banking details.</p>
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="policy-section-header">
            <IoFingerPrint size={28} color="#33691E" />
            <h2 className="policy-section-title" style={{ color: '#1B5E20' }}>User Rights & Policies</h2>
          </div>
          
          <div className="policy-feature-grid" style={{ gridTemplateColumns: '1fr', gap: '20px' }}>
            <div className="policy-feature-box" style={{ alignItems: 'flex-start'}}>
              <IoTrash size={24} color="#33691E" />
              <div style={{ marginLeft: '16px' }}>
                <p className="policy-bold" style={{ margin: '0 0 4px' }}>5. Data Retention & Deletion</p>
                <p className="policy-paragraph" style={{ margin: 0, fontSize: '14px' }}>Users can request account or data deletion by contacting support. Data will be deleted unless required legally.</p>
              </div>
            </div>
            {/* Add remaining rights similarly... */}
          </div>

          <h3 className="policy-section-title" style={{ color: '#1B5E20', marginTop: '30px', marginBottom: '16px' }}>Contact Us</h3>
          <a href="mailto:support@natureswad.com" className="policy-email-btn interactive-hover">
            <IoMail size={20} color="#FFF" /> Email: support@natureswad.com
          </a>
        </div>
      </main>
    </div>
  );
}