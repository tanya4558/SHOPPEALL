import { useEffect, useState } from 'react'
import './App.css'

const products = [
  ['Fresh Home Edit', 'Kitchen care', 299, 'product-01.jpg', 'Best seller'],
  ['Soft Touch Towels', 'Home comfort', 449, 'product-02.jpg', 'New in'],
  ['Daily Clean Kit', 'Cleaning essentials', 599, 'product-03.jpg', 'Save 12%'],
  ['Simple Storage', 'Organise well', 749, 'product-04.jpg', 'Popular'],
  ['Bright Living', 'Home accents', 399, 'product-05.jpg', 'New in'],
  ['Care & Comfort', 'Everyday utility', 349, 'product-06.jpg', 'Best seller'],
  ['Kitchen Reset', 'Kitchen care', 529, 'product-07.jpg', 'Limited'],
  ['Little Helpers', 'Everyday utility', 249, 'product-08.jpg', 'Popular'],
]

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shoppeall-cart')) || [] } catch { return [] }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState('')
  const [activeCategory, setActiveCategory] = useState('All products')
  const categories = ['All products', 'Kitchen care', 'Home comfort', 'Organise well']
  const visibleProducts = products.filter((product) => (activeCategory === 'All products' || product[1] === activeCategory) && product.join(' ').toLowerCase().includes(searchQuery.toLowerCase()))
  const bagCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + item[2] * item.quantity, 0)
  useEffect(() => { localStorage.setItem('shoppeall-cart', JSON.stringify(cartItems)) }, [cartItems])
  useEffect(() => { if (!notification) return undefined; const timer = setTimeout(() => setNotification(''), 2400); return () => clearTimeout(timer) }, [notification])
  const addToCart = (product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item[0] === product[0])
      if (existingItem) return items.map((item) => item[0] === product[0] ? { ...item, quantity: item.quantity + 1 } : item)
      return [...items, { ...product, quantity: 1 }]
    })
  }
  const removeFromCart = (productName) => setCartItems((items) => items.filter((item) => item[0] !== productName))
  const addProduct = (product) => { addToCart(product); setNotification(`${product[0]} added to your bag`) }
  const buyNow = (product) => { window.open(`https://wa.me/919081822205?text=${encodeURIComponent(`Hello SHOPPEALL, I would like to buy ${product[0]} for Rs. ${product[2]}.`)}`, '_blank', 'noopener,noreferrer') }
  const checkout = () => { const order = cartItems.map((item) => `${item[0]} x${item.quantity}`).join(', '); window.open(`https://wa.me/919081822205?text=${encodeURIComponent(`Hello SHOPPEALL, I would like to place an order for: ${order}. Subtotal: Rs. ${subtotal}.`)}`, '_blank', 'noopener,noreferrer') }

  return <main>
    <div className="announcement">Free delivery on orders over Rs. 999 <span>•</span> Thoughtful things for everyday living</div>
    <nav className="nav container" aria-label="Main navigation"><button className="menu-button" type="button" aria-label="Open menu">☰</button><a className="wordmark" href="#top">SHOPPE<span>ALL</span></a><div className="nav-links"><a href="#shop">Shop</a><a href="#about">Our story</a><a href="#contact">Contact</a></div><div className="nav-actions"><button type="button" aria-label="Search" onClick={() => setIsSearchOpen(true)}>⌕</button><button className="bag-button" type="button" onClick={() => setIsCartOpen(true)} aria-expanded={isCartOpen}>Bag <b>{bagCount}</b></button></div></nav>
    {isSearchOpen && <div className="search-panel"><div className="search-inner"><p className="eyebrow">SEARCH SHOPPEALL</p><div className="search-line"><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Try kitchen, comfort, storage..." /><button type="button" aria-label="Close search" onClick={() => { setIsSearchOpen(false); setSearchQuery('') }}>×</button></div><p className="search-result-count">{searchQuery ? `${visibleProducts.length} result${visibleProducts.length === 1 ? '' : 's'} found` : 'Browse our everyday edit below'}</p><button className="search-shop-link" type="button" onClick={() => { setIsSearchOpen(false); document.querySelector('#shop')?.scrollIntoView() }}>View the edit <span>→</span></button></div></div>}
    <section className="hero container" id="top"><div className="hero-copy"><p className="eyebrow">THE SHOPPEALL EDIT · 2026</p><h1>Make room for<br /><em>better</em> everyday.</h1><p className="hero-text">Useful, beautiful finds for the spaces you call home. Curated with care, delivered with a little joy.</p><a className="button dark-button" href="#shop">Explore the edit <span>↗</span></a></div><div className="hero-photo"><img src="/product-images/product-01.jpg" alt="Colourful cleaning sponges beside a kitchen sink" /><span className="photo-note">01 / <i>kitchen care</i></span></div><div className="hero-stamp">GOOD<br /><small>things</small><br />LIVE<br /><small>here</small></div></section>
    <section className="values container" aria-label="Shoppeall values"><div><strong>01</strong><span>Useful by design</span></div><div><strong>02</strong><span>Made for real life</span></div><div><strong>03</strong><span>Small joys, daily</span></div></section>
    <section className="shop-section container" id="shop"><div className="section-heading"><div><p className="eyebrow">CURATED FOR YOUR HOME</p><h2>Good things, <em>well chosen.</em></h2></div><p className="section-intro">The pieces that make ordinary routines feel a little more considered.</p></div><div className="filter-row">{categories.map((category) => <button className={activeCategory === category ? 'active' : ''} type="button" key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product[0]}><div className="product-image"><img src={`/product-images/${product[3]}`} alt={product[0]} /><span>{product[4]}</span><button type="button" aria-label={`Add ${product[0]} to bag`} onClick={() => addProduct(product)}>+</button></div><div className="product-meta"><div><p>{product[1]}</p><h3>{product[0]}</h3><button className="buy-link" type="button" onClick={() => buyNow(product)}>Buy on WhatsApp</button></div><strong>Rs. {product[2]}</strong></div></article>)}</div></section>
    <section className="story" id="about"><div className="story-image"><img src="/product-images/product-09.jpg" alt="Shoppeall home essential" /></div><div className="story-copy"><p className="eyebrow">A LITTLE ABOUT US</p><h2>For the life<br />you actually <em>live.</em></h2><p>Shoppeall is a growing collection of everyday essentials that work hard and look good doing it. From kitchen helpers to home comforts, we look for the little upgrades that make a difference.</p><a className="text-link" href="#contact">Meet Shoppeall <span>→</span></a></div></section>
    <footer id="contact"><div className="footer-top container"><div><a className="wordmark footer-mark" href="#top">SHOPPE<span>ALL</span></a><p className="footer-tag">Everyday things,<br />thoughtfully found.</p></div><div className="contact-block"><p className="eyebrow">COME SAY HELLO</p><a href="mailto:shoppeall22@gmail.com">shoppeall22@gmail.com</a><a href="tel:9081822205">+91 90818 22205</a></div><div className="contact-block address"><p className="eyebrow">FIND US</p><p>B-102, 1st Floor, Om Heritage,<br />Nani Ved Road, Dabholi,<br />Surat, Gujarat - 395004</p></div></div><div className="footer-bottom container"><span>© 2026 SHOPPEALL</span><span>Trademark & legal documents <span className="trademark">™</span></span><span>Made for everyday living</span></div></footer>
    {isCartOpen && <><button className="cart-backdrop" aria-label="Close bag" type="button" onClick={() => setIsCartOpen(false)} /><aside className="cart-drawer" aria-label="Shopping bag"><div className="cart-header"><div><p className="eyebrow">YOUR SHOPPING BAG</p><h2>Your picks <em>({bagCount})</em></h2></div><button className="cart-close" type="button" onClick={() => setIsCartOpen(false)} aria-label="Close bag">×</button></div>{cartItems.length === 0 ? <div className="empty-cart"><p>Your bag is waiting for something good.</p><button className="button dark-button" type="button" onClick={() => { setIsCartOpen(false); document.querySelector('#shop')?.scrollIntoView() }}>Shop the edit <span>↗</span></button></div> : <><div className="cart-items">{cartItems.map((item) => <div className="cart-item" key={item[0]}><img src={`/product-images/${item[3]}`} alt="" /><div><p>{item[1]}</p><h3>{item[0]}</h3><span>Qty {item.quantity}</span></div><strong>Rs. {item[2] * item.quantity}</strong><button type="button" onClick={() => removeFromCart(item[0])} aria-label={`Remove ${item[0]}`}>×</button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>Rs. {subtotal}</strong></div><p>Shipping calculated at checkout.</p><button className="button dark-button checkout-button" type="button" onClick={checkout}>Order on WhatsApp <span>→</span></button></div></>}</aside></>}
    {notification && <div className="cart-toast" role="status"><span>✓</span>{notification}<button type="button" onClick={() => { setNotification(''); setIsCartOpen(true) }}>View bag</button></div>}
  </main>
}

export default App
