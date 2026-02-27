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
    const message = `Halo Gaamad Store! I would like to order:%0A${itemsList}%0A%0ATotal Amount: ₹${total}%0A%0APlease confirm my order.`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const messageContent = formData.get('message');
    const phoneNumber = "8619544424";
    const finalMsg = `Halo Gaamad Store! New Inquiry:%0AName: ${name}%0AEmail: ${email}%0AMessage: ${messageContent}`;
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
            <span className="brand-name-stylish">Gaamad Store</span>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#products" onClick={() => setIsMenuOpen(false)}>Products</a>
            <a href="#purity" onClick={() => setIsMenuOpen(false)}>Purity</a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Stories</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
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
              <a href="#purity" className="btn btn-secondary">Why Gaamad Store?</a>
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
      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Customer Stories</h2>
            <p className="section-subtitle">Real experiences from our Gaamad family</p>
            <div className="section-line"></div>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card animate-fade-in">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"The Bilona Ghee from Moond Farm is exactly like what my grandmother used to make. The aroma is heavenly!"</p>
              <div className="customer-info">
                <h4>Sunita Sharma</h4>
                <span>Verified Buyer</span>
              </div>
            </div>
            <div className="testimonial-card animate-fade-in">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"I've been looking for chemical-free Jaggery for a long time. Gaamad's Sakar is now a staple in my morning tea."</p>
              <div className="customer-info">
                <h4>Rajesh Kumar</h4>
                <span>Health Enthusiast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Common Questions</h2>
            <div className="section-line"></div>
          </div>
          <div className="faq-grid">
            <details className="faq-item">
              <summary>What is the Bilona method?</summary>
              <p>The traditional Bilona method involves churning curd to extract butter, which is then slow-cooked on a wood fire. This preserves the medicinal properties and aroma of the ghee.</p>
            </details>
            <details className="faq-item">
              <summary>Are your products organic?</summary>
              <p>Yes, we maintain a strictly natural process at Moond Farm. No chemicals, fertilizers, or preservatives are used in our production.</p>
            </details>
            <details className="faq-item">
              <summary>Do you ship outside Rajasthan?</summary>
              <p>Yes! We ship our pure products across India. Delivery times vary between 3-7 business days depending on your location.</p>
            </details>
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
              <span className="floating-text">Gaamad Store</span>
            </div>
          </div>
          <div className="about-text">
            <h2>Our Heritage</h2>
            <p>Moond Farm is a private proprietorship firm rooted in the soils of Hanumangarh, Rajasthan. We serve the community with <span className="highlight">Gaamad Store</span>, our premium brand synonymous with 100% purity and traditional quality.</p>
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
      <footer className="footer-premium">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-col brand-col">
              <span className="brand-name-footer">Gaamad Store</span>
              <p className="brand-tagline">Gaamad Store is a premium brand of Moond Farm (A Private Proprietorship Company). Handcrafted with soul in Hanumangarh, Rajasthan.</p>
              <div className="footer-socials">
                <a href="#" className="social-icon" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="social-icon" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="social-icon" title="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-ul">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Our Products</a></li>
                <li><a href="#purity">Purity Promise</a></li>
                <li><a href="#testimonials">Customer Stories</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#blog">Farm Journals</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>

            {/* Support/Policies */}
            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-ul">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer-col contact-col">
              <h4>Location & Contact</h4>
              <p>📍 Moond Farm, Hanumangarh <br />Rajasthan, India</p>
              <div className="footer-contact-item">
                <span className="icon">📞</span>
                <a href="tel:8619544424">+91 86195 44424</a>
              </div>
              <div className="footer-contact-item">
                <span className="icon">✉️</span>
                <a href="mailto:info@gaamad.com">info@gaamad.com</a>
              </div>
              <button
                className="footer-wa-btn"
                onClick={() => window.open('https://wa.me/8619544424', '_blank')}
              >
                Inquire on WhatsApp 💬
              </button>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-copyright">
            <div className="copyright-text">
              <p>&copy; 2026 Gaamad Store. All traditional rights reserved.</p>
            </div>
            <div className="js-tech-attribution">
              <p>Crafted with Excellence by <a href="https://www.jstechsolution.in" target="_blank" rel="noopener noreferrer">JS Tech Solution</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
