/* Silque Tours — Public Rendering */
window.SILQUE = window.SILQUE || {};
window.SilqueMain = (function(){
  let GAL_ITEMS = [], galPage = 0, galIndex = 0;
  const GAL_PER_PAGE = 12;
  let galClickTimer = null, galLastClickIdx = -1;

  function getState(){ return window.Silque.state; }

  function buildGalleryItems(){
    const D = getState();
    const items = [], seen = new Set();
    const add = (image, tripId, tripCat, label) => {
      if(!image) return;
      const key = String(image);
      if(seen.has(key)) return;
      seen.add(key);
      items.push({ image, tripId: tripId||null, tripCat: tripCat||null, label: label||'' });
    };
    [['local',D.local],['weekend',D.weekend||[]],['kenya',D.kenya],['africa',D.africa],['global',D.global],['curated',D.curated]].forEach(([cat,arr])=>{
      arr.forEach(t => add(t.image, t.id, cat, t.name));
    });
    D.merch.forEach(m => add(m.image, null, null, m.name));
    D.portfolio.forEach(p => p.images.forEach(im => add(im, null, null, p.name)));
    (D.gallery||[]).forEach(g => add(g.image, null, null, g.label||''));
    return items;
  }

  function priorityTrips(){
    const D = getState();
    return window.Silque.sortDate(D.local.concat(D.weekend||[]).filter(t=>t.status==='upcoming' && t.priority===true));
  }
  function allUpcomingTrips(){
    const D = getState();
    return window.Silque.sortDate(D.local.concat(D.weekend||[]).filter(t=>t.status==='upcoming' && t.priority!==true));
  }

  function renderInclusions(item, cat){
    const inc = window.Silque.inclusions(item, cat);
    const cls = inc.intl ? 'inc inc-intl' : 'inc';
    return '<div class="'+cls+'"><h6><i class="fas fa-check-double"></i> Inclusions</h6><ul>'+inc.items.map(i=>'<li><i class="fas fa-check"></i>'+window.Silque.esc(i)+'</li>').join('')+'</ul>'+(inc.note?'<div class="inc-note"><i class="fas fa-info-circle"></i><span>'+window.Silque.esc(inc.note)+'</span></div>':'')+'</div>';
  }

  function tripCard(t, cat){
    const esc = window.Silque.esc, imgUrl = window.Silque.imgUrl, fallback = window.Silque.fallback, fmt = window.SILQUE.CURRENCY.fmt;
    return '<div class="card anim">'+
      '<div class="c-img" onclick="Silque.openTrip(\''+t.id+'\',\''+cat+'\')">'+
        '<img src="'+imgUrl(t.image)+'" alt="'+esc(t.name)+'" loading="lazy" onerror="this.src=\''+fallback()+'\'">'+
        (t.badge?'<div class="c-bdg">'+esc(t.badge)+'</div>':'')+
        (t.difficulty?'<div class="c-diff '+t.difficulty.toLowerCase()+'">'+esc(t.difficulty)+'</div>':'')+
        (t.country?'<div class="c-country">'+esc(t.country)+'</div>':'')+
        (t.priority?'<div class="c-pri"><i class="fas fa-star"></i> PRIORITY</div>':'')+
      '</div>'+
      '<div class="c-body"><div class="c-loc"><i class="fas fa-map-marker-alt"></i>'+esc(t.location||t.country||'')+'</div><h3>'+esc(t.name)+'</h3>'+
      (t.date?'<div class="c-date"><i class="far fa-calendar-alt"></i> '+esc(t.date)+'</div>':'')+
      '<div class="c-meta">'+(t.duration?'<span><i class="fas fa-clock"></i>'+esc(t.duration)+'</span>':'')+(t.group?'<span><i class="fas fa-users"></i>'+esc(t.group)+'</span>':'')+'</div>'+
      '<p class="c-desc">'+esc(t.description||'')+'</p>'+
      '<div class="c-foot"><div class="c-price" data-price-kes="'+t.price+'">'+fmt(t.price)+' <small>/pp</small></div>'+
      '<div class="c-act"><button class="btn btn-p btn-sm" onclick="event.stopPropagation();Silque.quickBook(\''+t.id+'\')">Book</button><button class="icon-btn" onclick="event.stopPropagation();Silque.shareTrip(\''+t.id+'\')"><i class="fas fa-share-alt"></i></button></div></div></div>'+
      renderInclusions(t, cat)+'</div>';
  }

  function pastCard(t){
    const esc = window.Silque.esc, imgUrl = window.Silque.imgUrl, fallback = window.Silque.fallback;
    return '<div class="exc anim" onclick="Silque.openTrip(\''+t.id+'\',\'local\')"><div class="exc-img"><img src="'+imgUrl(t.image)+'" alt="'+esc(t.name)+'" loading="lazy" onerror="this.src=\''+fallback()+'\'"><div class="exc-b">'+esc(t.badge||'')+'</div></div><div class="exc-body"><h3>'+esc(t.name)+'</h3><p>'+esc(t.description||'')+'</p><div class="exc-hint"><i class="fas fa-info-circle"></i> Click to view details, links & photos</div></div></div>';
  }

  function merchCard(m){
    const isApparel = m.type !== 'gear';
    const esc = window.Silque.esc, imgUrl = window.Silque.imgUrl, fmt = window.SILQUE.CURRENCY.fmt;
    return '<div class="merch-card anim" onclick="Silque.openMerch(\''+m.id+'\')"><div class="merch-img"><div class="merch-fb"><i class="fas fa-'+(isApparel?'tshirt':'suitcase-rolling')+'"></i></div><img src="'+imgUrl(m.image)+'" alt="'+esc(m.name)+'" loading="lazy" onerror="this.style.display=\'none\'">'+(m.tag?'<div class="merch-tag">'+esc(m.tag)+'</div>':'')+(isApparel?'':'<div class="merch-type-badge">GEAR</div>')+'</div><div class="merch-body"><h4>'+esc(m.name)+'</h4><div class="merch-price" data-price-kes="'+m.price+'">'+fmt(m.price)+'</div><div class="merch-hint">Click to '+(isApparel?'view sizes':'view item')+'</div></div></div>';
  }

  function dealCard(d){
    const D = getState();
    const dest = D.local.concat(D.weekend,D.kenya,D.africa,D.global,D.curated).find(t=>t.id===d.destId);
    if(!dest) return '';
    const esc = window.Silque.esc, imgUrl = window.Silque.imgUrl, fallback = window.Silque.fallback, fmt = window.SILQUE.CURRENCY.fmt;
    const orig = dest.price, disc = Math.round(orig * (1 - d.discount/100));
    return '<div class="card anim"><div class="c-img" onclick="Silque.quickBook(\''+dest.id+'\')"><div class="deal-b">'+d.discount+'% OFF</div><img src="'+imgUrl(d.image||dest.image)+'" alt="'+esc(d.name)+'" onerror="this.src=\''+fallback()+'\'"><div class="c-bdg">'+esc(d.badge)+'</div>'+(dest.country?'<div class="c-country">'+esc(dest.country)+'</div>':'')+'</div><div class="c-body"><div class="c-loc"><i class="fas fa-map-marker-alt"></i>'+esc(dest.location||dest.country||'')+'</div><h3>'+esc(d.name)+'</h3>'+(dest.date?'<div class="c-date"><i class="far fa-calendar-alt"></i> '+esc(dest.date)+'</div>':'')+'<div class="c-meta"><span><i class="fas fa-tag"></i>'+esc(d.type)+'</span><span><i class="fas fa-hourglass"></i>'+esc(d.validity)+'</span></div><div class="c-foot"><div class="c-price"><span class="deal-orig" data-price-kes="'+orig+'">'+fmt(orig)+'</span> <span data-price-kes="'+disc+'">'+fmt(disc)+'</span> <small>/pp</small></div><button class="btn btn-p btn-sm" onclick="event.stopPropagation();Silque.quickBook(\''+dest.id+'\')">Book</button></div></div>'+renderInclusions(dest,'local')+'</div>';
  }

  function renderGallery(page){
    GAL_ITEMS = buildGalleryItems();
    galPage = page;
    const total = GAL_ITEMS.length;
    const start = page * GAL_PER_PAGE;
    const pageItems = GAL_ITEMS.slice(start, start + GAL_PER_PAGE);
    const grid = document.getElementById('galleryGrid');
    if(grid) grid.innerHTML = pageItems.map((g,i)=>'<div class="gal-item" onclick="SilqueMain.galClick('+(start+i)+')"><img src="'+window.Silque.imgUrl(g.image)+'" onerror="this.src=\''+window.Silque.fallback()+'\'" loading="lazy" alt=""></div>').join('');
    const nav = document.getElementById('galNav');
    if(nav){
      const pages = Math.max(1, Math.ceil(total / GAL_PER_PAGE));
      let html = '';
      if(page > 0) html += '<button class="btn btn-o" style="color:var(--g);border-color:#E5E7EB" onclick="SilqueMain.galPageChange('+(page-1)+')"><i class="fas fa-chevron-left"></i> Prev</button>';
      html += '<span style="padding:.5rem 1rem;font-size:.85rem;color:var(--g);font-weight:600">Page '+(page+1)+' of '+pages+'</span>';
      if(page < pages-1) html += '<button class="btn btn-p" onclick="SilqueMain.galPageChange('+(page+1)+')">Next <i class="fas fa-chevron-right"></i></button>';
      nav.innerHTML = html;
    }
  }

  function galPageChange(p){ renderGallery(p); setTimeout(()=>{ const g = document.getElementById('gallery'); if(g) g.scrollIntoView({behavior:'smooth', block:'start'}); }, 100); }

  function galClick(idx){
    if(galClickTimer && galLastClickIdx === idx){
      clearTimeout(galClickTimer);
      galClickTimer = null;
      galLastClickIdx = -1;
      const item = GAL_ITEMS[idx];
      if(item && item.tripId){
        const found = window.Silque.findDestWithCat(item.tripId);
        if(found){ window.Silque.openTrip(item.tripId, found.cat); return; }
      }
      openGal(idx);
    } else {
      galLastClickIdx = idx;
      if(galClickTimer) clearTimeout(galClickTimer);
      galClickTimer = setTimeout(()=>{ galClickTimer = null; galLastClickIdx = -1; openGal(idx); }, 300);
    }
  }

  function openGal(idx){ galIndex = idx; updateGalImg(); document.getElementById('galModal').classList.add('on'); }
  function closeGal(){ document.getElementById('galModal').classList.remove('on'); }
  function updateGalImg(){
    if(GAL_ITEMS.length===0){ document.getElementById('galImg').src = ''; return; }
    const g = GAL_ITEMS[galIndex];
    document.getElementById('galImg').src = window.Silque.imgUrl(g.image);
    document.getElementById('galCounter').textContent = (galIndex+1) + ' / ' + GAL_ITEMS.length + (g.label ? ' · ' + g.label : '');
    const visitBtn = document.getElementById('galVisit');
    if(visitBtn){
      if(g.tripId){
        visitBtn.classList.add('on');
        visitBtn.onclick = ()=>{ const found = window.Silque.findDestWithCat(g.tripId); if(found){ closeGal(); setTimeout(()=>window.Silque.openTrip(g.tripId, found.cat), 100); } };
      } else { visitBtn.classList.remove('on'); }
    }
  }
  function galNext(){ galIndex = (galIndex + 1) % GAL_ITEMS.length; updateGalImg(); }
  function galPrev(){ galIndex = (galIndex - 1 + GAL_ITEMS.length) % GAL_ITEMS.length; updateGalImg(); }

  document.addEventListener('keydown', e=>{
    if(document.getElementById('galModal').classList.contains('on')){
      if(e.key === 'ArrowRight') galNext();
      if(e.key === 'ArrowLeft') galPrev();
      if(e.key === 'Escape') closeGal();
    }
  });

  function renderAll(){
    const D = getState();
    const esc = window.Silque.esc, imgUrl = window.Silque.imgUrl, fallback = window.Silque.fallback;
    const priority = priorityTrips();
    const rest = allUpcomingTrips();
    document.getElementById('upcomingGrid').innerHTML = priority.map(t=>tripCard(t, 'local')).join('') + rest.map(t=>tripCard(t, 'local')).join('');
    document.getElementById('localGrid').innerHTML = window.Silque.sortPrice(D.local.filter(t=>t.status==='upcoming')).map(t=>tripCard(t,'local')).join('');
    if(document.getElementById('weekendGrid')) document.getElementById('weekendGrid').innerHTML = window.Silque.sortDate((D.weekend||[]).filter(t=>t.status==='upcoming')).map(t=>tripCard(t,'weekend')).join('');
    document.getElementById('pastGrid').innerHTML = D.local.filter(t=>t.status==='past').map(pastCard).join('');
    document.getElementById('kenyaGrid').innerHTML = D.kenya.map(d=>tripCard(d,'kenya')).join('');
    document.getElementById('africaGrid').innerHTML = D.africa.map(d=>tripCard(d,'africa')).join('');
    document.getElementById('globalGrid').innerHTML = D.global.map(d=>tripCard(d,'global')).join('');
    document.getElementById('curatedGrid').innerHTML = D.curated.map(d=>tripCard(d,'curated')).join('');
    document.getElementById('portfolioGrid').innerHTML = D.portfolio.map(p=>'<div class="card"><div class="c-img" style="height:150px;cursor:default"><img src="'+imgUrl(p.images[0])+'" onerror="this.src=\''+fallback()+'\'"></div><div class="c-body"><h3>'+esc(p.name)+'</h3><p style="color:var(--g);font-size:.75rem;margin-bottom:.4rem">'+esc(p.category)+' · '+esc(p.clientType)+'</p><p class="c-desc">'+esc(p.story)+'</p><div style="background:var(--l);padding:.5rem;border-radius:8px;font-style:italic;font-size:.75rem;color:var(--d);border-left:3px solid var(--p)">'+esc(p.testimonial)+'</div></div></div>').join('');
    document.getElementById('dealsGrid').innerHTML = D.deals.map(dealCard).join('');
    document.getElementById('cnt-kenya').textContent = D.kenya.length;
    document.getElementById('cnt-africa').textContent = D.africa.length;
    document.getElementById('cnt-global').textContent = D.global.length;
    document.getElementById('cnt-curated').textContent = D.curated.length;
    document.getElementById('cnt-deals').textContent = D.deals.length;
    document.getElementById('statDest').textContent = (D.local.length + D.weekend.length + D.kenya.length + D.africa.length + D.global.length + D.curated.length) + '+';
    document.getElementById('merchGrid').innerHTML = D.merch.map(merchCard).join('');
    document.getElementById('testiScroll').innerHTML = D.testimonials.map(t=>'<div class="testi-card"><div class="testi-av">'+(t.image?'<img src="'+imgUrl(t.image)+'" onerror="this.parentElement.textContent=\''+esc(t.name.charAt(0))+'\'">':esc(t.name.charAt(0)))+'</div><div class="testi-stars">'+'⭐'.repeat(t.rating||5)+'</div><p class="testi-txt">"'+esc(t.text)+'"</p><div class="testi-auth">'+esc(t.name)+'</div></div>').join('');
    document.getElementById('partnersGrid').innerHTML = D.partners.map(p=>'<div class="pt-card"><div class="pt-logo">'+(p.image?'<img src="'+imgUrl(p.image)+'" onerror="this.parentElement.innerHTML=\'<i class=&quot;fas fa-handshake&quot; style=&quot;font-size:2.5rem;color:var(--p)&quot;></i>\'">':'<i class="fas fa-handshake" style="font-size:2.5rem;color:var(--p)"></i>')+'</div><h4>'+esc(p.name)+'</h4><p>'+esc(p.description)+'</p></div>').join('');

    /* Founder */
    const fb = {name:'Ben', role:'Founder & Chairman', bio:'With a passion for outdoor adventures and strategic leadership, Ben founded Silque Tours in 2025.', image:'1S-37CcfzLyZciV8lrPraAqEEHfrm-6x7'};
    const founder = D.team.find(t=>t.isFounder) || D.team[0] || fb;
    const ff = {name:founder.name||fb.name, role:founder.role||fb.role, bio:founder.bio||fb.bio, image:founder.image||fb.image};
    document.getElementById('founderWrap').innerHTML = '<div class="founder-feat"><div class="founder-img"><img src="'+imgUrl(ff.image)+'" onerror="this.src=\''+fallback()+'\'" alt="'+esc(ff.name)+'"></div><div class="founder-info"><h3>'+esc(ff.name)+'</h3><div class="frole">'+esc(ff.role)+'</div><p class="fbio">'+esc(ff.bio)+'</p></div></div>';
    document.getElementById('teamGrid').innerHTML = D.team.filter(t=>!t.isFounder).map(t=>'<div class="team-card"><div class="team-av"><img src="'+imgUrl(t.image)+'" onerror="this.src=\''+fallback()+'\'"></div><h4 style="font-size:.95rem;margin-bottom:.2rem">'+esc(t.name)+'</h4><p style="color:var(--p);font-size:.75rem;font-weight:600;margin-bottom:.4rem">'+esc(t.role)+'</p><p style="color:var(--g);font-size:.78rem">'+esc(t.bio||'')+'</p></div>').join('');

    document.getElementById('aboutTitle').textContent = D.settings.aboutTitle || 'About Silque Tours';
    document.getElementById('aboutSubtitle').textContent = D.settings.aboutSubtitle || '';
    document.getElementById('aboutGrid').innerHTML = [
      {i:'🎯',t:'Our Mission',d:D.settings.aboutDesc || 'Accessible travel.'},
      {i:'🛡️',t:'Safety First',d:'Certified guides with first-aid training.'},
      {i:'💚',t:'Sustainability',d:'Responsible tourism.'},
      {i:'🇰🇪',t:'Proudly Kenyan',d:"Kenya's best."}
    ].map(c=>'<div class="cat-card"><div class="cat-i">'+c.i+'</div><h3>'+c.t+'</h3><p>'+esc(c.d)+'</p></div>').join('');

    renderGallery(0);
    document.getElementById('newsTitle').textContent = D.settings.newsTitle || 'Latest Updates';
    document.getElementById('newsBody').textContent = D.settings.newsBody || '';
    document.getElementById('ftName').textContent = (D.settings.name || 'Silque') + ' Tours';
    document.getElementById('ftSocials').innerHTML = [
      {c:'ig',i:'instagram',u:D.settings.instagram},
      {c:'fb',i:'facebook-f',u:D.settings.facebook},
      {c:'tt',i:'tiktok',u:D.settings.tiktok},
      {c:'yt',i:'youtube',u:D.settings.youtube}
    ].map(s=>'<a href="'+esc(s.u||'#')+'" class="soc '+s.c+'" target="_blank" rel="noopener"><i class="fab fa-'+s.i+'"></i></a>').join('');

    const pm = D.settings.paymentMethods || [];
    if(pm.length===0) document.getElementById('ftPayments').innerHTML = '';
    else document.getElementById('ftPayments').innerHTML = '<h5>Payment Methods</h5>' + pm.map(p=>{
      let icon = 'fa-mobile-alt', details = '';
      if(p.type==='till') details = 'Till: '+esc(p.value1);
      else if(p.type==='paybill'){ icon='fa-money-bill'; details = 'Paybill: '+esc(p.value1)+(p.value2?' · Acc: '+esc(p.value2):''); }
      else if(p.type==='link'){ icon='fa-link'; details = '<a href="'+esc(p.value1)+'" target="_blank" style="color:var(--a);text-decoration:underline">Pay Online</a>'; }
      else if(p.type==='card'){ icon='fa-credit-card'; details = '<a href="'+esc(p.value1)+'" target="_blank" style="color:var(--a);text-decoration:underline">Card Payment</a>'; }
      return '<div class="pm"><i class="fas '+icon+'"></i><div class="pm-info"><span class="pm-name">'+esc(p.name)+'</span>'+details+'</div></div>';
    }).join('');

    const pop = D.local.filter(t=>t.status==='upcoming').sort((a,b)=>b.bookings-a.bookings).slice(0,5);
    document.getElementById('ftPop').innerHTML = pop.map(t=>'<li><a onclick="Silque.scrollTo(\'trips\')"><i class="fas fa-chevron-right"></i> '+esc(t.name)+'</a></li>').join('');

    document.getElementById('ftContact').innerHTML = '<div class="ft-ct"><i class="fas fa-map-marker-alt"></i><span>'+esc(D.settings.location)+'</span></div>'+'<div class="ft-ct"><i class="fas fa-phone"></i><span>'+esc(D.settings.phone)+'</span></div>'+'<div class="ft-ct"><i class="fas fa-envelope"></i><span>'+esc(D.settings.email)+'</span></div>';

    document.getElementById('navName').textContent = D.settings.name;
    document.getElementById('navSlogan').textContent = D.settings.slogan;
    document.getElementById('navLogo').src = imgUrl(D.settings.logo);
    document.getElementById('heroBg').src = imgUrl(D.settings.heroImage);
    document.getElementById('heroText').textContent = D.settings.heroText;
    document.getElementById('waHero').href = 'https://wa.me/' + D.settings.wa;
    document.getElementById('waFloat').href = 'https://wa.me/' + D.settings.wa;

    const all = D.local.concat(D.weekend, D.kenya, D.africa, D.global, D.curated);
    const up = window.Silque.sortPrice(all.filter(t=>!t.status || t.status==='upcoming'));
    document.getElementById('bookDest').innerHTML = '<option value="">Choose your adventure...</option>' + up.map(t=>'<option value="'+t.id+'" data-price="'+t.price+'" data-name="'+esc(t.name)+'">'+esc(t.name)+' — '+window.SILQUE.CURRENCY.fmt(t.price)+'</option>').join('');

    const PICKUPS = ['KICC','Kenkom','Jivanjee','Wetland Safaricom','Uthiru','Kikuyu','Kijabe','Allsopps','Githurai','Kenyatta University','Ruiru','Kimbo','Thika','Kenol','Ananas','Bellevue','Airtel','GM','Cabanas','Donholm','Mulolongo','Kitengela','Tuffoam','Athiriver','Machakos Junction'];
    document.getElementById('bookPickup').innerHTML = '<option value="">Select pickup point...</option>' + PICKUPS.map(p=>'<option value="'+esc(p)+'">'+esc(p)+'</option>').join('');

    window.Silque.updateCartBadge();
    window.SILQUE.CURRENCY.refresh();
  }

  return { renderAll, renderGallery, galPageChange, galClick, openGal, closeGal, galNext, galPrev };
})();