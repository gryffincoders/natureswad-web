// src/pages/Bot/Bot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLeaf, IoArrowForward } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import { PRODUCTS } from '../../constants/ProductsData';
import './Bot.css';

const BOT_KNOWLEDGE = {
  'Diabetes Management': {
    text: "For managing diabetes, the best foods are low GI, high fiber, and high protein. High fiber slows glucose absorption, keeping your blood sugar stable!",
    mealIdeas: "• Ragi dosa\n• Foxtail millet upma\n• Multi millet roti\n• Moong dal soup",
    products: ['m4', 'm3', 'm5', 'm6', 'm2', 'a2', 'f2', 'p2', 'p7', 's3', 'h1'] 
  },
  'Nursing Mothers': {
    text: "Congratulations! Nursing mothers need high calcium, iron, protein, and energy to support bone health. Here are nature's best supplements.",
    mealIdeas: "• Ragi porridge\n• Sesame laddu\n• Moong dal khichdi\n• Emmer wheat roti",
    products: ['m5', 'p1', 'p6', 'p7', 'a2', 'g2', 's2', 'h2'] 
  },
  'Kids Growth': {
    text: "Growing kids require high protein, calcium, and essential minerals to support bone development, muscle growth, and immunity.",
    mealIdeas: "• Ragi malt\n• Multi millet dosa\n• Peanut chutney\n• Moong dal khichdi",
    products: ['m5', 'm8', 'p1', 'p7', 'p6', 'p5', 'h5', 'b1', 'h2'] 
  },
  'Weight Loss': {
    text: "For healthy weight loss, you need low-calorie, high-fiber, and high-satiety foods. High fiber keeps your stomach full longer, reducing cravings!",
    mealIdeas: "• Millet salad bowl\n• Horse gram soup\n• Flaxseed chutney with jowar roti",
    products: ['m3', 'm4', 'm6', 'm2', 'p3', 'p2', 's1', 's3']
  },
  'Weight Gain': {
    text: "To gain weight healthily, focus on calorie-dense foods rich in healthy fats and proteins. No junk needed!",
    mealIdeas: "• Peanut laddu\n• Sesame chikki\n• Urad dal dosa\n• Bajra roti with ghee",
    products: ['p1', 'p6', 'm8', 's2', 'ch_group', 'po5', 'h2']
  },
  'Thyroid Support': {
    text: "For thyroid support, your body needs selenium, zinc, and anti-inflammatory foods to help maintain hormonal balance and metabolism. ",
    mealIdeas: "• Millet khichdi\n• Chickpea salad\n• Flaxseed chutney",
    products: ['m4', 'm7', 'p1', 'p5', 's1', 's4', 'h1']
  },
  'Blood Pressure Control': {
    text: "To control blood pressure, load up on high potassium, high fiber, and low sodium foods. These maintain heart health and fluid balance. ",
    mealIdeas: "• Jowar roti\n• Moong dal soup\n• Millet vegetable bowl",
    products: ['m7', 'g1', 'm5', 'p2', 'p7', 's1', 'h1']
  },
  'Heart Health': {
    text: "Protect your heart with ingredients rich in omega-3 fatty acids, complex carbohydrates, and dietary fiber to control cholesterol. ",
    mealIdeas: "• Light millet upma\n• Green gram sprouts\n• Meals cooked in cold-pressed oils",
    products: ['s1', 'm4', 'm6', 'm7', 'p2', 'p5', 'po5']
  }
};

const cleanText = (text) => text ? text.replace(/\//g, '') : '';

export default function Bot() {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const isInitialMount = useRef(true); // Tracks if the page just loaded
  
  // ✅ FIX: Initialize state from sessionStorage if it exists
  const [messages, setMessages] = useState(() => {
    const savedSession = sessionStorage.getItem('sageBotSession');
    if (savedSession) {
      return JSON.parse(savedSession);
    }
    return [
      { 
        id: '1', 
        sender: 'bot', 
        isGreeting: true,
        text: "Hey, I'm Sage. 🌱\n\nNo junk, no excuses. Tell me your health goals and I'll prescribe the exact roots and shoots you need to get back on track." 
      }
    ];
  });

  // ✅ FIX: Save to sessionStorage every time messages update
  useEffect(() => {
    sessionStorage.setItem('sageBotSession', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ FIX: Prevent scrolling on page load if user already has a saved chat history
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return; // Skip auto-scroll on the very first render
    }
    
    if (messages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  const handleTopicSelect = (topic) => {
    const userMsg = { id: Date.now().toString(), sender: 'user', text: `I need recommendations for ${topic}` };
    const knowledge = BOT_KNOWLEDGE[topic];
    const botMsg = { 
      id: (Date.now() + 1).toString(), sender: 'bot', text: knowledge.text,
      mealIdeas: knowledge.mealIdeas, products: knowledge.products
    };

    setMessages(prev => [...prev, userMsg]);
    setTimeout(() => setMessages(prev => [...prev, botMsg]), 600);
  };

  const renderProductCard = (productId) => {
    const product = PRODUCTS[productId];
    if (!product) return null;

    const displayImage = product.image || (product.images && product.images[0]);
    const displayPrice = product.variants?.[0]?.price || 'N/A';

    return (
      <div key={product.id} className="bot-product-card interactive-hover">
        <div className="bot-product-img-wrapper">
          {displayImage ? <img src={displayImage} alt={product.name} className="bot-product-img" /> : <IoLeaf size={24} color="#CCC" />}
        </div>
        <h5 className="bot-product-name line-clamp-2">{cleanText(product.name)}</h5>
        <span className="bot-product-price">{displayPrice}</span>
        <button className="bot-product-btn" onClick={() => navigate(`/product/${product.id}`)}>
          View <IoArrowForward size={14} />
        </button>
      </div>
    );
  };

  return (
    <div className="bot-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      <HeaderTemp /> 

      <main className="bot-layout-wrapper">
        <div className="bot-chat-interface shadow-premium">
          
          <div className="bot-scroll-area">
            <div className="bot-profile-header fade-in-up">
              <div className="bot-avatar-large"><IoLeaf size={32} color="#1B5E20" /></div>
              <h2>SAGE</h2>
              <p>Strictly natural. Strictly results.</p>
            </div>

            <div className="messages-container">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-row fade-in-up ${msg.sender === 'user' ? 'row-user' : 'row-bot'}`}>
                  {msg.sender === 'bot' && (
                    <div className="bot-avatar-small"><img src="/assets/icon.png" alt="Sage" className="bot-tiny-logo" /></div>
                  )}

                  <div className={`message-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-bot'}`}>
                    <p className="message-text">{msg.text}</p>
                    {msg.mealIdeas && (
                      <div className="meal-ideas-box">
                        <strong>Meal Ideas:</strong>
                        <p>{msg.mealIdeas}</p>
                      </div>
                    )}
                  </div>

                  {msg.products && msg.products.length > 0 && (
                    <div className="bot-recommendations">
                      <p className="recs-title">Highly Recommended For You:</p>
                      <div className="bot-products-scroll">
                        {msg.products.map(renderProductCard)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="bot-input-area">
            <span className="quick-reply-label">Tap a goal to get advice:</span>
            <div className="quick-replies-scroll">
              {Object.keys(BOT_KNOWLEDGE).map((topic) => (
                <button key={topic} className="quick-reply-chip interactive-hover" onClick={() => handleTopicSelect(topic)}>
                  {topic}
                </button>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}