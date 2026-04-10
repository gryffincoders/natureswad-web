// src/pages/ProductDetail/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoShareSocialOutline, IoPricetag, IoDocumentText, IoSparkles, IoAdd, IoRemove, IoBagAdd, IoCheckmarkCircle } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import { PRODUCTS } from '../../constants/ProductsData';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

// Keep utility if you have it, otherwise local simple cleaner
const cleanText = (text) => text ? text.replace(/\//g, '') : '';

export default function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const { addToCart, openCart } = useCart();
  
  const product = PRODUCTS[id] || PRODUCTS['a1']; 
  const productImages = product.images ? product.images : (product.image ? [product.image] : []);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false); 

  const selectedVariant = product.variants ? product.variants[selectedVariantIndex] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setSelectedVariantIndex(0);
    setActiveImageIndex(0);
  }, [id]);

 const handleAddToCartClick = () => {
  if (!selectedVariant) return;

  // ✅ Existing cart logic
  addToCart({
    id: product.id,
    name: product.name,
    price: selectedVariant.price, 
    image: productImages[0],
    quantity: quantity,
    weight: selectedVariant.label 
  });

  //  GTM TRACKING (VERY IMPORTANT)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "add_to_cart",
    ecommerce: {
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: selectedVariant.price,
        quantity: quantity
      }]
    }
  });

  console.log(" add_to_cart fired", product.name);

  setIsAdded(true);

  setTimeout(() => {
    setIsAdded(false);
    openCart(); 
  }, 600);
};

  const handleShare = async () => {
    const shareMessage = `Check out this amazing natural product! 🌿\n\n✨ ${product.name}\n💰 ${selectedVariant?.price || ''}\n\nGet it now on Natureswad!`;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, text: shareMessage, url: window.location.href }); } 
      catch (error) { console.error("Error sharing:", error); }
    } else {
      navigator.clipboard.writeText(`${shareMessage} ${window.location.href}`);
      alert('Product link copied to clipboard!');
    }
  };

  const renderRelatedItem = (relatedId) => {
    const related = PRODUCTS[relatedId]; 
    if(!related) return null;
    const startPrice = related.variants ? related.variants[0].price : 'N/A';
    const displayImage = related.image || (related.images && related.images[0]); 
    
    // Clean up related title for UI display
    const relatedTitleParts = cleanText(related.name).split('|');
    const displayRelatedTitle = relatedTitleParts[0].trim();

    return (
      <div key={related.id} className="related-card interactive-hover" onClick={() => navigate(`/product/${related.id}`)}>
        <div className="related-image-wrapper">
          <img src={displayImage} alt={related.name} className="related-image" />
        </div>
        <h4 className="related-title line-clamp-2">{displayRelatedTitle}</h4>
        <span className="related-price">{startPrice}</span>
        <div className="add-mini-btn"><IoAdd size={16} color="#1B5E20" /></div>
      </div>
    );
  };

  // SEO TITLE SPLITTER LOGIC
  const nameParts = cleanText(product.name).split('|');
  const mainTitle = nameParts[0].trim();
  const subTitle = nameParts.length > 1 ? nameParts[1].trim() : '';

  return (
    <div className="pd-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      <HeaderTemp showBack={true} /> 
      
      <main className="pd-content-wrapper">
        
        <div className="pd-top-split fade-in-up">
          
          {/* LEFT SIDE: Image Gallery */}
          <div className="pd-gallery-section">
            <div className="main-image-box">
              {/* Added product.name to alt tag for Image SEO */}
              <img src={productImages[activeImageIndex]} alt={product.name} className="main-image" />
            </div>
            
            {productImages.length > 1 && (
              <div className="thumbnail-row">
                {productImages.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail-box ${activeImageIndex === index ? 'active-thumb' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={img} alt={`${mainTitle} Thumbnail ${index + 1}`} className="thumbnail-image" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Product Info & Actions */}
          <div className="pd-info-section">
            <div className="title-row">
              {/* SEO Optimized Heading Structure */}
              <div className="title-wrapper">
                <h1 className="pd-title" style={{ marginBottom: subTitle ? '4px' : '16px' }}>{mainTitle}</h1>
                {subTitle && (
                  <h2 className="pd-subtitle" style={{ fontSize: '16px', color: '#666', fontWeight: '500', margin: '0 0 16px 0', fontFamily: 'sans-serif' }}>
                    {subTitle}
                  </h2>
                )}
              </div>
              <button className="share-btn interactive-hover" onClick={handleShare}>
                <IoShareSocialOutline size={22} color="#1B5E20" />
              </button>
            </div>

            <p className="category-text">{product.category || 'Premium Health'}</p>
            
            <div className="price-row">
              <span className="current-price">{selectedVariant?.price}</span>
              {selectedVariant?.originalPrice && (
                <span className="original-price">{selectedVariant?.originalPrice}</span>
              )}
            </div>

            {selectedVariant?.promoText && (
              <div className="promo-badge">
                <IoPricetag size={14} color="#D84315" />
                <span className="promo-text">{selectedVariant.promoText}</span>
              </div>
            )}

            {product.variants && (
              <div className="variant-container">
                <h3 className="section-header">Select Pack Size</h3>
                <div className="variant-grid">
                  {product.variants.map((variant, index) => (
                    <div 
                      key={index} 
                      className={`variant-pill ${selectedVariantIndex === index ? 'active-variant' : ''}`}
                      onClick={() => setSelectedVariantIndex(index)}
                    >
                      <span className="variant-label">{variant.label}</span>
                      <span className="variant-price">{variant.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="cart-actions-row">
              <div className="qty-wrapper">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-btn">
                  <IoRemove size={20} color={quantity === 1 ? "#999" : "#1B5E20"} />
                </button>
                <span className="qty-text">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="qty-btn">
                  <IoAdd size={20} color="#1B5E20" />
                </button>
              </div>

              <button 
  className={`add-to-bag-btn interactive-hover ${isAdded ? 'btn-success' : ''}`} 
  onClick={handleAddToCartClick}
  disabled={isAdded}
>
  <span className="add-to-bag-text">
    {isAdded ? 'ADDED TO CART!' : 'ADD TO CART'}
  </span>
  {isAdded ? (
    <IoCheckmarkCircle size={22} color="#FFF" style={{ marginLeft: '8px' }} />
  ) : (
    <IoBagAdd size={22} color="#FFF" style={{ marginLeft: '8px' }} />
  )}
</button>
            </div>

            {product.highlight && (
              <div className="highlight-box">
                <IoSparkles size={20} color="#F57F17" style={{ marginRight: '12px', flexShrink: 0 }} />
                <p className="highlight-text">{product.highlight}</p>
              </div>
            )}
          </div>
        </div>

        <div className="pd-divider"></div>

        <div className="pd-bottom-details fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="description-section">
            <div className="section-title-row">
              <IoDocumentText size={24} color="#33691E" />
              {/* Changed to H2 for SEO Hierarchy */}
              <h2 className="large-section-header">Product Description</h2>
            </div>
            <p className="description-text">{product.description}</p>
            
            {/* Added Nutritional Info dynamically if it exists */}
            {product.nutritionalInfo && (
              <div className="nutrition-block" style={{ marginTop: '24px', padding: '20px', background: '#F1F8E9', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '18px', color: '#1B5E20', marginBottom: '12px' }}>Why Choose This?</h3>
                <ul style={{ paddingLeft: '20px', color: '#444', lineHeight: '1.6' }}>
                  {product.nutritionalInfo.healthBenefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="related-section">
            <h2 className="large-section-header">You May Also Like</h2>
            <div className="related-list">
              {['a1', 'h1', 'h4', 'c1'].map(id => renderRelatedItem(id))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}