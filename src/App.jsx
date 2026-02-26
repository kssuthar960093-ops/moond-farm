import React from 'react';
import './App.css';

const App = () => {
  const products = [
    {
      id: 1,
      name: "Premium Desi Ghee",
      image: "/ghee.png",
      description: "Traditional golden ghee made from pure milk. Rich aroma and taste.",
      price: "₹850 / kg"
    },
    {
      id: 2,
      name: "Organic Gur (Jaggery)",
      image: "/gur.png",
      description: "Chemical-free chunks of pure jaggery, naturally sweet and healthy.",
      price: "₹120 / kg"
    },
    {
      id: 3,
      name: "Sakar (Jaggery Powder)",
      image: "/sakar.png",
      description: "Fine powder of organic jaggery, perfect for tea, milk, and sweets.",
      price: "₹140 / kg"
    },
    {
      id: 4,
      name: "Homemade Biscuits",
      image: "/biscuits.png",
      description: "100% pure Aata and Ghee biscuits. Zero Maida, zero preservatives.",
      price: "₹350 / 500g"
    }
  ];

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar glass">
        <div className="container nav-content">
          <div className="logo-area">
            <img src="/logo.png" alt="Gaamad Logo" className="logo-img" />
            <span className="brand-name">Gaamad</span>
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#about">About Us</a>
            <button className="cta-btn">Order Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero-section">
        <div className="container hero-content">
          <div className="hero-text animate-fade">
            <h1 className="hero-title">Purity From <br /><span>Moond Farm</span></h1>
            <p className="hero-subtitle">Authentic dairy and organic products from Hanumangarh, Rajasthan. Delivered straight from our farm to your kitchen.</p>
            <div className="hero-actions">
              <a href="#products" className="btn btn-primary">Our Products</a>
              <a href="#about" className="btn btn-secondary">Our Story</a>
            </div>
          </div>
          <div className="hero-image-container animate-fade" style={{animationDelay: '0.2s'}}>
            <img src="/ghee.png" alt="Featured Product" className="hero-img" />
            <div className="hero-badge">100% Pure</div>
          </div>
        </div>
      </header>

      {/* Product Section */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Best Sellers</h2>
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
                    <span className="price">{product.price}</span>
                    <button className="buy-btn">Add to Cart</button>
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
             <img src="/logo.png" alt="Moond Farm" className="about-img-bg" />
          </div>
          <div className="about-text">
            <h2>About Moond Farm</h2>
            <p>Located in the fertile lands of Hanumangarh, Rajasthan, Moond Farm is dedicated to bringing traditional, chemical-free, and pure food products to your home. Under our brand <strong>'Gaamad'</strong>, we manufacture products that reflect the true essence of village-style purity.</p>
            <div className="about-stats">
              <div className="stat">
                <h4>Organic</h4>
                <p>No chemicals used</p>
              </div>
              <div className="stat">
                <h4>Traditional</h4>
                <p>Ancient methods</p>
              </div>
              <div className="stat">
                <h4>Pure</h4>
                <p>Farm to Table</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo-area">
                <img src="/logo.png" alt="Gaamad Logo" className="logo-img" />
                <span className="brand-name">Gaamad</span>
              </div>
              <p>Moond Farm, Hanumangarh, Rajasthan</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#products">Products</a>
              <a href="#about">About</a>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>Email: contact@gaamad.com</p>
              <p>Phone: +91 98765 43210</p>
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
