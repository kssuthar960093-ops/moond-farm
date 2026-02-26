import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Pure Cow Ghee",
      image: "/ghee.png",
      description: "100% Pure Desi Cow Ghee. Traditional Bilona method.",
      price: 1300,
      unit: "kg"
    },
    {
      id: 2,
      name: "Buffalo Mix Ghee",
      image: "/ghee.png",
      description: "Premium Quality Buffalo & Cow Mix Ghee. Rich in Nutrients.",
      price: 1200,
      unit: "kg"
    },
    {
      id: 3,
      name: "Organic Gur (Jaggery)",
      image: "/gur.png",
      description: "Chemical-free chunks of pure jaggery, naturally sweet and healthy.",
      price: 120,
      unit: "kg"
    },
    {
      id: 4,
      name: "Sakar (Jaggery Powder)",
      image: "/sakar.png",
      description: "Fine powder of organic jaggery, perfect for tea, milk, and sweets.",
      price: 140,
      unit: "kg"
    },
    {
      id: 5,
      name: "Home Made Biskit",
      image: "/biscuits.png",
      description: "100% pure Aata and Ghee biscuits. Zero Maida, zero preservatives.",
      price: 350,
      unit: "kg"
    }
  ];

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const checkoutViaWhatsApp = () => {
    const phoneNumber = "8619544424";
    const itemsList = cart.map(item => `- ${item.name} (₹${item.price})`).join('%0A');
    const total = calculateTotal();
    const message = `Halo Gaamad! I would like to order:%0A${itemsList}%0A%0ATotal Amount: ₹${total}%0A%0APlease confirm my order.`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className={`landing-page ${isCartOpen ? 'cart-locked' : ''}`}>
      {/* Navbar */}
      <nav className="navbar glass">
        <div className="container nav-content">
          <div className="logo-area">
            <span className="brand-name-stylish">Gaamad</span>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#products" onClick={() => setIsMenuOpen(false)}>Products</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <button className="cart-toggle-btn" onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }}>
              Cart ({cart.length})
            </button>
          </div>

          <div className="mobile-actions">
            <button className="cart-icon-mobile" onClick={() => setIsCartOpen(true)}>
              🛒 <span className="cart-count-badge">{cart.length}</span>
            </button>
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.cartId} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-detail">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.cartId)}>Remove</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="total-row">
            <span>Total:</span>
            <span>₹{calculateTotal()}</span>
          </div>
          <button
            className="whatsapp-btn"
            onClick={checkoutViaWhatsApp}
            disabled={cart.length === 0}
          >
            Order on WhatsApp
          </button>
        </div>
      </div>
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}

      {/* Hero Section */}
      <header id="home" className="hero-section">
        <div className="container hero-content">
          <div className="hero-text animate-fade">
            <h1 className="hero-title">Purity From <br /><span className="accent-text">Moond Farm</span></h1>
            <p className="hero-subtitle">Authentic dairy and organic products from Hanumangarh, Rajasthan. Delivered straight from our farm to your kitchen.</p>
            <div className="hero-actions">
              <a href="#products" className="btn btn-primary">Shop Now</a>
              <a href="#about" className="btn btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-image-container animate-fade" style={{ animationDelay: '0.2s' }}>
            <img src="/ghee.png" alt="Featured Product" className="hero-img" />
            <div className="hero-badge">100% Pure</div>
          </div>
        </div>
      </header>

      {/* Product Section */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Products</h2>
            <div className="section-line"></div>
          </div>
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span className="price">₹{product.price} / {product.unit}</span>
                    <button className="buy-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container about-grid">
          <div className="about-image">
            <span className="about-watermark">Gaamad</span>
          </div>
          <div className="about-text">
            <h2>About Moond Farm</h2>
            <p>Located in the fertile lands of Hanumangarh, Rajasthan, Moond Farm is dedicated to bringing traditional, chemical-free, and pure food products to your home. Under our brand <span className="highlight">Gaamad</span>, we manufacture products that reflect the true essence of village-style purity.</p>
            <div className="about-stats">
              <div className="stat">
                <h4>Organic</h4>
                <p>No chemicals</p>
              </div>
              <div className="stat">
                <h4>Traditional</h4>
                <p>Bilona Method</p>
              </div>
              <div className="stat">
                <h4>Verified</h4>
                <p>Hanumangarh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-card glass">
            <div className="contact-info">
              <h2>Contact Us</h2>
              <p>We'd love to hear from you. Whether you have a question about our products or want to visit the farm, we're here to help.</p>
              <div className="contact-details">
                <p>📍 Moond Farm, Hanumangarh, Rajasthan</p>
                <p>📞 +91 86195 44424</p>
                <p>✉️ info@gaamad.com</p>
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will contact you soon.'); }}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="4" required></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="brand-name-footer">Gaamad</span>
              <p>Moond Farm, Hanumangarh, Rajasthan</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#products">Products</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-contact">
              <h4>Direct Order</h4>
              <p>WhatsApp: 8619544424</p>
              <button className="whatsapp-footer-btn" onClick={() => window.open('https://wa.me/8619544424', '_blank')}>
                Chat on WhatsApp
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Gaamad Products by Moond Farm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
