// src/components/layout/HeaderTemp.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMenu, IoNavigate, IoChevronDown, IoArrowBack, IoCartOutline } from 'react-icons/io5';
import Sidebar from './Sidebar'; 
import { useCart } from '../../context/CartContext'; 
import './HeaderTemp.css';

// --- SESSION CACHE (Persists across screen switches until refresh) ---
let cachedLocationInfo = null;
let isFetchingInProgress = false;

const HeaderTemp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const { openCart, cartItems } = useCart(); 
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Initialize state with cache if available
  const [locationTitle, setLocationTitle] = useState(cachedLocationInfo?.title || 'Fetching Location...');
  const [locationSubtitle, setLocationSubtitle] = useState(cachedLocationInfo?.subtitle || 'Please wait...');

  const isHome = pathname === '/' || pathname === '/home';
  

  /* ------------------ LOCATION FETCHING (MIMICKING MOBILE) ------------------ */
  const fetchLocation = async (forceRefresh = false) => {
    // 1. Use cache if available and not forcing refresh
    if (!forceRefresh && cachedLocationInfo) {
      setLocationTitle(cachedLocationInfo.title);
      setLocationSubtitle(cachedLocationInfo.subtitle);
      return;
    }

    // 2. Prevent overlapping fetches
    if (isFetchingInProgress) return;
    
    isFetchingInProgress = true;
    setLocationTitle('Locating...');
    setLocationSubtitle('Fetching your address...');

    if (!navigator.geolocation) {
      setLocationTitle('Location Denied');
      setLocationSubtitle('Browser does not support geolocation.');
      isFetchingInProgress = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Requesting max detail (zoom=18 is street level)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();

          if (data && data.address) {
            const addr = data.address;
            
            // EXACT MATCH TO MOBILE LOGIC: Title -> (name || street || district)
            const mainName = addr.amenity || addr.building || addr.road || addr.neighbourhood || addr.suburb || 'Current Location';

            // EXACT MATCH TO MOBILE LOGIC: Subtitle -> [street, subregion, district, city, region]
            const addressParts = [
              addr.road,
              addr.neighbourhood || addr.suburb || addr.residential, // equivalent to subregion
              addr.city_district || addr.county,                     // equivalent to district
              addr.city || addr.town || addr.village,                // equivalent to city
              addr.state                                             // equivalent to region
            ];

            // Filter out null/undefined values and join with commas
            const fullAddress = addressParts.filter(Boolean).join(', ');

            // Save to global cache
            cachedLocationInfo = { 
              title: mainName, 
              subtitle: fullAddress || data.display_name || 'Address details not found' 
            };
            
            setLocationTitle(cachedLocationInfo.title);
            setLocationSubtitle(cachedLocationInfo.subtitle);
          } else {
            throw new Error('No exact address found');
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          setLocationTitle('Location Error');
          setLocationSubtitle('Tap here to try again.');
        } finally {
          isFetchingInProgress = false;
        }
      },
      (error) => {
        setLocationTitle('Location Denied');
        setLocationSubtitle('Please allow location access.');
        isFetchingInProgress = false;
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  useEffect(() => { 
    if (isHome) fetchLocation(false); 
  }, [isHome]);


  return (
    <>
      <header className="header-safe-area">
        <div className="header-container">
          
          <div className="header-left-group">
            <button onClick={() => setIsSidebarOpen(true)} className="header-btn menu-btn">
              <IoMenu size={28} color="#1B5E20" />
            </button>
            <img src="/assets/icon.png" alt="Natureswad Logo" className="header-logo-web interactive-hover" onClick={() => navigate('/')} />

            <div className="header-dynamic-left">
  {isHome && (
    <div className="location-container interactive-hover" onClick={() => fetchLocation(true)}>
      <div className="location-title-row">
        <IoNavigate size={20} color="#F25D23" className="location-icon" />
        <span className="location-title truncate-text">{locationTitle}</span>
        <IoChevronDown size={18} color="#2E7D32" className="chevron-icon" />
      </div>
      <span className="location-subtitle truncate-text">{locationSubtitle}</span>
    </div>
  )}
</div>
</div>

          <nav className="header-nav-desktop">
            <span className={`nav-link ${pathname === '/' ? 'active-nav' : ''}`} onClick={() => navigate('/')}>Home</span>
            <span className={`nav-link ${pathname.includes('/shop') || pathname.includes('/product') ? 'active-nav' : ''}`} onClick={() => navigate('/shop')}>Shop</span>
            <span className={`nav-link ${pathname === '/bot' ? 'active-nav' : ''}`} onClick={() => navigate('/bot')}>Ask Sage</span>
            <span className={`nav-link ${pathname === '/testimonials' ? 'active-nav' : ''}`} onClick={() => navigate('/testimonials')}>Community</span>
          </nav>

          <div className="header-right-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
             <button 
               className="header-btn interactive-hover" 
               onClick={openCart} 
               style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0' }}
             >
               <IoCartOutline size={26} color="#1B5E20" style={{ marginRight: '2px' }} />
               {cartCount > 0 && (
                 <span style={{
                   position: 'absolute', top: '-4px', right: '-4px', background: '#F25D23', color: 'white',
                   fontSize: '12px', fontWeight: '900', width: '22px', height: '22px', borderRadius: '11px', 
                   display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 4px rgba(242,93,35,0.4)', border: '2px solid #F1F8E9'
                 }}>
                   {cartCount}
                 </span>
               )}
             </button>
          </div>

        </div>
      </header>

      <Sidebar visible={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default HeaderTemp;