// src/components/layout/WishlistDrawer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose, IoTrashOutline, IoHeartOutline, IoArrowForward, IoHeart } from 'react-icons/io5';
import { useWishlist } from '../../context/WishlistContext';
import './WishlistDrawer.css';
import { cleanText } from '../../utils/textUtils';

export default function WishlistDrawer() {
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlistItem, clearWishlist, isWishlistOpen, closeWishlist } = useWishlist();

  const handleViewProduct = (id) => {
    closeWishlist();
    navigate(`/product/${id}`);
  };

  const handleBrowse = () => {
    closeWishlist();
    navigate('/shop');
  };

  return (
    <>
      {/* Dark Overlay */}
      <div className={`wishlist-overlay ${isWishlistOpen ? 'active' : ''}`} onClick={closeWishlist} />

      {/* Sliding Drawer */}
      <div className={`wishlist-drawer ${isWishlistOpen ? 'open' : ''}`}>
        
        {/* Header */}
        <div className="wishlist-drawer-header">
          <div className="wishlist-header-left">
            <IoHeart size={24} color="#E53935" />
            <h3>My Wishlist ({wishlistItems.length})</h3>
          </div>
          <button className="wishlist-close-btn interactive-hover" onClick={closeWishlist}>
            <IoClose size={28} color="#333" />
          </button>
        </div>

        {/* Clear All Sub-header */}
        {wishlistItems.length > 0 && (
          <div className="wishlist-action-bar">
            <span className="wishlist-subtitle">Saved items you love</span>
            <button className="wishlist-clear-btn interactive-hover" onClick={clearWishlist}>
              <IoTrashOutline size={16} /> Clear All
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="wishlist-drawer-content">
          {wishlistItems.length === 0 ? (
            <div className="wishlist-empty-state fade-in-up">
              <div className="empty-heart-wrapper">
                <IoHeartOutline size={64} color="#FFCDD2" />
              </div>
              <p>Your wishlist is empty.</p>
              <span>Save products you love by tapping the heart icon.</span>
              <button className="browse-products-btn interactive-hover" onClick={handleBrowse}>
                Browse Products
              </button>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlistItems.map((item, index) => (
                <div key={item.id} className="wishlist-drawer-item fade-in-up" style={{ animationDelay: `${0.05 * index}s` }}>
                  
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="wishlist-item-thumb interactive-hover" 
                    onClick={() => handleViewProduct(item.id)} 
                  />
                  
                  <div className="wishlist-item-info">
                    <h4 className="line-clamp-2">{cleanText(item.name)}</h4>
                    <span className="wishlist-item-price">{item.price}</span>
                    
                    <button className="wishlist-view-btn interactive-hover" onClick={() => handleViewProduct(item.id)}>
                      View Details <IoArrowForward size={14} />
                    </button>
                  </div>

                  <button className="wishlist-item-remove interactive-hover" onClick={() => toggleWishlistItem(item)}>
                    <IoTrashOutline size={18} color="#E53935" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}