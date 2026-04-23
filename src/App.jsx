// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Global Components
import AnalyticsTracker from './components/AnalyticsTracker';
import ShoppingBag from './components/layout/ShoppingBag'; 
import WishlistDrawer from './components/layout/WishlistDrawer';

// Main Pages
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Testimonials from './pages/Testimonials/Testimonials';
import Bot from './pages/Bot/Bot'; 
import NutritionalGuide from './pages/Guide/NutritionalGuide';
import ContactUs from './pages/contact/contact';
import AdminOrders from './pages/Admin/AdminOrders';

// Auth Pages
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

// Checkout, Orders & Rewards
import Checkout from './pages/Checkout/Checkout'; 
import Orders from './pages/Orders/Orders';
import Rewards from './pages/Rewards/Rewards'; // <-- IMPORTED NEW REWARDS PAGE

// Legal & Compliance
import Compliance from './pages/Policies/Compliance';
import Privacy from './pages/Policies/Privacy';
import Refund from './pages/Policies/Refund';
import Shipping from './pages/Policies/Shipping';
import Terms from './pages/Policies/Terms';

function App() {
  return (
    <BrowserRouter>
      {/* Background Trackers & Drawers */}
      <AnalyticsTracker />
      <ShoppingBag />
      <WishlistDrawer />

      <Routes>
        {/* Core Navigation */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        
        {/* UPDATED: SEO Friendly Product Route */}
        <Route path="/product/:category/:name/:id" element={<ProductDetail />} />
        
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/bot" element={<Bot />} />
        <Route path="/guide" element={<NutritionalGuide />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* E-commerce Flow */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/rewards" element={<Rewards />} /> {/* <-- ADDED REWARDS ROUTE */}
        
        {/* Policies & Compliance */}
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;