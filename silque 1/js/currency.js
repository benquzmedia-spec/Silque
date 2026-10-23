/* Silque Tours — Currency */
window.SILQUE = window.SILQUE || {};
window.SILQUE.CURRENCY = (function(){
  let rates = {KES:1,USD:0.0077,EUR:0.0071,GBP:0.0061,ZAR:0.14,TZS:19.5,AED:0.028,CNY:0.056,JPY:1.17,INR:0.65,AUD:0.0118,CAD:0.0105};
  const list = [
    {code:'KES',flag:'🇰🇪',name:'Kenyan Shilling'},{code:'USD',flag:'🇺🇸',name:'US Dollar'},
    {code:'EUR',flag:'🇪🇺',name:'Euro'},{code:'GBP',flag:'🇬🇧',name:'British Pound'},
    {code:'ZAR',flag:'🇿🇦',name:'S. African Rand'},{code:'TZS',flag:'🇹🇿',name:'Tanzanian Shilling'},
    {code:'AED',flag:'🇦🇪',name:'UAE Dirham'},{code:'CNY',flag:'🇨🇳',name:'Chinese Yuan'},
    {code:'JPY',flag:'🇯🇵',name:'Japanese Yen'},{code:'INR',flag:'🇮🇳',name:'Indian Rupee'},
    {code:'AUD',flag:'🇦🇺',name:'Australian Dollar'},{code:'CAD',flag:'🇨🇦',name:'Canadian Dollar'}
  ];
  let state = {currency:'KES', rates};
  try { state.currency = localStorage.getItem('silqueCurr') || 'KES'; } catch(e){}

  function fmt(kes){
    if(state.currency==='KES') return 'KES ' + Number(kes).toLocaleString();
    const r = state.rates[state.currency] || 1, cv = kes * r;
    const sym = {USD:'$',EUR:'€',GBP:'£',JPY:'¥',INR:'₹',CNY:'¥'}[state.currency] || '';
    return sym + cv.toFixed(cv<10?2:0).replace(/\B(?=(\d{3})+(?!\d))/g,',') + (sym?'':' '+state.currency);
  }
  function refresh(){
    document.querySelectorAll('[data-price-kes]').forEach(el=>{ const k = parseInt(el.dataset.priceKes); if(!isNaN(k)) el.textContent = fmt(k); });
    const lbl = document.getElementById('currLabel'); if(lbl) lbl.textContent = state.currency;
    document.querySelectorAll('.curr-o').forEach(o=>o.classList.toggle('on', o.dataset.code===state.currency));
  }
  function set(code){ state.currency = code; try { localStorage.setItem('silqueCurr', code); } catch(e){} refresh(); }
  function init(){
    const grid = document.getElementById('currGrid'); if(!grid) return;
    grid.innerHTML = list.map(c=>'<div class="curr-o" data-code="'+c.code+'" onclick="Silque.setCurrency(\''+c.code+'\')"><span class="fl">'+c.flag+'</span><div class="cd">'+c.code+'</div><div class="nm">'+c.name+'</div></div>').join('');
    refresh();
    fetch('https://open.er-api.com/v6/latest/KES').then(r=>r.json()).then(d=>{ if(d && d.rates){ state.rates = d.rates; refresh(); } }).catch(()=>{});
  }
  return { fmt, refresh, set, get:()=>state.currency, init };
})();