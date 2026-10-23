/* Silque Tours — Admin Dashboard */
window.SILQUE = window.SILQUE || {};
window.SilqueAdmin = (function(){
  let destFilter = 'all';
  const COUNTRIES = ['🇰🇪 Kenya','🇹🇿 Tanzania','🇺🇬 Uganda','🇷🇼 Rwanda','🇪🇹 Ethiopia','🇿🇦 South Africa','🇳🇦 Namibia','🇧🇼 Botswana','🇿🇼 Zimbabwe','🇿🇲 Zambia','🇲🇼 Malawi','🇲🇿 Mozambique','🇲🇬 Madagascar','🇲🇺 Mauritius','🇸🇨 Seychelles','🇪🇬 Egypt','🇲🇦 Morocco','🇹🇳 Tunisia','🇩🇿 Algeria','🇱🇾 Libya','🇸🇩 Sudan','🇸🇴 Somalia','🇩🇯 Djibouti','🇪🇷 Eritrea','🇬🇭 Ghana','🇳🇬 Nigeria','🇸🇳 Senegal','🇨🇮 Ivory Coast','🇨🇲 Cameroon','🇬🇦 Gabon','🇨🇩 DR Congo','🇨🇬 Congo','🇦🇴 Angola','🇧🇫 Burkina Faso','🇲🇱 Mali','🇳🇪 Niger','🇹🇩 Chad','🇨🇫 Central African Rep.','🇬🇲 Gambia','🇬🇼 Guinea-Bissau','🇬🇳 Guinea','🇸🇱 Sierra Leone','🇱🇷 Liberia','🇹🇬 Togo','🇧🇯 Benin','🇲🇷 Mauritania','🇱🇸 Lesotho','🇸🇿 Eswatini','🇰🇲 Comoros','🇨🇻 Cape Verde','🇫🇷 France','🇬🇧 United Kingdom','🇩🇪 Germany','🇮🇹 Italy','🇪🇸 Spain','🇵🇹 Portugal','🇳🇱 Netherlands','🇧🇪 Belgium','🇨🇭 Switzerland','🇦🇹 Austria','🇸🇪 Sweden','🇳🇴 Norway','🇩🇰 Denmark','🇫🇮 Finland','🇮🇸 Iceland','🇮🇪 Ireland','🇵🇱 Poland','🇨🇿 Czechia','🇭🇺 Hungary','🇷🇴 Romania','🇧🇬 Bulgaria','🇬🇷 Greece','🇭🇷 Croatia','🇷🇸 Serbia','🇸🇮 Slovenia','🇸🇰 Slovakia','🇺🇦 Ukraine','🇷🇺 Russia','🇹🇷 Turkey','🇺🇸 United States','🇨🇦 Canada','🇲🇽 Mexico','🇧🇷 Brazil','🇦🇷 Argentina','🇨🇱 Chile','🇨🇴 Colombia','🇵🇪 Peru','🇻🇪 Venezuela','🇪🇨 Ecuador','🇧🇴 Bolivia','🇺🇾 Uruguay','🇵🇾 Paraguay','🇨🇺 Cuba','🇩🇴 Dominican Rep.','🇯🇲 Jamaica','🇭🇹 Haiti','🇵🇦 Panama','🇨🇷 Costa Rica','🇬🇹 Guatemala','🇭🇳 Honduras','🇸🇻 El Salvador','🇳🇮 Nicaragua','🇧🇿 Belize','🇨🇳 China','🇯🇵 Japan','🇰🇷 South Korea','🇮🇳 India','🇵🇰 Pakistan','🇧🇩 Bangladesh','🇱🇰 Sri Lanka','🇳🇵 Nepal','🇧🇹 Bhutan','🇲🇻 Maldives','🇹🇭 Thailand','🇻🇳 Vietnam','🇰🇭 Cambodia','🇱🇦 Laos','🇲🇲 Myanmar','🇲🇾 Malaysia','🇸🇬 Singapore','🇮🇩 Indonesia','🇵🇭 Philippines','🇧🇳 Brunei','🇦🇺 Australia','🇳🇿 New Zealand','🇫🇯 Fiji','🇦🇪 UAE','🇸🇦 Saudi Arabia','🇶🇦 Qatar','🇰🇼 Kuwait','🇧🇭 Bahrain','🇴🇲 Oman','🇾🇪 Yemen','🇮🇶 Iraq','🇮🇷 Iran','🇮🇱 Israel','🇯🇴 Jordan','🇱🇧 Lebanon','🇸🇾 Syria','🇦🇫 Afghanistan','🇰🇿 Kazakhstan','🇺🇿 Uzbekistan','🇰🇬 Kyrgyzstan','🇹🇯 Tajikistan','🇦🇿 Azerbaijan','🇦🇲 Armenia','🇬🇪 Georgia'];

  const TYPES = ['day-hike','weekend','beach','corporate','adventure','safari','cultural','city','recreational','road-trip','adventure-wildlife','business','culinary','sports-events','hike'];

  function getState(){ return window.Silque.state; }
  function esc(s){ return window.Silque.esc(s); }
  function imgUrl(s){ return window.Silque.imgUrl(s); }
  function fallback(){ return window.Silque.fallback(); }

  function switchTab(tab){
    document.querySelectorAll('.dash-tab').forEach(t=>t.classList.toggle('on', t.dataset.atab===tab));
    document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on', p.id === 'apanel-'+tab));
    if(tab === 'bookings') renderBookings();
    if(tab === 'destinations'){ renderCountryDropdown(); renderDestTable(); }
    if(tab === 'merch') renderMerchTable();
    if(tab === 'portfolio') renderPortfolioTable();
    if(tab === 'team') renderTeamPanel();
    if(tab === 'partners') renderPartnersTable();
    if(tab === 'testimonials') renderTestiTable();
    if(tab === 'deals') renderDealsPanel();
    if(tab === 'gallery') renderAdminGallery();
    if(tab === 'content') renderContentPanel();
    if(tab === 'settings') renderSettingsPanel();
    if(tab === 'security') renderSecurityPanel();
  }

  function renderCountryDropdown(){
    const sel = document.getElementById('ndCountry');
    if(sel && sel.options.length === 0) sel.innerHTML = COUNTRIES.map(c=>'<option>'+c+'</option>').join('');
    const tsel = document.getElementById('ndType');
    if(tsel && tsel.options.length === 0) tsel.innerHTML = TYPES.map(t=>'<option value="'+t+'">'+t+'</option>').join('');
  }

  function renderBookings(){
    const D = getState();
    const t = document.getElementById('bookTable');
    if(!t) return;
    if(D.bookings.length === 0){ t.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--g)">No bookings yet.</td></tr>'; return; }
    t.innerHTML = D.bookings.map(b=>'<tr><td>'+esc(b.id)+'</td><td>'+esc(b.name)+'</td><td>'+esc(b.tripName)+'</td><td>'+b.guests+'</td><td>KES '+b.total.toLocaleString()+'</td><td>'+esc(b.pickup||'-')+'</td><td>'+esc(b.date||'-')+'</td><td><button class="a-btn del" onclick="SilqueAdmin.delBooking(\''+b.id+'\')">Delete</button></td></tr>').join('');
  }
  function delBooking(id){
    if(!confirm('Delete?')) return;
    const D = getState();
    D.bookings = D.bookings.filter(b=>b.id!==id);
    window.Silque.save();
    renderBookings();
  }

  function renderDestTable(){
    const D = getState();
    const t = document.getElementById('destTable');
    if(!t) return;
    const cats = [['local', D.local],['weekend', D.weekend || []],['kenya', D.kenya],['africa', D.africa],['global', D.global],['curated', D.curated]];
    const rows = [];
    cats.forEach(([cat, arr])=>{
      arr.forEach(item=>{
        if(destFilter==='past' && item.status!=='past') return;
        if(destFilter==='upcoming' && item.status==='past') return;
        if(destFilter!=='all' && destFilter!=='past' && destFilter!=='upcoming' && destFilter!==cat) return;
        rows.push('<tr>'+
          '<td><img src="'+imgUrl(item.image)+'" onerror="this.src=\''+fallback()+'\'"></td>'+
          '<td><input class="name-input" value="'+esc(item.name)+'" data-id="'+item.id+'" data-cat="'+cat+'" data-field="name"></td>'+
          '<td><input value="'+esc(item.country||'')+'" data-id="'+item.id+'" data-cat="'+cat+'" data-field="country" style="min-width:100px"></td>'+
          '<td><input type="number" value="'+(item.price||0)+'" data-id="'+item.id+'" data-cat="'+cat+'" data-field="price" style="width:80px"></td>'+
          '<td><input type="date" value="'+esc((item.date||'').slice(0,10))+'" data-id="'+item.id+'" data-cat="'+cat+'" data-field="date" style="min-width:130px"></td>'+
          '<td><input value="'+esc(item.duration||'')+'" data-id="'+item.id+'" data-cat="'+cat+'" data-field="duration" style="width:70px"></td>'+
          '<td><select data-id="'+item.id+'" data-cat="'+cat+'" data-field="type">'+TYPES.map(tp=>'<option value="'+tp+'"'+((item.type||'')===tp?' selected':'')+'>'+tp+'</option>').join('')+'</select></td>'+
          '<td><input value="'+esc(item.image||'')+'" data-id="'+item.id+'" data-cat="'+cat+'" data-field="image" style="min-width:140px;font-size:.7rem"></td>'+
          '<td><select data-id="'+item.id+'" data-cat="'+cat+'" data-field="status"><option value="upcoming"'+(item.status==='upcoming'?' selected':'')+'>Upcoming</option><option value="past"'+(item.status==='past'?' selected':'')+'>Past</option></select></td>'+
          '<td><input value="'+esc(item.adventureLink||item.exploreLink||'')+'" data-id="'+item.id+'" data-cat="'+cat+'" data-field="adventureLink" placeholder="Adventure link" style="min-width:150px;font-size:.7rem"></td>'+
          '<td><input type="checkbox" '+(item.priority?'checked':'')+' data-id="'+item.id+'" data-cat="'+cat+'" data-field="priority" style="width:auto"></td>'+
          '<td><select data-id="'+item.id+'" data-cat="'+cat+'" data-field="moveTo"><option value="">Move...</option><option value="local">Single Day</option><option value="weekend">Weekend</option><option value="kenya">Kenya</option><option value="africa">Africa</option><option value="global">Global</option><option value="curated">Curated</option></select></td>'+
          '<td><span class="badge'+(item.status==='past'?' past':'')+'">'+cat+'</span></td>'+
          '<td><button class="a-btn del" onclick="SilqueAdmin.delDest(\''+item.id+'\',\''+cat+'\')">Del</button></td>'+
        '</tr>');
      });
    });
    if(rows.length===0){ t.innerHTML = '<tr><td colspan="14" style="text-align:center;padding:2rem;color:var(--g)">No destinations.</td></tr>'; return; }
    t.innerHTML = '<thead><tr><th>Img</th><th>Name</th><th>Country</th><th>Price</th><th>Date</th><th>Dur</th><th>Type</th><th>Image</th><th>Status</th><th>Adventure Link</th><th>⭐ Pri</th><th>Move</th><th>Cat</th><th></th></tr></thead><tbody>'+rows.join('')+'</tbody>';
    t.querySelectorAll('input[data-field], select[data-field]').forEach(el=>{
      el.addEventListener('change', function(){
        const cat = this.dataset.cat, id = this.dataset.id, field = this.dataset.field;
        const item = D[cat].find(x=>x.id===id); if(!item) return;
        if(field === 'moveTo'){
          if(!this.value || this.value === cat) return;
          item.status = 'upcoming';
          D[this.value].push(item);
          D[cat] = D[cat].filter(x=>x.id!==id);
          window.Silque.save();
          window.SilqueMain.renderAll();
          renderDestTable();
          window.Silque.toast('✅ Moved');
          return;
        }
        let v = this.value;
        if(field === 'price') v = parseInt(v) || 0;
        if(field === 'priority') v = this.checked;
        item[field] = v;
        window.Silque.save();
        window.SilqueMain.renderAll();
        if(field === 'image'){ const img = this.closest('tr').querySelector('img'); if(img) img.src = imgUrl(v); }
        window.Silque.toast('✅ Updated');
      });
    });
  }
  function delDest(id, cat){
    if(!confirm('Delete?')) return;
    const D = getState();
    D[cat] = D[cat].filter(x=>x.id!==id);
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderDestTable();
  }
  function addDestination(){
    const D = getState();
    const name = document.getElementById('ndName').value.trim(), price = parseInt(document.getElementById('ndPrice').value), cat = document.getElementById('ndCat').value, country = document.getElementById('ndCountry').value, image = document.getElementById('ndImage').value.trim();
    if(!name || !price || !image){ window.Silque.toast('Fill name, price, image'); return; }
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') + '-' + Date.now().toString(36).slice(-4);
    const item = {id, name, country, location: country, price, date: document.getElementById('ndDate').value||'', duration: document.getElementById('ndDuration').value||'1 Day', group: document.getElementById('ndGroup').value||'10-30', difficulty: document.getElementById('ndDiff').value, type: document.getElementById('ndType').value||'day-hike', status:'upcoming', image, badge: document.getElementById('ndBadge').value||'🆕 New', description: document.getElementById('ndDesc').value||'New destination!', adventureLink: document.getElementById('ndAdventure').value||'', priority: document.getElementById('ndPriority').checked, bookings: 0};
    D[cat].unshift(item);
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderDestTable();
    ['ndName','ndPrice','ndDate','ndImage','ndDesc','ndBadge','ndAdventure'].forEach(f=>{ const el=document.getElementById(f); if(el) el.value=''; });
    document.getElementById('ndPriority').checked = false;
    window.Silque.toast('✅ Destination added');
  }

  function renderMerchTable(){
    const D = getState();
    const t = document.getElementById('merchTable');
    if(!t) return;
    t.innerHTML = '<thead><tr><th>Img</th><th>Name</th><th>Price</th><th>Type</th><th>Image</th><th>Tag</th><th></th></tr></thead><tbody>'+D.merch.map(m=>'<tr><td><img src="'+imgUrl(m.image)+'" onerror="this.src=\''+fallback()+'\'"></td><td><input class="name-input" value="'+esc(m.name)+'" data-mid="'+m.id+'" data-mf="name"></td><td><input type="number" value="'+m.price+'" data-mid="'+m.id+'" data-mf="price" style="width:85px"></td><td><select data-mid="'+m.id+'" data-mf="type"><option value="apparel"'+(m.type==='apparel'?' selected':'')+'>Apparel</option><option value="gear"'+(m.type==='gear'?' selected':'')+'>Travel Gear</option></select></td><td><input value="'+esc(m.image)+'" data-mid="'+m.id+'" data-mf="image" style="font-size:.7rem"></td><td><input value="'+esc(m.tag||'')+'" data-mid="'+m.id+'" data-mf="tag" style="width:80px"></td><td><button class="a-btn del" onclick="SilqueAdmin.delMerch(\''+m.id+'\')">Del</button></td></tr>').join('')+'</tbody>';
    t.querySelectorAll('[data-mid]').forEach(el=>{
      el.addEventListener('change', function(){
        const m = D.merch.find(x=>x.id===this.dataset.mid); if(!m) return;
        let v = this.value; if(this.dataset.mf === 'price') v = parseInt(v) || 0;
        m[this.dataset.mf] = v;
        window.Silque.save();
        window.SilqueMain.renderAll();
        window.Silque.toast('✅ Saved');
      });
    });
  }
  function addMerch(){
    const D = getState();
    const name = document.getElementById('mName').value.trim(), price = parseInt(document.getElementById('mPrice').value), image = document.getElementById('mImage').value.trim(), type = document.getElementById('mType').value;
    if(!name || !price || !image){ window.Silque.toast('Fill name, price, image'); return; }
    D.merch.push({id:'m'+Date.now(), name, price, image, tag: document.getElementById('mTag').value.trim()||'New', type});
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderMerchTable();
    ['mName','mPrice','mImage','mTag'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
    window.Silque.toast('✅ Added');
  }
  function delMerch(id){
    if(!confirm('Delete?')) return;
    const D = getState();
    D.merch = D.merch.filter(m=>m.id!==id);
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderMerchTable();
  }

  function renderPortfolioTable(){
    const D = getState();
    const t = document.getElementById('portfolioTable');
    if(!t) return;
    t.innerHTML = '<thead><tr><th>Name</th><th>Story</th><th>Images</th><th></th></tr></thead><tbody>'+D.portfolio.map(p=>'<tr><td><input class="name-input" value="'+esc(p.name)+'" data-pid="'+p.id+'" data-pf="name"></td><td><textarea data-pid="'+p.id+'" data-pf="story" rows="2" style="font-size:.72rem">'+esc(p.story)+'</textarea></td><td><input value="'+esc(p.images.join(','))+'" data-pid="'+p.id+'" data-pf="images" style="font-size:.7rem"></td><td><button class="a-btn del" onclick="SilqueAdmin.delPortfolio(\''+p.id+'\')">Del</button></td></tr>').join('')+'</tbody>';
    t.querySelectorAll('[data-pid]').forEach(el=>{
      el.addEventListener('change', function(){
        const p = D.portfolio.find(x=>x.id===this.dataset.pid); if(!p) return;
        let v = this.value; if(this.dataset.pf === 'images') v = v.split(',').map(s=>s.trim()).filter(Boolean);
        p[this.dataset.pf] = v;
        window.Silque.save();
        window.SilqueMain.renderAll();
        window.Silque.toast('✅ Saved');
      });
    });
  }
  function addPortfolio(){
    const D = getState();
    const name = document.getElementById('pfName').value.trim(), story = document.getElementById('pfStory').value.trim(), images = document.getElementById('pfImages').value.split(',').map(s=>s.trim()).filter(Boolean);
    if(!name || !story || images.length===0){ window.Silque.toast('Fill name, story, images'); return; }
    D.portfolio.push({id:'p'+Date.now(), name, category: document.getElementById('pfCat').value||'Adventure', clientType: document.getElementById('pfType').value||'Client', story, testimonial: document.getElementById('pfTestimonial').value||'', images});
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderPortfolioTable();
    ['pfName','pfCat','pfType','pfStory','pfTestimonial','pfImages'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
    window.Silque.toast('✅ Added');
  }
  function delPortfolio(id){
    if(!confirm('Delete?')) return;
    const D = getState();
    D.portfolio = D.portfolio.filter(p=>p.id!==id);
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderPortfolioTable();
  }

  function renderTeamPanel(){
    const D = getState();
    const founder = D.team.find(t=>t.isFounder) || D.team[0];
    const fe = document.getElementById('founderEdit');
    if(founder && fe){
      fe.innerHTML = '<h4 style="font-size:.95rem;margin-bottom:.5rem"><i class="fas fa-crown" style="color:var(--a)"></i> Founder <span class="badge protected">🔒 Protected</span></h4>'+
        '<div class="fg"><label>Name</label><input type="text" id="fnName" value="'+esc(founder.name)+'"></div>'+
        '<div class="fg"><label>Role</label><input type="text" id="fnRole" value="'+esc(founder.role)+'"></div>'+
        '<div class="fg"><label>Bio</label><textarea id="fnBio" rows="3">'+esc(founder.bio||'')+'</textarea></div>'+
        '<div class="fg"><label>Image Link</label><input type="text" id="fnImage" value="'+esc(founder.image)+'"></div>'+
        '<button class="btn btn-p btn-sm" onclick="SilqueAdmin.saveFounder(\''+founder.id+'\')"><i class="fas fa-save"></i> Save Founder</button>';
    }
    const t = document.getElementById('teamTable');
    if(t){
      const others = D.team.filter(t=>!t.isFounder);
      if(others.length === 0){ t.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:1rem;color:var(--g);font-size:.82rem">No additional team members yet.</td></tr>'; }
      else {
        t.innerHTML = '<thead><tr><th>Img</th><th>Name</th><th>Role</th><th>Bio</th><th>Image</th><th></th></tr></thead><tbody>'+others.map(m=>'<tr><td><img src="'+imgUrl(m.image)+'" onerror="this.src=\''+fallback()+'\'"></td><td><input class="name-input" value="'+esc(m.name)+'" data-tid="'+m.id+'" data-tf="name"></td><td><input value="'+esc(m.role)+'" data-tid="'+m.id+'" data-tf="role"></td><td><textarea data-tid="'+m.id+'" data-tf="bio" rows="2" style="font-size:.7rem">'+esc(m.bio||'')+'</textarea></td><td><input value="'+esc(m.image)+'" data-tid="'+m.id+'" data-tf="image" style="font-size:.7rem"></td><td><button class="a-btn del" onclick="SilqueAdmin.delTeam(\''+m.id+'\')">Del</button></td></tr>').join('')+'</tbody>';
        t.querySelectorAll('[data-tid]').forEach(el=>{
          el.addEventListener('change', function(){
            const m = D.team.find(x=>x.id===this.dataset.tid); if(!m) return;
            m[this.dataset.tf] = this.value;
            window.Silque.save();
            window.SilqueMain.renderAll();
            window.Silque.toast('✅ Saved');
          });
        });
      }
    }
  }
  function saveFounder(id){
    const D = getState();
    const f = D.team.find(t=>t.id===id); if(!f) return;
    f.name = document.getElementById('fnName').value || f.name;
    f.role = document.getElementById('fnRole').value || f.role;
    f.bio = document.getElementById('fnBio').value || f.bio;
    f.image = document.getElementById('fnImage').value || f.image;
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderTeamPanel();
    window.Silque.toast('✅ Founder updated');
  }
  function addTeam(){
    const D = getState();
    const name = document.getElementById('tmName').value.trim(), role = document.getElementById('tmRole').value.trim(), image = document.getElementById('tmImage').value.trim();
    if(!name || !role || !image){ window.Silque.toast('Fill all fields'); return; }
    D.team.push({id:'tm'+Date.now(), name, role, bio:document.getElementById('tmBio').value, image, isFounder:false});
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderTeamPanel();
    ['tmName','tmRole','tmBio','tmImage'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
    window.Silque.toast('✅ Added');
  }
  function delTeam(id){
    const D = getState();
    const t = D.team.find(x=>x.id===id);
    if(t && t.isFounder){ window.Silque.toast('❌ Founder cannot be deleted'); return; }
    if(!confirm('Delete?')) return;
    D.team = D.team.filter(t=>t.id!==id);
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderTeamPanel();
  }

  function renderPartnersTable(){
    const D = getState();
    const t = document.getElementById('partnersTable');
    if(!t) return;
    t.innerHTML = '<thead><tr><th>Img</th><th>Name</th><th>Description</th><th>Image</th><th></th></tr></thead><tbody>'+D.partners.map(p=>'<tr><td><img src="'+imgUrl(p.image)+'" onerror="this.src=\''+fallback()+'\'"></td><td><input class="name-input" value="'+esc(p.name)+'" data-ptid="'+p.id+'" data-ptf="name"></td><td><input value="'+esc(p.description)+'" data-ptid="'+p.id+'" data-ptf="description"></td><td><input value="'+esc(p.image||'')+'" data-ptid="'+p.id+'" data-ptf="image" style="font-size:.7rem"></td><td><button class="a-btn del" onclick="SilqueAdmin.delPartner(\''+p.id+'\')">Del</button></td></tr>').join('')+'</tbody>';
    t.querySelectorAll('[data-ptid]').forEach(el=>{
      el.addEventListener('change', function(){
        const p = D.partners.find(x=>x.id===this.dataset.ptid); if(!p) return;
        p[this.dataset.ptf] = this.value;
        window.Silque.save();
        window.SilqueMain.renderAll();
        window.Silque.toast('✅ Saved');
      });
    });
  }
  function addPartner(){
    const D = getState();
    const name = document.getElementById('ptName').value.trim(), description = document.getElementById('ptDesc').value.trim(), image = document.getElementById('ptImage').value.trim();
    if(!name || !description){ window.Silque.toast('Fill name, description'); return; }
    D.partners.push({id:'pt'+Date.now(), name, description, image});
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderPartnersTable();
    ['ptName','ptDesc','ptImage'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
    window.Silque.toast('✅ Added');
  }
  function delPartner(id){
    if(!confirm('Delete?')) return;
    const D = getState();
    D.partners = D.partners.filter(p=>p.id!==id);
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderPartnersTable();
  }

  function renderTestiTable(){
    const D = getState();
    const t = document.getElementById('testiTable');
    if(!t) return;
    t.innerHTML = '<thead><tr><th>Name</th><th>Rating</th><th>Text</th><th>Image</th><th></th></tr></thead><tbody>'+D.testimonials.map(ts=>'<tr><td><input class="name-input" value="'+esc(ts.name)+'" data-tsid="'+ts.id+'" data-tsf="name"></td><td><select data-tsid="'+ts.id+'" data-tsf="rating">'+[1,2,3,4,5].map(n=>'<option value="'+n+'"'+(ts.rating===n?' selected':'')+'>'+n+'</option>').join('')+'</select></td><td><textarea data-tsid="'+ts.id+'" data-tsf="text" rows="2" style="font-size:.72rem">'+esc(ts.text)+'</textarea></td><td><input value="'+esc(ts.image||'')+'" data-tsid="'+ts.id+'" data-tsf="image" style="font-size:.7rem"></td><td><button class="a-btn del" onclick="SilqueAdmin.delTesti(\''+ts.id+'\')">Del</button></td></tr>').join('')+'</tbody>';
    t.querySelectorAll('[data-tsid]').forEach(el=>{
      el.addEventListener('change', function(){
        const ts = D.testimonials.find(x=>x.id===this.dataset.tsid); if(!ts) return;
        let v = this.value; if(this.dataset.tsf === 'rating') v = parseInt(v);
        ts[this.dataset.tsf] = v;
        window.Silque.save();
        window.SilqueMain.renderAll();
        window.Silque.toast('✅ Saved');
      });
    });
  }
  function addTesti(){
    const D = getState();
    const name = document.getElementById('tstName').value.trim(), text = document.getElementById('tstText').value.trim();
    if(!name || !text){ window.Silque.toast('Fill name and text'); return; }
    D.testimonials.push({id:'ts'+Date.now(), name, text, image: document.getElementById('tstImage').value.trim(), rating: 5});
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderTestiTable();
    ['tstName','tstText','tstImage'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
    window.Silque.toast('✅ Added');
  }
  function delTesti(id){
    if(!confirm('Delete?')) return;
    const D = getState();
    D.testimonials = D.testimonials.filter(t=>t.id!==id);
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderTestiTable();
  }

  function renderDealsPanel(){
    const D = getState();
    const sel = document.getElementById('dealDest');
    if(sel){
      const all = D.local.concat(D.weekend, D.kenya, D.africa, D.global, D.curated);
      sel.innerHTML = '<option value="">Select destination...</option>' + all.map(t=>'<option value="'+t.id+'">'+esc(t.name)+' ('+window.SILQUE.CURRENCY.fmt(t.price)+')</option>').join('');
    }
    const t = document.getElementById('dealsTable');
    if(!t) return;
    t.innerHTML = '<thead><tr><th>Name</th><th>Discount</th><th>Type</th><th>Validity</th><th>Preview</th><th></th></tr></thead><tbody>'+D.deals.map(d=>{
      const dest = D.local.concat(D.weekend,D.kenya,D.africa,D.global,D.curated).find(t=>t.id===d.destId);
      if(!dest) return '';
      const orig = dest.price, final = Math.round(orig * (1 - d.discount/100));
      return '<tr><td><input class="name-input" value="'+esc(d.name)+'" data-did="'+d.id+'" data-df="name"></td><td><input type="number" value="'+d.discount+'" data-did="'+d.id+'" data-df="discount" style="width:70px"></td><td><input value="'+esc(d.type)+'" data-did="'+d.id+'" data-df="type" style="width:100px"></td><td><input value="'+esc(d.validity)+'" data-did="'+d.id+'" data-df="validity" style="width:80px"></td><td><s style="color:var(--g)">'+window.SILQUE.CURRENCY.fmt(orig)+'</s> → <strong style="color:var(--p)">'+window.SILQUE.CURRENCY.fmt(final)+'</strong></td><td><button class="a-btn del" onclick="SilqueAdmin.delDeal(\''+d.id+'\')">Remove</button></td></tr>';
    }).join('')+'</tbody>';
    t.querySelectorAll('[data-did]').forEach(el=>{
      el.addEventListener('change', function(){
        const d = D.deals.find(x=>x.id===this.dataset.did); if(!d) return;
        let v = this.value; if(this.dataset.df === 'discount') v = parseInt(v) || 0;
        d[this.dataset.df] = v;
        window.Silque.save();
        window.SilqueMain.renderAll();
        renderDealsPanel();
        window.Silque.toast('✅ Saved');
      });
    });
  }
  function addDeal(){
    const D = getState();
    const destId = document.getElementById('dealDest').value, discount = parseInt(document.getElementById('dealDisc').value);
    if(!destId || !discount){ window.Silque.toast('Select destination and discount'); return; }
    const dest = D.local.concat(D.weekend,D.kenya,D.africa,D.global,D.curated).find(t=>t.id===destId);
    if(!dest) return;
    D.deals.push({id:'d'+Date.now(), destId, name:dest.name, discount, type:document.getElementById('dealType').value, validity:document.getElementById('dealValidity').value||'7 days', badge:'🔥 Special', image:dest.image});
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderDealsPanel();
    document.getElementById('dealDest').value='';
    document.getElementById('dealDisc').value='20';
    window.Silque.toast('✅ Deal added');
  }
  function delDeal(id){
    if(!confirm('Remove?')) return;
    const D = getState();
    D.deals = D.deals.filter(d=>d.id!==id);
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderDealsPanel();
  }

  function renderAdminGallery(){
    const D = getState();
    const g = document.getElementById('adminGalGrid');
    if(!g) return;
    g.innerHTML = (D.gallery||[]).map(gi=>'<div style="position:relative"><div class="gal-item" style="height:100px"><img src="'+imgUrl(gi.image)+'" onerror="this.src=\''+fallback()+'\'"></div><button class="a-btn del" style="position:absolute;top:5px;right:5px" onclick="SilqueAdmin.delGallery(\''+gi.id+'\')">✕</button></div>').join('');
  }
  function addGallery(){
    const D = getState();
    const image = document.getElementById('galImg').value.trim();
    if(!image){ window.Silque.toast('Enter image link'); return; }
    D.gallery = D.gallery || [];
    D.gallery.push({id:'g'+Date.now(), image});
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderAdminGallery();
    document.getElementById('galImg').value='';
    window.Silque.toast('✅ Added');
  }
  function delGallery(id){
    const D = getState();
    D.gallery = D.gallery.filter(g=>g.id!==id);
    window.Silque.save();
    window.SilqueMain.renderAll();
    renderAdminGallery();
  }

  function renderContentPanel(){
    const D = getState();
    ['aboutTitle','aboutSubtitle','aboutDesc','newsTitle','newsBody'].forEach(k=>{
      const el = document.getElementById(k+'Edit');
      if(el) el.value = D.settings[k] || '';
    });
    ['privacy','terms','faqs'].forEach(k=>{
      const el = document.getElementById(k+'Edit');
      if(el) el.value = D.settings[k] || '';
    });
  }
  function saveAbout(){
    const D = getState();
    D.settings.aboutTitle = document.getElementById('aboutTitleEdit').value;
    D.settings.aboutSubtitle = document.getElementById('aboutSubtitleEdit').value;
    D.settings.aboutDesc = document.getElementById('aboutDescEdit').value;
    window.Silque.save();
    window.SilqueMain.renderAll();
    window.Silque.toast('✅ About saved');
  }
  function saveNews(){
    const D = getState();
    D.settings.newsTitle = document.getElementById('newsTitleEdit').value;
    D.settings.newsBody = document.getElementById('newsBodyEdit').value;
    window.Silque.save();
    window.SilqueMain.renderAll();
    window.Silque.toast('✅ Newsletter saved');
  }
  function saveLegal(){
    const D = getState();
    D.settings.privacy = document.getElementById('privacyEdit').value;
    D.settings.terms = document.getElementById('termsEdit').value;
    D.settings.faqs = document.getElementById('faqsEdit').value;
    window.Silque.save();
    window.Silque.toast('✅ Legal saved');
  }

  function renderSettingsPanel(){
    const D = getState();
    ['name','slogan','logo','heroImage','heroText','phone','wa','email','location','officePhones','waNumbers','instagram','facebook','tiktok','youtube'].forEach(k=>{
      const el = document.getElementById('set' + k.charAt(0).toUpperCase() + k.slice(1));
      if(el) el.value = D.settings[k] || '';
    });
    renderPaymentEditors();
  }
  function renderPaymentEditors(){
    const D = getState();
    const c = document.getElementById('paymentEditors'); if(!c) return;
    const pm = D.settings.paymentMethods || [];
    c.innerHTML = pm.map((p,i)=>'<div style="background:#fff;padding:.7rem;border-radius:10px;margin-bottom:.5rem;border:1px solid #E5E7EB"><div class="fg" style="margin-bottom:.4rem"><label style="color:#000;font-size:.75rem">Method '+(i+1)+' Name</label><input type="text" value="'+esc(p.name)+'" onchange="SilqueAdmin.updPay('+i+',\'name\',this.value)"></div><div class="fg" style="margin-bottom:.4rem"><label style="color:#000;font-size:.75rem">Type</label><select onchange="SilqueAdmin.updPay('+i+',\'type\',this.value)">'+['till','paybill','link','card'].map(t=>'<option value="'+t+'"'+(p.type===t?' selected':'')+'>'+{till:'M-Pesa Till',paybill:'M-Pesa Paybill',link:'Payment Link',card:'Card Payment'}[t]+'</option>').join('')+'</select></div><div class="fg" style="margin-bottom:.4rem"><label style="color:#000;font-size:.75rem">'+(p.type==='paybill'?'Paybill Number':'Till Number / URL')+'</label><input type="text" value="'+esc(p.value1||'')+'" onchange="SilqueAdmin.updPay('+i+',\'value1\',this.value)"></div>'+(p.type==='paybill'?'<div class="fg" style="margin-bottom:.4rem"><label style="color:#000;font-size:.75rem">Account Number</label><input type="text" value="'+esc(p.value2||'')+'" onchange="SilqueAdmin.updPay('+i+',\'value2\',this.value)"></div>':'')+'<button class="a-btn del" onclick="SilqueAdmin.rmPay('+i+')">Remove</button></div>').join('');
  }
  function addPaymentMethod(){
    const D = getState();
    const pm = D.settings.paymentMethods || [];
    if(pm.length >= 4){ window.Silque.toast('Max 4 methods'); return; }
    pm.push({name:'New Method', type:'till', value1:'', value2:''});
    D.settings.paymentMethods = pm;
    window.Silque.save();
    renderPaymentEditors();
  }
  function updPay(i, field, value){
    const D = getState();
    D.settings.paymentMethods[i][field] = value;
    window.Silque.save();
    renderPaymentEditors();
  }
  function rmPay(i){
    const D = getState();
    D.settings.paymentMethods.splice(i,1);
    window.Silque.save();
    renderPaymentEditors();
    window.SilqueMain.renderAll();
  }
  function saveSettings(){
    const D = getState();
    ['name','slogan','logo','heroImage','heroText','phone','wa','email','location','officePhones','waNumbers','instagram','facebook','tiktok','youtube'].forEach(k=>{
      const el = document.getElementById('set' + k.charAt(0).toUpperCase() + k.slice(1));
      if(el) D.settings[k] = el.value;
    });
    window.Silque.save();
    window.SilqueMain.renderAll();
    window.Silque.toast('✅ Settings saved');
  }

  function renderSecurityPanel(){
    const D = getState();
    const devs = D.devices || [], myId = window.SILQUE.AUTH.getDeviceId();
    const el = document.getElementById('devicesList');
    if(el){
      el.innerHTML = devs.map(d=>'<div style="padding:.5rem;background:var(--l);border-radius:8px;margin-bottom:.4rem;font-size:.82rem;display:flex;justify-content:space-between;align-items:center;color:#000"><span><i class="fas fa-'+(d.type==='mobile'?'mobile-alt':'desktop')+'"></i> '+(d.id===myId?'<strong>This Device</strong> · ':'')+esc(d.name)+'</span>'+(d.id!==myId?'<button class="a-btn del" onclick="SilqueAdmin.revokeDevice(\''+d.id+'\')">Revoke</button>':'')+'</div>').join('');
    }
  }
  function revokeDevice(id){
    if(!confirm('Revoke?')) return;
    const D = getState();
    D.devices = D.devices.filter(d=>d.id!==id);
    window.Silque.save();
    renderSecurityPanel();
  }
  function exportData(){
    const blob = new Blob([JSON.stringify(getState(), null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'silque-data-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
  }
  function resetData(){
    if(!confirm('Reset ALL data to defaults?')) return;
    localStorage.removeItem('silqueV3');
    location.reload();
  }

  function init(){
    document.querySelectorAll('.dash-tab').forEach(tab=>{
      tab.addEventListener('click', function(){ switchTab(this.dataset.atab); });
    });
    document.querySelectorAll('.filt').forEach(f=>{
      f.addEventListener('click', function(){
        document.querySelectorAll('.filt').forEach(x=>x.classList.remove('on'));
        this.classList.add('on');
        destFilter = this.dataset.filter;
        renderDestTable();
      });
    });
    const driveBtn = document.getElementById('driveFolderBtn');
    if(driveBtn) driveBtn.href = window.SILQUE.DRIVE_FOLDER_URL;
  }

  return { init, switchTab, renderBookings, renderDestTable, renderMerchTable, renderPortfolioTable, renderTeamPanel, renderPartnersTable, renderTestiTable, renderDealsPanel, renderAdminGallery, renderContentPanel, renderSettingsPanel, renderSecurityPanel, renderPaymentEditors,
    delBooking, delDest, addDestination, delMerch, addMerch, delPortfolio, addPortfolio, saveFounder, addTeam, delTeam, delPartner, addPartner, delTesti, addTesti, addDeal, delDeal, addGallery, delGallery,
    saveAbout, saveNews, saveLegal, addPaymentMethod, updPay, rmPay, saveSettings, revokeDevice, exportData, resetData };
})();