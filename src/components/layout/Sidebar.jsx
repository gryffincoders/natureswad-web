// src/components/layout/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { 
  IoClose, IoPerson, IoChevronForward, IoHomeOutline, IoHome, 
  IoBagHandleOutline, IoBagHandle, IoBagOutline, IoBag, 
  IoLeafOutline, IoLeaf, IoBookOutline, IoBook, 
  IoCartOutline, IoCart, IoChatbubbleOutline, IoChatbubble, 
  IoDocumentTextOutline, IoDocumentText, IoShieldCheckmarkOutline, IoShieldCheckmark, 
  IoRefreshCircleOutline, IoRefreshCircle, IoBusOutline, IoBus, 
  IoLogOutOutline, IoTrashOutline 
} from 'react-icons/io5';
import './Sidebar.css';

const Sidebar = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);

  // Sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleNavigation = (route) => {
    onClose();
    setTimeout(() => { if (route) navigate(route); }, 300);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This cannot be undone.")) {
      try {
        if (auth.currentUser) {
          await deleteUser(auth.currentUser);
          onClose();
          navigate('/login');
        }
      } catch (error) {
        console.error("Delete failed:", error);
        if (error.code === 'auth/requires-recent-login') {
          alert("Security check: Please log out and log back in before deleting your account.");
        }
      }
    }
  };

  const isActive = (route) => pathname === route;

  const menuItems = [
    { id: 1, title: 'Home', route: '/', icon: <IoHomeOutline />, activeIcon: <IoHome /> },
    { id: 2, title: 'Store', route: '/shop', icon: <IoBagHandleOutline />, activeIcon: <IoBagHandle /> },
    { id: 3, title: 'My Orders', route: '/orders', icon: <IoBagOutline />, activeIcon: <IoBag /> },
    { id: 4, title: 'Nutritional Guide', route: '/guide', icon: <IoLeafOutline />, activeIcon: <IoLeaf /> },
    { id: 5, title: 'Our Story', route: '/testimonials', icon: <IoBookOutline />, activeIcon: <IoBook /> },
    { id: 6, title: 'Get In Touch', route: '/contact', icon: <IoChatbubbleOutline />, activeIcon: <IoChatbubble /> },
    { id: 7, title: 'Terms & Conditions', route: '/terms', icon: <IoDocumentTextOutline />, activeIcon: <IoDocumentText /> },
    { id: 8, title: 'Privacy Policy', route: '/privacy', icon: <IoShieldCheckmarkOutline />, activeIcon: <IoShieldCheckmark /> },
    { id: 9, title: 'Refund Policy', route: '/refund', icon: <IoRefreshCircleOutline />, activeIcon: <IoRefreshCircle /> },
    { id: 10, title: 'Shipping Policy', route: '/shipping', icon: <IoBusOutline />, activeIcon: <IoBus /> },
    { id: 11, title: 'Compliance', route: '/compliance', icon: <IoShieldCheckmarkOutline />, activeIcon: <IoShieldCheckmark /> },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${visible ? 'overlay-active' : ''}`} onClick={onClose} />

      <div className={`sidebar-panel ${visible ? 'sidebar-active' : ''}`}>
        <div className="sidebar-header">
          <img src="/assets/icon.png" alt="Logo" className="sidebar-logo" />
          <button className="sidebar-close-btn" onClick={onClose}>
            <IoClose size={24} color="#1B5E20" />
          </button>
        </div>

        <div className="sidebar-scroll-content">
          {/* USER PROFILE CARD */}
          <div 
            className="sidebar-user-card interactive-hover" 
            onClick={() => !user && handleNavigation('/login')}
          >
            <div className="avatar-container">
              <IoPerson size={24} color="#1B5E20" />
            </div>
            <div className="user-info">
              {user ? (
                <>
                  <h4 className="welcome-text">Hello, {user.displayName || 'Friend'}! 🌿</h4>
                  <p className="sub-welcome-text">{user.email}</p>
                </>
              ) : (
                <>
                  <h4 className="welcome-text">Login / Sign Up</h4>
                  <p className="sub-welcome-text">Join the Natureswad community</p>
                </>
              )}
            </div>
            {!user && <IoChevronForward size={20} color="#1B5E20" />}
          </div>

          <div className="menu-container">
            {menuItems.map((item) => {
              const active = isActive(item.route);
              return (
                <button 
                  key={item.id} 
                  className={`menu-item ${active ? 'menu-item-active' : ''}`} 
                  onClick={() => handleNavigation(item.route)}
                >
                  <div className={`icon-box ${active ? 'icon-box-active' : ''}`}>
                    {React.cloneElement(active ? item.activeIcon : item.icon, { 
                      size: 20, 
                      color: active ? "#1B5E20" : "#555" 
                    })}
                  </div>
                  <span className={`menu-text ${active ? 'menu-text-active' : ''}`}>{item.title}</span>
                  {active && <div className="active-indicator" />}
                </button>
              );
            })}

            {/* AUTH ACTIONS */}
            {user && (
              <div className="auth-actions-group">
                <div className="menu-divider" />
                <button className="menu-item logout-item interactive-hover" onClick={handleLogout}>
                  <div className="icon-box logout-icon-box"><IoLogOutOutline size={20} color="#E53935" /></div>
                  <span className="menu-text logout-text">Logout</span>
                </button>

                <button className="menu-item delete-item interactive-hover" onClick={handleDeleteAccount}>
                  <div className="icon-box delete-icon-box"><IoTrashOutline size={20} color="#B71C1C" /></div>
                  <span className="menu-text delete-text">Delete Account</span>
                </button>
              </div>
            )}
          </div>

          <div className="sidebar-footer">
            <p className="copyright-text">V 1.0.0 • Natureswad © 2026</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;