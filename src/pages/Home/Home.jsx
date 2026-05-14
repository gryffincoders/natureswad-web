// src/pages/Home/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch, IoCloseCircle, IoArrowForward, IoLeaf, IoHeartOutline, IoShieldCheckmark, IoWaterOutline } from 'react-icons/io5';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';
import HeaderTemp from '../../components/layout/HeaderTemp';
import { PRODUCTS, slugify } from '../../constants/ProductsData';
import './Home.css';

const cleanText = (text) => text ? text.replace(/\//g, '') : '';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const allProducts = Object.values(PRODUCTS);
  const heroProduct = PRODUCTS['c1'];
  
  // Hero URL formulation
  const heroCategoryPath = slugify(heroProduct.category || 'Other');
  const heroNamePath = slugify(heroProduct.name);
  const heroProductUrl = `/product/${heroCategoryPath}/${heroNamePath}/${heroProduct.id}`;
  
  // Curated lists
  const youMayAlsoLikeIds = ['h1', 'a2', 'f3', 'p2', 'h5', 's1'];
  const youMayAlsoLikeProducts = youMayAlsoLikeIds.map(id => PRODUCTS[id]).filter(Boolean);

  useEffect(() => {
    window.scrollTo(0, 0);
    const defaultRecs = [PRODUCTS['m1'], PRODUCTS['p1'], PRODUCTS['s2'], PRODUCTS['f6']].filter(Boolean);
    setRecommendedProducts(defaultRecs);
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchQuery(text);
    if (text.trim().length > 0) {
      const filtered = allProducts.filter(p => p.name.toLowerCase().includes(text.toLowerCase()) || (p.category && p.category.toLowerCase().includes(text.toLowerCase())));
      setSuggestions(filtered);
    } else { setSuggestions([]); }
  };

  const ProductCard = ({ product }) => {
    if (!product) return null;
    
    const displayImage = product.image || (product.images && product.images[0]) || '';
    
    let highlightTag = "100% Natural";
    if (product.nutritionalInfo?.ingredients?.[0]) {
      highlightTag = cleanText(product.nutritionalInfo.ingredients[0]).substring(0, 20); 
    }

    const categoryPath = slugify(product.category || 'Other');
    const namePath = slugify(product.name);
    const productUrl = `/product/${categoryPath}/${namePath}/${product.id}`;

    return (
      <div className="home-product-card interactive-hover" onClick={() => navigate(productUrl)}>
        <div className="card-image-container">
          {displayImage ? (
            <img src={displayImage} alt={product.name} className="card-image" />
          ) : (
             <IoLeaf size={40} color="#E8E8E8" /> 
          )}
          <button className="quick-add-circle"><IoArrowForward size={20} color="#FFF" /></button>
        </div>
        
        <div className="card-details">
          <span className="card-category">{product.category}</span>
          {/* SEO: Product names are now keyword optimized */}
          <h3 className="card-name line-clamp-2" style={{fontSize: '18px', margin: '0 0 16px'}}>{cleanText(product.name)}</h3>
          
          <div className="card-footer-row">
            <p className="card-price">{product.variants?.[0]?.price || ''}</p>
            <div className="card-mini-tag">
              <IoLeaf size={12} color="#2E7D32" />
              <span>{highlightTag}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <HeaderTemp />

      <main className="home-content-wrapper">
        
        <div className="search-container fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="search-bar">
            <IoSearch size={22} color="#888" className="search-icon" />
            {/* SEO: Added keywords to placeholder */}
            <input 
              type="text" className="search-input"
              placeholder="Search organic millets, healthy breakfast mix, low GI atta..."
              value={searchQuery} onChange={handleSearch}
            />
            {searchQuery.length > 0 && (
              <button onClick={() => { setSearchQuery(''); setSuggestions([]); }} className="clear-btn">
                <IoCloseCircle size={22} color="#CCC" />
              </button>
            )}
          </div>
          
        {suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.slice(0, 5).map((item) => {
                const thumbImage = item.image || (item.images && item.images[0]);
                
                // SEO-friendly URL generation for search results
                const itemCategoryPath = slugify(item.category || 'Other');
                const itemNamePath = slugify(item.name);
                const itemUrl = `/product/${itemCategoryPath}/${itemNamePath}/${item.id}`;

                return (
                  <div 
                    key={item.id} 
                    className="suggestion-item" 
                    onClick={() => { 
                      setSearchQuery(''); 
                      setSuggestions([]); 
                      navigate(itemUrl); // <-- UPDATED NAVIGATE HERE
                    }}
                  >
                    {thumbImage ? (
                      <img src={thumbImage} alt={item.name} className="suggestion-thumb" />
                    ) : (
                      <div className="suggestion-thumb placeholder-thumb">
                        <IoLeaf size={20} color="#CCC" />
                      </div>
                    )}
                    <div className="suggestion-text">
                      <h5 className="truncate">{cleanText(item.name)}</h5>
                      <span>{item.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="hero-banner interactive-hover fade-in-up" style={{ animationDelay: '0.1s' }} onClick={() => navigate(heroProductUrl)}>
          <div className="hero-content">
            <div className="hero-text-content">
              <span className="hero-eyebrow">Buy Healthy Breakfast Mix India</span>
              {/* SEO: Changed to H1 for primary page keyword */}
              <h1 className="hero-title">The Complete<br/>Magic Health Kit</h1>
              <p className="hero-subtitle">Seven days of highly nutritious, gluten-free millet breakfasts crafted for your family's well-being. No preservatives, 100% natural.</p>
              
              <div className="hero-action-row">
                <span className="hero-price">{heroProduct.variants[0].price}</span>
                <button className="hero-shop-btn">Shop Now</button>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <div className="organic-circle"></div>
              <img src={heroProduct.images[0]} alt="Healthy Breakfast Mix India" className="hero-img" />
            </div>
          </div>
        </div>

        {recommendedProducts.length > 0 && (
          <div className="home-section fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="section-header-row">
              {/* SEO: Replaced "Fresh Picks" with keyword H2 */}
              <h2 className="section-title">Buy Organic Food Products Online</h2>
              <button className="see-all-text" onClick={() => navigate('/shop')}>Explore All &rarr;</button>
            </div>
            <div className="product-grid">
              {recommendedProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        )}

        <div className="home-section fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="section-header-row">
            {/* SEO: Keyword H2 */}
            <h2 className="section-title">Diabetic Friendly & Gluten Free Foods</h2>
          </div>
          <div className="product-grid">
            {youMayAlsoLikeProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>

        <div className="home-section fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="trust-grid">
            <div className="trust-badge">
              <div className="trust-icon"><IoLeaf size={28} color="#2E7D32" /></div>
              <h4>100% Pure Organic</h4>
              <p>Chemical free food products sourced directly from farms.</p>
            </div>
            <div className="trust-badge">
              <div className="trust-icon"><IoHeartOutline size={28} color="#2E7D32" /></div>
              <h4>Diabetic Friendly</h4>
              <p>Low GI ancient grains and best millets for diabetes.</p>
            </div>
            <div className="trust-badge">
              <div className="trust-icon"><IoShieldCheckmark size={28} color="#2E7D32" /></div>
              <h4>Zero Preservatives</h4>
              <p>No chemicals, no artificial colors. Natural groceries only.</p>
            </div>
            <div className="trust-badge">
              <div className="trust-icon"><IoWaterOutline size={28} color="#2E7D32" /></div>
              <h4>Rich in Fiber</h4>
              <p>Gluten free millet products that aid digestion.</p>
            </div>
          </div>
        </div>

        <div className="supplier-banner interactive-hover fade-in-up" style={{ animationDelay: '0.5s' }} onClick={() => navigate('/contact')}>
          <div className="supplier-content">
            <div className="supplier-text">
              <h3>Join Our Natural Grocery Network</h3>
              <p>Addressing specific nutritional needs with customized diet & lifestyle realignments across India.</p>
            </div>
            <button className="supplier-btn">Get In Touch</button>
          </div>
        </div>

        <footer className="home-footer">
          <h2 className="footer-brand">NATURESWAD FOODS</h2>
          <p className="footer-tagline">Buy Natural Groceries Online | Wholesome Goodness, Naturally.</p>
          <div className="footer-socials">
            <a href="https://instagram.com" className="social-link"><FaInstagram size={20} /></a>
            <a href="https://facebook.com" className="social-link"><FaFacebook size={20} /></a>
            <a href="mailto:sales@natureswad.com" className="social-link"><FaEnvelope size={20} /></a>
          </div>
          <p className="footer-copyright">© 2026 Natureswad Foods. All rights reserved.</p>
        </footer>

      </main>
    </div>
  );
}