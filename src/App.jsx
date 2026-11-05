import { useState } from 'react';
import { Search, ShoppingBag, Menu, ChevronDown, ArrowRight, Truck, ShieldCheck, Leaf, Headphones, Star, Plus, Minus, X, Heart, Check } from 'lucide-react';

const products = [
  { id:1, name:'eCuisine Classic Tombrown', size:'500g pouch', price:1800, old:2200, tag:'BESTSELLER', image:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=85', rating:'4.9', reviews:128 },
  { id:2, name:'Family Size Tombrown', size:'1kg family pack', price:3200, old:3800, tag:'FAMILY FAVORITE', image:'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85', rating:'4.8', reviews:86 },
  { id:3, name:'Everyday Tombrown', size:'250g pouch', price:950, old:1200, tag:'GREAT VALUE', image:'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=700&q=85', rating:'4.7', reviews:54 },
  { id:4, name:'Tombrown Value Bundle', size:'3 × 500g pouches', price:5000, old:6000, tag:'SAVE MORE', image:'https://images.unsplash.com/photo-1490474418585-ba9?auto=format&fit=crop&w=700&q=85', rating:'5.0', reviews:42 }
];
const money = n => '₦' + n.toLocaleString('en-NG');
function App(){
 const [cart,setCart]=useState([]);
 const [search,setSearch]=useState('');
 const [mobileMenu,setMobileMenu]=useState(false);
 const [notice,setNotice]=useState('');
 const [cartOpen,setCartOpen]=useState(false);
 const count=cart.reduce((a,b)=>a+b.qty,0);
 const add=(p)=>{setCart(prev=>{const found=prev.find(x=>x.id===p.id);return found?prev.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...prev,{...p,qty:1}];});setNotice(p.name+' added to your bag');setTimeout(()=>setNotice(''),2400);};
 const change=(id,d)=>setCart(prev=>prev.map(x=>x.id===id?{...x,qty:x.qty+d}:x).filter(x=>x.qty>0));
 const total=cart.reduce((a,b)=>a+b.price*b.qty,0);
 const shown=products.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));
 return <div>
  <div className="announcement"><Leaf size={14}/> A little goodness goes a long way. <b>Enjoy 10% off your first order</b> <a href="#shop">Shop now <ArrowRight size={13}/></a></div>
  <header className="header">
   <button className="icon-btn mobile-toggle" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Toggle menu"><Menu/></button>
   <a className="brand" href="#"><span className="brand-mark"><Leaf size={23}/></span><span>eCuisine<span className="brand-foods">FOODS</span></span></a>
   <nav className={mobileMenu?'nav open':'nav'}><a href="#shop">Shop <ChevronDown size={14}/></a><a href="#story">Our story</a><a href="#why">Why eCuisine</a><a href="#contact">Contact</a></nav>
   <div className="header-actions">
    <label className="search"><Search size={18}/><input value={search} onChange={e=>{setSearch(e.target.value);document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})}} placeholder="Search our goodness..."/></label>
    <button className="icon-btn bag" onClick={()=>setCartOpen(true)} aria-label="Open shopping bag"><ShoppingBag/><span className="cart-count">{count}</span></button>
   </div>
  </header>
  <main>
   <section className="hero">
    <div className="hero-copy"><div className="eyebrow"><span/> REAL FOOD. REAL GOODNESS.</div><h1>Your day starts<br/>with <em>goodness.</em></h1><p>Wholesome, nourishing Tombrown made with care. A delicious way to bring warmth and goodness to every morning.</p><div className="hero-buttons"><a className="btn primary" href="#shop">Shop Tombrown <ArrowRight size={17}/></a><a className="text-link" href="#story">Get to know us</a></div><div className="hero-note"><div className="avatars"><span>🌾</span><span>🤎</span><span>🌿</span></div><span>Loved by families, made for everyday.</span></div>
    <div className="hero-art"><div className="sun-disc"/><img className="hero-img" src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=90" alt="Warm, wholesome cereal served for breakfast"/><div className="floating-note"><span className="note-icon"><Leaf size={19}/></span><div><b>Simple ingredients</b><small>Feel-good nourishment</small></div></div><div className="hero-stamp"><span>MADE WITH</span><b>♥</b><span>CARE</span></div></div>
   </section>
   <section className="trust-strip" id="why"><div><Truck/><span><b>Delivery to your doorstep</b><small>Across selected locations</small></span></div><i/><div><Leaf/><span><b>Wholesome goodness</b><small>Thoughtfully made for you</small></span></div><i/><div><ShieldCheck/><span><b>Secure checkout</b><small>Shop with confidence</small></span></div><i/><div><Headphones/><span><b>Here to help</b><small>Friendly customer support</small></span></div></section>
   <section className="shop-section" id="shop"><div className="section-heading"><div><div className="eyebrow">FROM OUR KITCHEN TO YOURS</div><h2>A bowl full of <em>goodness.</em></h2><p>Meet your new morning favorite. Made to nourish, made to love.</p></div><a className="view-all" href="#shop">Explore all products <ArrowRight size={16}/></a></div>
    <div className="category-pills"><button className="active">All Tombrown</button><button onClick={()=>setSearch('Family')}>Family packs</button><button onClick={()=>setSearch('Everyday')}>Everyday sizes</button><button onClick={()=>setSearch('Bundle')}>Bundles & savings</button></div>
    <div className="products">{shown.map(p=><article className="product-card" key={p.id}><div className="product-image"><span className="product-tag">{p.tag}</span><button className="wish" aria-label="Add to wishlist"><Heart size={17}/></button><img src={p.image} alt={p.name}/><button className="quick-add" onClick={()=>add(p)}><Plus size={17}/> Add to bag</button></div><div className="product-info"><div className="rating"><Star size={13} fill="currentColor"/> {p.rating} <span>({p.reviews} reviews)</span></div><h3>{p.name}</h3><p>{p.size}</p><div className="price"><b>{money(p.price)}</b><del>{money(p.old)}</del></div></div></article>)}</div>
    {shown.length===0&&<div className="empty">No products match “{search}”. Try another search.</div>}
   </section>
   <section className="story" id="story"><div className="story-photo"><img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85" alt="Natural grains and wholesome ingredients"/><div className="photo-label"><Leaf/><span>GOODNESS, GROWN WITH CARE</span></div></div><div className="story-copy"><div className="eyebrow">A LITTLE ABOUT US</div><h2>Good food brings us <em>together.</em></h2><p>At eCuisine Foods, we believe the best moments often begin around the table. That's why we bring you nourishing Tombrown that's comforting, wholesome, and made for the people you love.</p><a href="#shop" className="btn light">A taste of eCuisine <ArrowRight size={16}/></a><div className="signature">With love & goodness <span>eCuisine Foods</span></div></div></section>
   <section className="newsletter"><div><div className="eyebrow">LET'S STAY IN TOUCH</div><h2>A little goodness in your inbox.</h2><p>Get product news, delicious inspiration & special treats.</p></div><form onSubmit={e=>{e.preventDefault();setNotice('Thank you for joining our community!');setTimeout(()=>setNotice(''),3000);}}><input type="email" placeholder="Your email address" required/><button className="btn primary">Join us <ArrowRight size={16}/></button></form></section>
  </main>
  <footer id="contact"><div className="footer-top"><a className="brand footer-brand" href="#"><span className="brand-mark"><Leaf size={23}/></span><span>eCuisine<span className="brand-foods">FOODS</span></span></a><p>Bringing wholesome goodness to your everyday.</p><div className="socials"><a href="#contact">Instagram</a><a href="#contact">Facebook</a><a href="#contact">WhatsApp</a></div></div><div className="footer-bottom"><span>© 2026 eCuisine Foods. Made with love.</span><span>Goodness in every bowl <span className="heart">♥</span></span></div></footer>
  {notice&&<div className="toast"><Check size={17}/>{notice}</div>}
  {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-panel" onClick={e=>e.stopPropagation()}><div className="cart-head"><h2>Your shopping bag <span>({count})</span></h2><button className="icon-btn" onClick={()=>setCartOpen(false)}><X/></button></div>{cart.length===0?<div className="cart-empty"><ShoppingBag size={36}/><h3>Your bag is taking a little nap.</h3><p>Let's fill it with some goodness.</p><button className="btn primary" onClick={()=>setCartOpen(false)}>Continue shopping</button></div>:<><div className="cart-items">{cart.map(p=><div className="cart-item" key={p.id}><img src={p.image} alt=""/><div className="cart-item-detail"><b>{p.name}</b><small>{p.size}</small><strong>{money(p.price)}</strong><div className="qty"><button onClick={()=>change(p.id,-1)}><Minus size={13}/></button><span>{p.qty}</span><button onClick={()=>change(p.id,1)}><Plus size={13}/></button></div></div></div>)}</div><div className="cart-foot"><div className="subtotal"><span>Subtotal</span><b>{money(total)}</b></div><small>Delivery fees calculated at checkout.</small><button className="btn primary checkout" onClick={()=>setNotice('Checkout integration will be connected soon.')}>Proceed to checkout <ArrowRight size={17}/></button></div></>}</aside></div>}
 </div>
}
export default App;