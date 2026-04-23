import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import { PRODUCTS, slugify } from '../../constants/ProductsData';
import { useWishlist } from '../../context/WishlistContext'; 
import './Shop.css';

const cleanText = (text) => text ? text.replace(/\//g, '') : '';

const CATEGORY_DESCRIPTIONS = {
  'Atta & Grains': 'Buy organic atta online, low GI flours, and the best millets for diabetes.',
  'Pulses & Dals': 'Buy organic dal online India. Protein-rich, chemical-free pulses for daily nutrition.',
  'Health Care': 'Natural health food products, no preservative pickles, and cold pressed oils India.',
  'Combo': 'Healthy breakfast mix India. The perfect gluten-free gifts for your family.',
};

const getGroupedProducts = () => {
  const groups = {};
  Object.values(PRODUCTS).forEach((product) => {
    const cat = product.category || 'Other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(product);
  });

  const sections = Object.keys(groups).map((cat, index) => ({
    id: String(index),
    category: cat,
    description: CATEGORY_DESCRIPTIONS[cat] || 'Buy organic food products and natural groceries online India.',
    items: groups[cat],
  }));

  const categories = ['All', ...Object.keys(groups)];
  return { sections, categories };
};

export default function Shop() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { toggleWishlistItem, isInWishlist, getWishlistCount, openWishlist } = useWishlist(); 
  
  const { sections, categories } = useMemo(() => getGroupedProducts(), []);

  const ProductCard = ({ item }) => {
    const liked = isInWishlist(item.id);
    const displayImage = item.image || (item.images && item.images[0]);
    const displayPrice = item.variants && item.variants.length > 0 ? item.variants[0].price : '';

    const handleToggleLike = (e) => {
      e.stopPropagation(); 
      toggleWishlistItem({ id: item.id, name: item.name, price: displayPrice, image: displayImage });
    };

    const handleProductClick = () => {
      const categoryPath = slugify(item.category);
      const productNamePath = slugify(item.name);
      // Constructing: /product/category-name/product-name/id
      navigate(`/product/${categoryPath}/${productNamePath}/${item.id}`);
    };

    const nameParts = cleanText(item.name).split('|');
    const displayTitle = nameParts[0].trim();

    return (
      <div className="product-card interactive-hover" onClick={handleProductClick}>
        <button className="like-btn" onClick={handleToggleLike}>
          {liked ? <IoHeart size={20} color="#e74c3c" /> : <IoHeartOutline size={20} color="#888" />}
        </button>

        <div className="image-wrapper">
          <img src={displayImage} alt={item.name} className="product-image" />
          <div className="image-overlay"></div>
        </div>

        <div className="card-content">
          <h3 className="product-name line-clamp-2" style={{fontSize: '16px', margin: '0 0 12px'}}>{displayTitle}</h3>
          <div className="action-row">
            <span className="product-price">{displayPrice}</span>
            <button className="add-button" onClick={(e) => { e.stopPropagation(); handleProductClick(); }}>VIEW</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="shop-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      <HeaderTemp />

      <button className="wishlist-float interactive-hover" onClick={openWishlist}>
        <IoHeart size={24} color="#FFF" />
        <span className="wishlist-badge">{getWishlistCount()}</span>
      </button>

      <div className="filter-container">
        <div className="filter-scroll">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="shop-scroll-content">
        <div className="hero-section fade-in-up">
          <h1 className="page-title">Buy Organic Food Products India</h1>
          <div className="divider"></div>
          <p className="page-subtitle">Buy millets online, natural groceries, and chemical-free foods.</p>
        </div>

        {sections.map((section, index) => {
          if (selectedCategory !== 'All' && section.category !== selectedCategory) return null;

          return (
            <div key={section.id} className="section-container fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
              <div className="section-header-row">
                <div>
                  <h2 className="category-title">{section.category}</h2>
                  <p className="category-desc">{section.description}</p>
                </div>
              </div>

              <div className="horizontal-list-content">
                {section.items.map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}