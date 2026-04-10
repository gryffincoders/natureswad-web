// src/pages/Testimonials/Testimonials.jsx
import React, { useEffect } from 'react';
import { IoChatbubbles, IoShieldCheckmark, IoLeaf } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    id: 'oTPwvJ4Hx4o',
    title: 'Diabetic Care Results',
    customer: 'Ramesh Kumar',
    quote: "I've seen a real difference in my health. Highly recommended!",
    date: '2 weeks ago',
  },
  {
    id: 'EvyqVigBtuo',
    title: 'DCA Customer Story',
    customer: 'Priya Sharma',
    quote: "The quality is unmatched. Truly nature's goodness.",
    date: '1 month ago',
  },
  {
    id: 'vRUssHRnP4Y',
    title: 'Diabetic Care Atta Review',
    customer: 'Ashwathamma',
    quote: 'Healthy and tasty. Ordering again!',
    date: '2 months ago',
  },
];

const FARMER_VIDEO_ID = 'oMy_3E8_O6s';

export default function Testimonials() {
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="test-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      <HeaderTemp showBack={true} />

      <main className="test-content-wrapper">
        
        {/* --- HERO SECTION --- */}
        <div className="test-hero fade-in-up">
          <h1 className="test-page-title">Our Community</h1>
          <div className="test-divider"></div>
          <p className="test-page-subtitle">Real people. Real impact. Real swad.</p>
        </div>

        {/* --- FEATURED FARMER SECTION (Wide Desktop Layout) --- */}
        <div className="farmer-featured-card fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="farmer-text-content">
            <div className="farmer-title-row">
              <IoLeaf size={32} color="#2E7D32" />
              <h2 className="farmer-title">Straight from Farmers</h2>
            </div>
            <p className="farmer-subtext">
              See how your purchases directly empower local farming communities, promote sustainable agriculture, and bring the purest ingredients straight from the soil to your table.
            </p>
            <div className="farmer-badges">
              <span className="farmer-badge">100% Organic</span>
              <span className="farmer-badge">Fair Trade</span>
            </div>
          </div>
          
          <div className="farmer-video-wrapper">
            <iframe 
              className="youtube-iframe"
              src={`https://www.youtube.com/embed/${FARMER_VIDEO_ID}?modestbranding=1&rel=0`} 
              title="Straight from Farmers"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* --- CUSTOMER STORIES GRID --- */}
        <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-heading">Customer Stories</h2>
          
          <div className="testimonials-grid">
            {TESTIMONIALS.map((item, index) => (
              <div key={item.id} className="test-card interactive-hover" style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}>
                
                {/* Video */}
                <div className="card-video-wrapper">
                  <iframe 
                    className="youtube-iframe"
                    src={`https://www.youtube.com/embed/${item.id}?modestbranding=1&rel=0`} 
                    title={item.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Content */}
                <div className="test-card-content">
                  <div className="test-title-row">
                    <h3 className="test-video-title truncate">{item.title}</h3>
                    <span className="test-date">{item.date}</span>
                  </div>
                  
                  <p className="test-customer-name">By {item.customer}</p>
                  
                  <div className="test-quote-box">
                    <div className="quote-icon-wrapper">
                      <IoChatbubbles size={18} color="#2E7D32" />
                    </div>
                    <p className="test-quote">"{item.quote}"</p>
                  </div>

                  <div className="test-footer-row">
                    <div className="verified-badge">
                      <IoShieldCheckmark size={16} color="#2E7D32" />
                      <span className="verified-text">Verified Purchase</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}