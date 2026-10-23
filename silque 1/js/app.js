/* Silque Tours — App Core */
window.SILQUE = window.SILQUE || {};
window.Silque = (function(){
  const STORE = 'silqueV3';
  let D = JSON.parse(JSON.stringify(window.SILQUE.DATA));
  try {
    const saved = JSON.parse(localStorage.getItem(STORE));
    if(saved){
      Object.keys(saved).forEach(k=>{
        if(Array.isArray(saved[k]) && Array.isArray(D[k]) && saved[k].length < D[k].length){
          // Data loss protection: prefer default if saved has fewer items
          return;
        }
        D[k] = saved[k];
      });
    }
  } catch(e){}
  D.merch.forEach(m=>{ if(!m.type) m.type = 'apparel'; });
  D.local.concat(D.weekend||[], D.kenya, D.africa, D.global, D.curated).forEach(t=>{
    if(t.status === 'past' && !t.adventureLink && t.exploreLink) t.adventureLink = t.exploreLink;
  });

  function save(){
    try { localStorage.setItem(STORE, JSON.stringify(D)); showSave(); } catch(e){}
  }
  function showSave(){
    const el = document.getElementById('saveInd');
    if(!el) return;
    el.classList.add('on');
    clearTimeout(window._sv);
    window._sv = setTimeout(()=>el.classList.remove('on'), 1500);
  }
  function toast(m){
    const t = document.getElementById('toast');
    if(!t) return;
    t.textContent = m;
    t.classList.add('on');
    clearTimeout(window._tt);
    window._tt = setTimeout(()=>t.classList.remove('on'), 2800);
  }
  function esc(s){ return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function imgUrl(id){
    if(!id) return 'https://images.unsplash.com/photo-1489392191043-fc10c97e64b6?w=600&fit=crop';
    const s = String(id).trim();
    const m1 = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if(m1) return 'https://drive.google.com/thumbnail?id='+m1[1]+'&sz=w800';
    const m2 = s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if(m2) return 'https://drive.google.com/thumbnail?id='+m2[1]+'&sz=w800';
    if(s.startsWith('http://') || s.startsWith('https://')) return s;
    return 'https://drive.google.com/thumbnail?id='+s+'&sz=w800';
  }
  function fallback(){ return 'https://images.unsplash.com/photo-1489392191043-fc10c97e64b6?w=600&fit=crop'; }
  function sortPrice(a){ return a.slice().sort((x,y)=>(x.price||0)-(y.price||0)); }
  function sortDate(a){ return a.slice().sort((x,y)=>new Date(x.date||0)-new Date(y.date||0)); }

  function findDestWithCat(id){
    const cats = [['local',D.local],['weekend',D.weekend||[]],['kenya',D.kenya],['africa',D.africa],['global',D.global],['curated',D.curated]];
    for(const [cat,arr] of cats){ const f = arr.find(d=>d.id===id); if(f) return {item: f, cat}; }
    return null;
  }
  function findDest(id){
    const cats = [['local',D.local],['weekend',D.weekend||[]],['kenya',D.kenya],['africa',D.africa],['global',D.global],['curated',D.curated]];
    for(const [,arr] of cats){ const f = arr.find(d=>d.id===id); if(f) return f; }
    return null;
  }

  function inclusions(item, cat){
    const isIntl = (cat==='africa' || cat==='global');
    let isMulti = false;
    const dMatch = (item.duration||'1').match(/(\d+)/);
    if(dMatch && parseInt(dMatch[1]) >= 2) isMulti = true;
    if(isIntl) return { items:['Transport to & from','Proper lunch & dinner','Clean drinking water','Accommodation','Activities (check social poster)','Entry fees'], note:'✈️ Flight tickets INCLUDED. Passport & visa NOT included.', intl:true };
    if(isMulti) return { items:['Transport to & from','Proper lunch & dinner','Clean drinking water','Accommodation','One activity'], note:'', intl:false };
    return { items:['Transport to & from','Clean drinking water','Proper lunch','One activity'], note:'', intl:false };
  }

  function toggleMenu(){
    document.getElementById('hamb').classList.toggle('on');
    document.getElementById('navMenu').classList.toggle('on');
    document.getElementById('menuOv').classList.toggle('on');
    document.body.style.overflow = document.getElementById('navMenu').classList.contains('on') ? 'hidden' : '';
  }
  function scrollTo(id){
    const el = document.getElementById(id);
    if(el){
      const off = window.innerWidth <= 900 ? 65 : 75;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - off, behavior: 'smooth' });
    }
    document.getElementById('hamb').classList.remove('on');
    document.getElementById('navMenu').classList.remove('on');
    document.getElementById('menuOv').classList.remove('on');
    document.body.style.overflow = '';
  }

  function openCurrency(){ document.getElementById('currencyModal').classList.add('on'); }
  function closeCurrency(){ document.getElementById('currencyModal').classList.remove('on'); }
  function setCurrency(code){ window.SILQUE.CURRENCY.set(code); closeCurrency(); }
  function openLegal(type){
    const content = D.settings[type === 'privacy' ? 'privacy' : type === 'terms' ? 'terms' : 'faqs'] || '';
    const titles = {privacy:'Privacy Policy', terms:'Terms & Conditions', faqs:'FAQs'};
    document.getElementById('legalContent').innerHTML = '<h3>'+titles[type]+'</h3><div style="color:#000;line-height:1.7;font-size:.9rem;white-space:pre-wrap;margin-top:1rem">'+esc(content)+'</div>';
    document.getElementById('legalModal').classList.add('on');
  }
  function closeLegal(){ document.getElementById('legalModal').classList.remove('on'); }
  function subscribeNews(e){ e.preventDefault(); toast('✅ Subscribed!'); document.getElementById('newsEmail').value = ''; }
  function slideTesti(dir){ const c = document.getElementById('testiScroll'); if(c) c.scrollBy({ left: dir * 336, behavior: 'smooth' }); }

  function openAdmin(){ document.getElementById('adminDash').classList.add('on'); document.body.style.overflow = 'hidden'; window.SilqueAdmin && window.SilqueAdmin.switchTab('bookings'); }
  function closeAdmin(){ document.getElementById('adminDash').classList.remove('on'); document.body.style.overflow = ''; }

  /* Booking */
  function updateBookPrice(){
    const sel = document.getElementById('bookDest'), g = document.getElementById('bookGuests'), sum = document.getElementById('bookSum'), inc = document.getElementById('bookInc');
    if(!sel || !sum) return;
    const guests = parseInt(g.value) || 1;
    if(sel.value){
      const opt = sel.options[sel.selectedIndex], price = parseInt(opt.dataset.price) || 0;
      document.getElementById('sumDest').textContent = opt.dataset.name;
      document.getElementById('sumPrice').textContent = window.SILQUE.CURRENCY.fmt(price);
      document.getElementById('sumGuests').textContent = guests;
      document.getElementById('sumTotal').textContent = window.SILQUE.CURRENCY.fmt(price * guests);
      sum.classList.add('on');
      const found = findDestWithCat(sel.value);
      if(found){
        const incData = inclusions(found.item, found.cat);
        inc.innerHTML = '<h5><i class="fas fa-check-double"></i> Inclusions</h5><ul>'+incData.items.map(i=>'<li><i class="fas fa-check"></i>'+i+'</li>').join('')+'</ul>'+(incData.note?'<p style="margin-top:.5rem;font-size:.72rem;color:#FFBF69"><i class="fas fa-info-circle"></i> '+incData.note+'</p>':'');
        inc.classList.add('on');
      }
    } else { sum.classList.remove('on'); inc.classList.remove('on'); }
  }
  function submitBooking(){
    const dest = document.getElementById('bookDest').value, guests = parseInt(document.getElementById('bookGuests').value) || 1;
    const name = document.getElementById('bookName').value.trim(), email = document.getElementById('bookEmail').value.trim(), phone = document.getElementById('bookPhone').value.trim(), pickup = document.getElementById('bookPickup').value;
    if(!dest){ toast('Select a destination'); return; }
    if(!name || !email || !phone){ toast('Fill required fields'); return; }
    if(!pickup){ toast('Select a pickup point'); return; }
    const found = findDestWithCat(dest);
    if(!found) return;
    const item = found.item, total = item.price * guests;
    D.bookings.push({id:'BK'+Date.now(), tripId:dest, tripName:item.name, guests, total, name, email, phone, date:document.getElementById('bookDate').value||'Not specified', pickup, requirements:document.getElementById('bookReq').value, currency:window.SILQUE.CURRENCY.get(), status:'confirmed', timestamp:new Date().toISOString()});
    item.bookings = (item.bookings || 0) + guests;
    save();
    try { new AudioContext(); } catch(e){}
    document.getElementById('bookForm').style.display = 'none';
    document.getElementById('bookSuccess').classList.add('on');
    document.getElementById('successMsg').textContent = 'Thank you '+name+'! Booking confirmed for '+item.name+' ('+guests+' guest'+(guests>1?'s':'')+'). Total: '+window.SILQUE.CURRENCY.fmt(total)+'.';
    toast('✅ Booking received!');
  }
  function resetBooking(){
    document.getElementById('bookForm').style.display = 'block';
    document.getElementById('bookSuccess').classList.remove('on');
    ['bookDest','bookGuests','bookName','bookEmail','bookPhone','bookDate','bookPickup','bookReq'].forEach(id=>{ const el = document.getElementById(id); if(el) el.value = ''; });
    document.getElementById('bookGuests').value = '1';
    document.getElementById('bookSum').classList.remove('on');
    document.getElementById('bookInc').classList.remove('on');
  }

  /* Cart */
  function updateCartBadge(){
    const btn = document.getElementById('cartBtn'), count = document.getElementById('cartCount');
    const total = D.cart.reduce((s,c)=>s+c.qty, 0);
    if(count) count.textContent = total;
    if(btn) btn.style.display = total>0 ? 'inline-flex' : 'none';
  }
  function openCart(){
    const cart = D.cart;
    let html;
    if(cart.length===0){ html = '<p style="text-align:center;padding:2rem;color:var(--g)">Your cart is empty.</p>'; }
    else {
      const total = cart.reduce((s,c)=>s+c.price*c.qty, 0);
      html = '<div style="max-height:50vh;overflow-y:auto">';
      cart.forEach((c,i)=>{
        html += '<div style="display:flex;gap:.8rem;align-items:center;padding:.7rem 0;border-bottom:1px solid #E5E7EB"><img src="'+imgUrl(c.image)+'" style="width:60px;height:60px;object-fit:cover;border-radius:8px" onerror="this.src=\''+fallback()+'\'"><div style="flex:1"><strong style="font-size:.85rem;color:#000">'+esc(c.name)+'</strong><div style="font-size:.75rem;color:var(--g)">'+(c.size==='One Size'?'Qty: ':'Size: '+esc(c.size)+' · Qty: ')+c.qty+'</div></div><div style="text-align:right"><div style="font-weight:700;color:var(--p);font-size:.9rem">'+window.SILQUE.CURRENCY.fmt(c.price*c.qty)+'</div><button class="a-btn del" onclick="Silque.rmCart('+i+')">Remove</button></div></div>';
      });
      html += '</div><div style="margin-top:1rem;padding:1rem;background:var(--l);border-radius:10px"><div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.1rem;color:#000"><span>Total:</span><span style="color:var(--p)">'+window.SILQUE.CURRENCY.fmt(total)+'</span></div></div>';
      html += '<button class="btn btn-p" style="width:100%;margin-top:1rem;justify-content:center" onclick="Silque.checkout()"><i class="fab fa-whatsapp"></i> Checkout via WhatsApp & Email</button>';
    }
    document.getElementById('cartContent').innerHTML = html;
    document.getElementById('cartModal').classList.add('on');
  }
  function closeCart(){ document.getElementById('cartModal').classList.remove('on'); }
  function rmCart(i){ D.cart.splice(i,1); save(); openCart(); updateCartBadge(); }
  function checkout(){
    if(D.cart.length===0){ toast('Cart is empty'); return; }
    const total = D.cart.reduce((s,c)=>s+c.price*c.qty, 0);
    let msg = 'Hi Silque Tours! I would like to order:\n\n';
    D.cart.forEach(c=>{ msg += '• '+c.name+(c.size!=='One Size'?' (Size: '+c.size+')':'')+' x'+c.qty+' — '+window.SILQUE.CURRENCY.fmt(c.price*c.qty)+'\n'; });
    msg += '\nTotal: '+window.SILQUE.CURRENCY.fmt(total)+'\n\nPlease confirm payment and delivery.';
    window.open('https://wa.me/'+(D.settings.wa||'254755942294')+'?text='+encodeURIComponent(msg), '_blank');
    const mailto = 'mailto:'+(D.settings.email||'silquetours@gmail.com')+'?subject=New Merch Order&body='+encodeURIComponent(msg);
    setTimeout(()=>{ window.location.href = mailto; }, 800);
    D.cart = [];
    save();
    updateCartBadge();
    setTimeout(()=>{ closeCart(); toast('✅ Order placed!'); }, 2000);
  }

  /* Testimonials */
  function openTestiForm(){ document.getElementById('testiFormModal').classList.add('on'); }
  function closeTestiForm(){ document.getElementById('testiFormModal').classList.remove('on'); }
  function submitTesti(e){
    e.preventDefault();
    const name = document.getElementById('tName').value.trim(), text = document.getElementById('tText').value.trim();
    if(!name || !text) return;
    D.testimonials.unshift({id:'ts'+Date.now(), name, text, rating: parseInt(document.getElementById('tRating').value), image:''});
    save();
    if(window.SilqueMain) window.SilqueMain.renderAll();
    closeTestiForm();
    toast('✅ Thank you!');
    document.getElementById('tName').value = '';
    document.getElementById('tText').value = '';
  }

  function quickBook(id){ const sel = document.getElementById('bookDest'); if(sel){ sel.value = id; updateBookPrice(); } scrollTo('book'); }
  function shareTrip(id){
    const url = location.origin + location.pathname + '?trip=' + id;
    if(navigator.share){ navigator.share({title:'Silque Tours', url}).catch(()=>{}); }
    else if(navigator.clipboard){ navigator.clipboard.writeText(url).then(()=>toast('Link copied!')).catch(()=>{}); }
    else { prompt('Copy this link:', url); }
  }
  function shareMerch(id){
    const url = location.origin + location.pathname + '?merch=' + id;
    if(navigator.clipboard){ navigator.clipboard.writeText(url).then(()=>toast('Link copied!')).catch(()=>{}); }
    else { prompt('Copy this link:', url); }
  }

  /* Merch */
  let currentSizes = {};
  function openMerch(id){
    const m = D.merch.find(x=>x.id===id); if(!m) return;
    const isApparel = m.type !== 'gear';
    currentSizes[id] = isApparel ? null : 'One Size';
    let html = '<h3>'+esc(m.name)+'</h3>';
    html += '<img src="'+imgUrl(m.image)+'" style="width:100%;max-height:400px;object-fit:contain;border-radius:12px;background:var(--l);margin-bottom:1rem" onerror="this.src=\''+fallback()+'\'">';
    html += '<div style="font-size:1.5rem;font-weight:700;color:var(--p);margin-bottom:.8rem">'+window.SILQUE.CURRENCY.fmt(m.price)+'</div>';
    if(isApparel){
      html += '<p style="color:#000;margin-bottom:.6rem;font-weight:600">Select size:</p>';
      html += '<div class="sizes" data-merch="'+m.id+'" style="justify-content:flex-start;margin-bottom:1rem">';
      ['S','M','L','XL','XXL','XXXL'].forEach(s=>{ html += '<span class="size-btn" onclick="Silque.pickSize(this,\''+m.id+'\')" style="padding:.5rem .9rem;font-size:.85rem">'+s+'</span>'; });
      html += '</div>';
      html += '<button class="merch-btn" id="modalAddBtn" data-merch="'+m.id+'" disabled onclick="Silque.addCart(\''+m.id+'\')"><i class="fas fa-lock"></i> Select Size First</button>';
    } else {
      html += '<p style="color:var(--g);margin-bottom:.6rem;font-size:.85rem"><i class="fas fa-suitcase-rolling"></i> Travel Gear — no size needed</p>';
      html += '<button class="merch-btn" style="margin-top:.5rem" onclick="Silque.addCart(\''+m.id+'\');Silque.closeMerch()"><i class="fas fa-cart-plus"></i> Add to Cart</button>';
    }
    html += '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid #E5E7EB;display:flex;gap:.5rem;justify-content:center"><button class="btn btn-sm btn-o" style="color:#000;border-color:#E5E7EB" onclick="Silque.shareMerch(\''+m.id+'\')"><i class="fas fa-share-alt"></i> Share</button></div>';
    document.getElementById('merchPreview').innerHTML = html;
    document.getElementById('merchModal').classList.add('on');
  }
  function closeMerch(){ document.getElementById('merchModal').classList.remove('on'); }
  function pickSize(el, merchId){
    el.parentElement.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('on'));
    el.classList.add('on');
    currentSizes[merchId] = el.textContent;
    const btn = document.getElementById('modalAddBtn');
    if(btn && btn.dataset.merch === merchId){ btn.disabled = false; btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart'; btn.style.background = '#25D366'; }
  }
  function addCart(merchId){
    const item = D.merch.find(m=>m.id===merchId); if(!item) return;
    const isApparel = item.type !== 'gear';
    const size = currentSizes[merchId];
    if(isApparel && !size){ toast('Select a size first'); return; }
    const finalSize = isApparel ? size : 'One Size';
    const existing = D.cart.find(c=>c.merchId===merchId && c.size===finalSize);
    if(existing){ existing.qty++; } else { D.cart.push({merchId, name:item.name, price:item.price, size:finalSize, qty:1, image:item.image}); }
    save();
    updateCartBadge();
    toast('✅ Added to cart');
  }

  /* Trip detail modal */
  function openTrip(id, cat){
    const found = findDestWithCat(id); if(!found) return;
    const t = found.item, inc = inclusions(t, found.cat), isPast = t.status === 'past';
    let html = '<h3>'+esc(t.name)+'</h3>';
    html += '<p style="color:var(--g);font-size:.85rem"><i class="fas fa-map-marker-alt"></i> '+esc(t.location||t.country||'')+(t.country?' · '+esc(t.country):'')+'</p>';
    html += '<img src="'+imgUrl(t.image)+'" style="width:100%;height:250px;object-fit:cover;border-radius:12px;margin-bottom:1rem" onerror="this.src=\''+fallback()+'\'">';
    html += '<p style="color:var(--d);line-height:1.7;margin-bottom:1rem">'+esc(t.description)+'</p>';
    html += '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem">';
    if(t.duration) html += '<span style="background:var(--l);padding:.3rem .7rem;border-radius:20px;font-size:.75rem;color:#000"><i class="fas fa-clock"></i> '+esc(t.duration)+'</span>';
    if(t.difficulty) html += '<span style="background:var(--l);padding:.3rem .7rem;border-radius:20px;font-size:.75rem;color:#000"><i class="fas fa-hiking"></i> '+esc(t.difficulty)+'</span>';
    if(t.group) html += '<span style="background:var(--l);padding:.3rem .7rem;border-radius:20px;font-size:.75rem;color:#000"><i class="fas fa-users"></i> '+esc(t.group)+'</span>';
    if(t.rating) html += '<span style="background:var(--l);padding:.3rem .7rem;border-radius:20px;font-size:.75rem;color:#000">⭐ '+t.rating+'</span>';
    html += '</div>';
    html += '<div style="background:rgba(46,196,182,.08);border-radius:10px;padding:1rem;margin-bottom:1rem"><h4 style="color:var(--s);font-size:.9rem;margin-bottom:.5rem">✓ Inclusions</h4><ul style="display:grid;grid-template-columns:1fr 1fr;gap:.3rem">';
    inc.items.forEach(i=>{ html += '<li style="font-size:.8rem;display:flex;align-items:center;gap:.3rem;color:#000"><i class="fas fa-check" style="color:var(--ok)"></i>'+i+'</li>'; });
    html += '</ul>';
    if(inc.note) html += '<p style="margin-top:.6rem;font-size:.75rem;color:var(--wn);padding-top:.5rem;border-top:1px dashed rgba(0,0,0,.1)"><i class="fas fa-info-circle"></i> '+esc(inc.note)+'</p>';
    html += '</div>';
    if(isPast){
      html += '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem;padding-top:1rem;border-top:1px solid #E5E7EB">';
      if(t.adventureLink) html += '<a class="btn btn-p" href="'+esc(t.adventureLink)+'" target="_blank" rel="noopener"><i class="fas fa-images"></i> Explore the Adventure</a>';
      html += '<a class="btn" style="background:#E1306C;color:#fff" href="https://www.instagram.com/silque_tnt" target="_blank" rel="noopener"><i class="fab fa-instagram"></i> Instagram</a>';
      html += '<button class="btn btn-o" style="color:#000;border-color:#E5E7EB" onclick="Silque.shareTrip(\''+t.id+'\')"><i class="fas fa-share-alt"></i> Share</button>';
      html += '</div>';
    } else {
      html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:.8rem 0;border-top:1px solid #E5E7EB;margin-top:1rem"><div><div style="font-size:1.4rem;font-weight:700;color:var(--p)">'+window.SILQUE.CURRENCY.fmt(t.price)+'</div><div style="font-size:.7rem;color:var(--g)">per person</div></div><div style="display:flex;gap:.5rem"><button class="btn btn-p" onclick="Silque.quickBook(\''+t.id+'\');Silque.closeTrip()">Book Now</button><button class="icon-btn" onclick="Silque.shareTrip(\''+t.id+'\')" style="width:40px;height:40px"><i class="fas fa-share-alt"></i></button></div></div>';
    }
    document.getElementById('tripDetail').innerHTML = html;
    document.getElementById('tripModal').classList.add('on');
  }
  function closeTrip(){ document.getElementById('tripModal').classList.remove('on'); }

  function init(){
    window.SILQUE.AUTH.getDeviceId();
    if(document.getElementById('year')) document.getElementById('year').textContent = Math.max(new Date().getFullYear(), 2026);
    window.SILQUE.CURRENCY.init();
    if(window.SilqueMain) window.SilqueMain.renderAll();
    if(window.SilqueAdmin) window.SilqueAdmin.init();

    window.addEventListener('scroll', ()=>{ const nav = document.getElementById('navbar'); if(nav) nav.classList.toggle('scrolled', window.scrollY > 50); });
    if(document.getElementById('bookDest')) document.getElementById('bookDest').addEventListener('change', updateBookPrice);
    if(document.getElementById('bookGuests')) document.getElementById('bookGuests').addEventListener('input', updateBookPrice);

    document.querySelectorAll('.tab').forEach(tab=>{
      tab.addEventListener('click', function(){
        document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
        document.querySelectorAll('.pnl').forEach(p=>p.classList.remove('on'));
        this.classList.add('on');
        const panel = document.getElementById('panel-' + this.dataset.tab);
        if(panel) panel.classList.add('on');
      });
    });

    const silqueLink = document.getElementById('silqueLink');
    if(silqueLink) silqueLink.addEventListener('click', window.SILQUE.AUTH.openAdminLogin);
    const adminPwd = document.getElementById('adminPwd');
    if(adminPwd) adminPwd.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); window.SILQUE.AUTH.tryUnlock(); } });

    setTimeout(()=>toast('🇰🇪 Welcome to Silque Tours — Unlock Happiness'), 800);
    console.log('✅ Silque Tours Ready · Admin password reset available via "Silque" link in footer');
  }

  return {
    state: D, save, toast, esc, imgUrl, fallback, sortPrice, sortDate, findDest, findDestWithCat, inclusions,
    toggleMenu, scrollTo, openCurrency, closeCurrency, setCurrency, openLegal, closeLegal, subscribeNews, slideTesti,
    openAdmin, closeAdmin, updateBookPrice, submitBooking, resetBooking,
    updateCartBadge, openCart, closeCart, rmCart, checkout,
    openTestiForm, closeTestiForm, submitTesti,
    quickBook, shareTrip, shareMerch,
    openMerch, closeMerch, pickSize, addCart,
    openTrip, closeTrip, init,
    getCurrentSizes: ()=>currentSizes
  };
})();