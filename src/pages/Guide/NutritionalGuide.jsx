// src/pages/Guide/NutritionalGuide.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { IoLeaf, IoSearch, IoClose, IoSparkles, IoCheckmarkCircle, IoInformationCircleOutline } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import { PRODUCTS } from '../../constants/ProductsData';
import './NutritionalGuide.css';

// Utility function to clean text
const cleanText = (text) => text ? text.replace(/\//g, '') : '';

export default function NutritionalGuide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 1. Extract ingredients that have nutritional data
  const ingredients = useMemo(() => {
    return Object.values(PRODUCTS).filter(
      p => p.nutritionalInfo && p.nutritionalInfo.healthBenefits
    );
  }, []);

  // 2. Dynamic Categories
  const categories = useMemo(() => {
    return ['All', ...new Set(ingredients.map(p => p.category))];
  }, [ingredients]);

  // 3. Filtering Logic
  const filteredIngredients = ingredients.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="guide-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      <HeaderTemp />

      <main className="guide-content-wrapper">
        
        {/* HERO SECTION */}
        <section className="guide-hero fade-in-up">
          <div className="guide-icon-badge">
            <IoLeaf size={32} color="#1B5E20" />
          </div>
          <h1 className="guide-title">Nutritional Science</h1>
          <p className="guide-subtitle">
            Ancient wisdom meets modern science. Discover the therapeutic benefits of our 100% natural ingredients.
          </p>
        </section>

        {/* SEARCH & FILTER BAR */}
        <div className="guide-controls fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="guide-search-box">
            <IoSearch size={22} color="#888" />
            <input 
              type="text" 
              placeholder="Search e.g. Black Wheat, Millets, Moringa..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && <IoClose size={20} color="#999" className="clear-search" onClick={() => setSearchQuery('')} />}
          </div>

          <div className="guide-category-filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* INGREDIENT GRID */}
        <div className="guide-grid fade-in-up" style={{ animationDelay: '0.2s' }}>
          {filteredIngredients.length > 0 ? (
            filteredIngredients.map((item) => {
              // Extract best image (handles products with single 'image' or array of 'images')
              const displayImg = item.image || (item.images && item.images[0]) || '/assets/icon.png';
              
              // Split SEO Title
              const nameParts = cleanText(item.name).split('|');
              const mainTitle = nameParts[0].trim();

              return (
                <div 
                  key={item.id} 
                  className="ingredient-card interactive-hover"
                  onClick={() => setSelectedIngredient(item)}
                >
                  <div className="ingredient-thumb">
                    <img src={displayImg} alt={mainTitle} />
                  </div>
                  <div className="ingredient-info">
                    <span className="ing-cat">{item.category}</span>
                    <h3 className="ing-name line-clamp-2">{mainTitle}</h3>
                    <div className="ing-preview line-clamp-2" style={{fontSize: '13px', color: '#666', marginTop: '8px', lineHeight: '1.4'}}>
                      {item.nutritionalInfo.healthBenefits[0]}
                    </div>
                    <button className="read-more-btn" style={{marginTop: '12px'}}>Understand Science</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="guide-empty-state">
              <IoInformationCircleOutline size={48} color="#CCC" />
              <p>No ingredients match your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* SCIENCE MODAL */}
      {selectedIngredient && (() => {
        // Evaluate data specifically for the selected modal item
        const displayImg = selectedIngredient.image || (selectedIngredient.images && selectedIngredient.images[0]) || '/assets/icon.png';
        const nameParts = cleanText(selectedIngredient.name).split('|');
        const mainTitle = nameParts[0].trim();
        const subTitle = nameParts.length > 1 ? nameParts[1].trim() : '';

        return (
          <div className="science-modal-overlay" onClick={() => setSelectedIngredient(null)}>
            <div className="science-modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedIngredient(null)}>
                <IoClose size={24} />
              </button>

              <div className="modal-body-layout">
                <div className="modal-image-side">
                  <img src={displayImg} alt={mainTitle} />
                  <div className="modal-cat-tag">{selectedIngredient.category}</div>
                </div>

                <div className="modal-text-side">
                  {/* Styled Title & Subtitle Split */}
                  <h2 className="modal-title" style={{ marginBottom: subTitle ? '4px' : '20px' }}>
                    {mainTitle}
                  </h2>
                  {subTitle && (
                    <h3 className="modal-subtitle" style={{ fontSize: '16px', color: '#2E7D32', fontWeight: '600', margin: '0 0 20px 0', fontFamily: 'sans-serif' }}>
                      {subTitle}
                    </h3>
                  )}
                  
                  <div className="modal-section">
                    <h4 className="modal-section-title">
                      <IoSparkles color="#F25D23" /> Therapeutic Benefits
                    </h4>
                    <ul className="modal-benefits-list">
                      {selectedIngredient.nutritionalInfo.healthBenefits.map((benefit, i) => (
                        <li key={i} style={{marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '10px'}}>
                          <IoCheckmarkCircle color="#4CAF50" style={{flexShrink: 0, marginTop: '2px'}} />
                          <span style={{lineHeight: '1.5', color: '#444'}}>{cleanText(benefit)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="modal-section" style={{marginTop: '24px'}}>
                    <h4 className="modal-section-title" style={{fontSize: '16px', fontWeight: '700', marginBottom: '12px'}}>Key Nutrients</h4>
                    <div className="modal-nutrient-tags" style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                      {selectedIngredient.nutritionalInfo.keyNutrients.map((n, i) => (
                        <span key={i} className="nutrient-tag" style={{background: '#F1F8E9', color: '#1B5E20', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '600'}}>
                          {cleanText(n)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}