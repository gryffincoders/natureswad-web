// src/pages/Policies/Refund.jsx
import React, { useEffect } from 'react';
import { IoRefreshCircle, IoShieldCheckmark, IoCloseCircle, IoEllipse, IoCash, IoCheckmarkCircle, IoCheckmark, IoTime, IoCard, IoAlertCircle, IoRemoveCircle, IoHeadset, IoMail } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import './Policies.css';

export default function Refund() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="policy-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <HeaderTemp showBack={true} />

      <main className="policy-content-wrapper">
        <div className="policy-hero-card fade-in-up" style={{ backgroundColor: '#2E7D32' }}>
          <div className="hero-icon-container"><IoRefreshCircle size={36} color="#FFF" /></div>
          <div>
            <h1 className="hero-main-title">Returns & Refund Policy</h1>
            <p className="hero-sub-title">Last Updated: March 2026</p>
          </div>
        </div>

        <div className="policy-notice-banner fade-in-up" style={{ backgroundColor: '#E8F5E9', color: '#1B5E20' }}>
          <IoShieldCheckmark size={28} color="#2E7D32" />
          <p className="policy-notice-text">At Natureswad Foods Private Limited, we aim to provide high-quality products and a seamless shopping experience.</p>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="policy-section-header">
            <IoCloseCircle size={28} color="#D84315" />
            <h2 className="policy-section-title" style={{ color: '#D84315' }}>1. Order Cancellation</h2>
          </div>
          <div className="policy-bullet-list">
            <div className="policy-bullet-item"><IoEllipse size={8} color="#D84315" className="policy-bullet-dot"/><p className="policy-bullet-text">Orders can be cancelled only before they are processed or dispatched.</p></div>
            <div className="policy-bullet-item"><IoEllipse size={8} color="#D84315" className="policy-bullet-dot"/><p className="policy-bullet-text">Once an order is confirmed and processed, it cannot be cancelled.</p></div>
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.2s', backgroundColor: '#F1F8E9', borderColor: '#C8E6C9' }}>
          <div className="policy-section-header">
            <IoCheckmarkCircle size={28} color="#2E7D32" />
            <h2 className="policy-section-title" style={{ color: '#1B5E20' }}>3. Refund Policy</h2>
          </div>
          <p className="policy-paragraph">Refunds will be issued only in the following cases:</p>
          
          <div className="policy-feature-grid">
            {['Failed or unsuccessful online payment', 'Incorrect item delivered', 'Damaged or defective product received', 'Order not delivered'].map((text, i) => (
              <div key={i} className="policy-feature-box" style={{backgroundColor: 'white'}}>
                <IoCheckmark size={20} color="#2E7D32" style={{marginRight: '12px'}}/>
                <span className="policy-feature-text" style={{color: '#2E7D32'}}>{text}</span>
              </div>
            ))}
          </div>

          <div className="policy-info-box" style={{ marginTop: '24px' }}>
            <IoTime size={24} color="#33691E" />
            <p className="policy-info-text">Approved refunds will be processed within 5–7 business days.</p>
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.3s', backgroundColor: '#FFF3E0', borderColor: '#FFCCBC' }}>
          <div className="policy-section-header">
            <IoAlertCircle size={28} color="#D84315" />
            <h2 className="policy-section-title" style={{ color: '#D84315' }}>5. Non-Returnable Items</h2>
          </div>
          <p className="policy-paragraph">Due to the nature of our products, we do not accept returns for:</p>
          {['Food items and consumables', 'Opened or used products', 'Perishable goods'].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <IoRemoveCircle size={20} color="#D84315" />
              <span style={{ marginLeft: '12px', fontSize: '16px', color: '#BF360C', fontWeight: '500' }}>{text}</span>
            </div>
          ))}
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="policy-section-header">
            <IoHeadset size={28} color="#1B5E20" />
            <h2 className="policy-section-title" style={{ color: '#1B5E20' }}>Contact Us</h2>
          </div>
          <p className="policy-paragraph">If you receive a damaged or incorrect product, you must notify us within 24 hours of delivery.</p>
          <a href="mailto:support@natureswad.com" className="policy-email-btn interactive-hover">
            <IoMail size={20} color="#FFF" /> support@natureswad.com
          </a>
        </div>
      </main>
    </div>
  );
}