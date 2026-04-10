// src/pages/Policies/Shipping.jsx
import React, { useEffect } from 'react';
import { IoBus, IoFlash, IoMap, IoEllipse, IoCash, IoTime, IoAlertCircle, IoRainy, IoCar, IoStatsChart, IoInformationCircle, IoCloseCircle, IoHeadset, IoMail } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import './Policies.css';

export default function Shipping() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="policy-main-container">
      <div className="bg-blob blob1" style={{ backgroundColor: '#E0F7FA' }}></div>
      <div className="bg-blob blob2" style={{ backgroundColor: '#FFF3E0' }}></div>
      <HeaderTemp showBack={true} />

      <main className="policy-content-wrapper">
        <div className="policy-hero-card fade-in-up" style={{ backgroundColor: '#006064' }}>
          <div className="hero-icon-container"><IoBus size={32} color="#FFF" /></div>
          <div>
            <h1 className="hero-main-title">Shipping & Delivery</h1>
            <p className="hero-sub-title">Last Updated: March 2026</p>
          </div>
        </div>

        <div className="policy-notice-banner fade-in-up" style={{ backgroundColor: '#E0F7FA', color: '#00838F' }}>
          <IoFlash size={28} color="#00838F" />
          <p className="policy-notice-text">At Natureswad Foods Private Limited, we aim to deliver your orders quickly and efficiently.</p>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="policy-section-header">
            <IoMap size={28} color="#1B5E20" />
            <h2 className="policy-section-title" style={{ color: '#1B5E20' }}>1. Delivery Areas & Time</h2>
          </div>
          <p className="policy-paragraph">We currently deliver to selected locations based on service availability.</p>
          <div className="policy-bullet-list">
            <div className="policy-bullet-item"><IoEllipse size={8} color="#1B5E20" className="policy-bullet-dot"/><p className="policy-bullet-text">Orders are typically delivered within 2–5 business days.</p></div>
            <div className="policy-bullet-item"><IoEllipse size={8} color="#1B5E20" className="policy-bullet-dot"/><p className="policy-bullet-text">Delivery timelines may vary depending on location, product availability, and external factors.</p></div>
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.2s', backgroundColor: '#E0F7FA', borderColor: '#B2EBF2' }}>
          <div className="policy-section-header">
            <IoCash size={28} color="#00838F" />
            <h2 className="policy-section-title" style={{ color: '#006064' }}>2. Charges & Processing</h2>
          </div>
          <div className="policy-info-box" style={{ backgroundColor: 'white', borderColor: 'white' }}>
            <IoTime size={24} color="#00838F" />
            <p className="policy-info-text" style={{ color: '#006064' }}>Orders are processed within 24 hours of confirmation.</p>
          </div>
          <div className="policy-bullet-list">
            <div className="policy-bullet-item"><IoEllipse size={8} color="#00838F" className="policy-bullet-dot"/><p className="policy-bullet-text">Delivery charges may apply depending on order value and location.</p></div>
            <div className="policy-bullet-item"><IoEllipse size={8} color="#00838F" className="policy-bullet-dot"/><p className="policy-bullet-text">Free delivery may be offered on orders above a certain amount.</p></div>
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="policy-section-header">
            <IoAlertCircle size={28} color="#D84315" />
            <h2 className="policy-section-title" style={{ color: '#D84315' }}>3. Delays & Tracking</h2>
          </div>
          <p className="policy-paragraph">Delivery may be delayed due to:</p>
          <div className="policy-feature-grid">
            <div className="policy-feature-box"><IoRainy size={20} color="#D84315" /><p className="policy-feature-text" style={{color: '#D84315'}}>Weather conditions</p></div>
            <div className="policy-feature-box"><IoCar size={20} color="#D84315" /><p className="policy-feature-text" style={{color: '#D84315'}}>Logistics issues</p></div>
            <div className="policy-feature-box"><IoStatsChart size={20} color="#D84315" /><p className="policy-feature-text" style={{color: '#D84315'}}>High demand</p></div>
          </div>
          
          <div className="policy-info-box" style={{ backgroundColor: '#FFF3E0', borderColor: '#FFE0B2', marginTop: '24px' }}>
            <IoInformationCircle size={24} color="#D84315" />
            <p className="policy-info-text" style={{ color: '#D84315' }}>Natureswad is not liable for delays caused by third-party delivery partners.</p>
          </div>
        </div>

        <div className="policy-section-card fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="policy-section-header">
            <IoHeadset size={28} color="#1B5E20" />
            <h2 className="policy-section-title" style={{ color: '#1B5E20' }}>Contact Us</h2>
          </div>
          <p className="policy-paragraph">For any shipping-related queries:</p>
          <a href="mailto:support@natureswad.com" className="policy-email-btn interactive-hover">
            <IoMail size={20} color="#FFF" /> support@natureswad.com
          </a>
        </div>
      </main>
    </div>
  );
}