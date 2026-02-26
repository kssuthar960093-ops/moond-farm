import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      id: 1,
      name: "Pure Cow Ghee",
      image: "/ghee.png",
      description: "100% Pure Desi Cow Ghee. Traditional Bilona method with wood fire.",
      price: 1300,
      unit: "kg",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Buffalo Mix Ghee",
      image: "/ghee.png",
      description: "Premium Quality Buffalo & Cow Mix Ghee. Rich in natural nutrients.",
      price: 1200,
      unit: "kg",
      tag: "Popular"
    },
    {
      id: 3,
      name: "Organic Gur (Jaggery)",
      image: "/gur.png",
      description: "Chemical-free chunks of pure jaggery, naturally solar-dried.",
      price: 120,
      unit: "kg",
      tag: "Healthy"
    },
    {
      id: 4,
      name: "Sakar (Jaggery Powder)",
      image: "/sakar.png",
      description: "Fine powder of organic jaggery, perfect for immunity-boosting tea.",
      price: 140,
      unit: "kg",
      tag: "Fine Quality"
    },
    {
      id: 5,
      name: "Home Made Biskit",
      image: "/biscuits.png",
      description: "100% pure Aata and Ghee biscuits. Zero Maida, zero additives.",
      price: 350,
      unit: "kg",
      tag: "Freshly Baked"
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Why A2 Cow Ghee is Liquid Gold",
      excerpt: "Discover the amazing health benefits of traditional Bilona method ghee...",
      date: "Feb 24, 2026",
      image: "/ghee.png"
    },
    {
      id: 2,
      title: "Traditional Jaggery vs White Sugar",
      excerpt: "Why shifting to Sakar and Gur can transform your daily energy levels...",
      date: "Feb 20, 2026",
      image: "/gur.png"
    },
    {
      id: 3,
      title: "Life at Moond Farm",
      excerpt: "A glimpse into our sustainable farming practices in Hanumangarh...",
      date: "Feb 15, 2026",
      image: "/biscuits.png"
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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const messageContent = formData.get('message');
    const phoneNumber = "8619544424";
    const finalMsg = `Halo Gaamad! New Inquiry:%0AName: ${name}%0AEmail: ${email}%0AMessage: ${messageContent}`;
    window.open(`https://wa.me/${phoneNumber}?text=${finalMsg}`, '_blank');
  };

  return (
    <div className={`landing-page ${isCartOpen ? 'cart-locked' : ''}`}>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* Floating Actions */}
      <div className="floating-actions">
        <a href="tel:8619544424" className="float-btn call-btn" title="Call Now">
          📞
        </a>
        <a href="https://wa.me/8619544424" className="float-btn wa-btn" title="Chat on WhatsApp">
          💬
        </a>
      </div>

      {/* Navbar */}
      <nav className="navbar glass">
        <div className="container nav-content">
          <div className="logo-area" onClick={() => window.scrollTo(0, 0)}>
            <span className="brand-name-stylish">Gaamad</span>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#products" onClick={() => setIsMenuOpen(false)}>Products</a>
            <a href="#purity" onClick={() => setIsMenuOpen(false)}>Purity</a>
            <a href="#blog" onClick={() => setIsMenuOpen(false)}>Blog</a>
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
            <div className="empty-msg">
              <p>Your cart is empty.</p>
              <button className="btn btn-secondary" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
            </div>
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
            Checkout on WhatsApp
          </button>
        </div>
      </div>
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}

      {/* Hero Section */}
      <header id="home" className="hero-section">
        <div className="container hero-content">
          <div className="hero-text animate-fade-in">
            <span className="hero-tag">Directly from Moond Farm</span>
            <h1 className="hero-title">Experience the <br /><span className="accent-text">Soul of Purity</span></h1>
            <p className="hero-subtitle">Traditional Desi Ghee and Organic Jaggery products, handcrafted at Moond Farm, Hanumangarh. No chemicals, just nature's goodness.</p>
            <div className="hero-actions">
              <a href="#products" className="btn btn-primary">Our Catalog</a>
              <a href="#purity" className="btn btn-secondary">Why Gaamad?</a>
            </div>
          </div>
          <div className="hero-image-container animate-slide-up">
            <div className="hero-blob"></div>
            <img src="/ghee.png" alt="Featured Product" className="hero-img" />
            <div className="hero-badge">Verified 100% Pure</div>
          </div>
        </div>
      </header>

      {/* Purity Section */}
      <section id="purity" className="purity-section overflow-hidden">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The Purity Promise</h2>
            <p className="section-subtitle">How we maintain the highest quality standards at Moond Farm</p>
            <div className="section-line"></div>
          </div>
          <div className="purity-grid">
            <div className="purity-card">
              <div className="icon-wrap">🥛</div>
              <h3>Raw & Unprocessed</h3>
              <p>We believe in minimal intervention. Our milk and produce are kept in their most natural form to retain enzymes and nutrients.</p>
            </div>
            <div className="purity-card highlighted">
              <div className="icon-wrap">🔥</div>
              <h3>Ancient Bilona Method</h3>
              <p>Our Ghee is made using the traditional Bilona method — curd is churned and wood-fire is used for heating. It's slower, but much healthier.</p>
            </div>
            <div className="purity-card">
              <div className="icon-wrap">🚫</div>
              <h3>Zero Chemicals</h3>
              <p>From jaggery to biscuits, we refuse to use Maida, refined sugars, or artificial preservatives. Your health is our priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Premium Catalog</h2>
            <div className="section-line"></div>
          </div>
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.tag && <span className="product-card-tag">{product.tag}</span>}
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

      {/* Blog Section */}
      <section id="blog" className="blog-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Farm Journals</h2>
            <p className="section-subtitle">Insights into organic living and farm life</p>
            <div className="section-line"></div>
          </div>
          <div className="blog-grid">
            {blogPosts.map(post => (
              <div key={post.id} className="blog-card">
                <div className="blog-img-box">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content">
                  <span className="blog-date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <button className="read-more">Read Full Story &rarr;</button>
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
            <div className="about-visual">
              <span className="floating-text">Quality</span>
              <span className="floating-text">Trust</span>
              <span className="floating-text">Gaamad</span>
            </div>
          </div>
          <div className="about-text">
            <h2>Our Heritage</h2>
            <p>Moond Farm isn't just a business; it's a legacy rooted in the soils of Hanumangarh, Rajasthan. We serve the community with <span className="highlight">Gaamad</span>, a brand synonymous with 100% purity and high-quality traditional products.</p>
            <div className="purity-badges">
              <div className="badge-item">✅ Handcrafted</div>
              <div className="badge-item">✅ Tested Quality</div>
              <div className="badge-item">✅ Farm Fresh</div>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h4>Traditional</h4>
                <p>Hanumangarh Pride</p>
              </div>
              <div className="stat">
                <h4>Safe</h4>
                <p>Lab Verified</p>
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
              <h2>Get in Touch</h2>
              <p>Have specific requirements or bulk orders? Connect with us directly on WhatsApp or give us a call.</p>
              <div className="contact-details">
                <p>📍 Moond Farm, Hanumangarh, Rajasthan</p>
                <div className="contact-row">
                  <span>📞</span>
                  <a href="tel:8619544424">+91 86195 44424</a>
                </div>
                <div className="contact-row">
                  <span>✉️</span>
                  <a href="mailto:info@gaamad.com">info@gaamad.com</a>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message / Inquiry Details" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary whatsapp-submit">
                Inquire on WhatsApp 📩
              </button>
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
              <p>Authentic purity from Moond Farm, Hanumangarh. Supporting traditional farming and healthy living since 2026.</p>
            </div>
            <div className="footer-links">
              <h4>Explore</h4>
              <a href="#home">Home</a>
              <a href="#products">Products</a>
              <a href="#purity">Purity Process</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-contact">
              <h4>Contact Center</h4>
              <p>Hotline: 8619544424</p>
              <div className="social-links">
                <button className="wa-footer-btn" onClick={() => window.open('https://wa.me/8619544424', '_blank')}>
                  WhatsApp Order
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Gaamad Products. All rights reserved.</p>
            <p className="js-tech">Design by <a href="https://www.jstechsolution.in" target="_blank" rel="noopener noreferrer">JS Tech Solution</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
