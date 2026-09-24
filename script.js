(function(){
  "use strict";

  /* ===================== CONFIG ===================== */
  const SHOP = {
    name: "Chennai Fresh Catch",
    location: "Saidapet Market, Chennai",
    phone: "94458 23174",
    upiId: "chennaifreshcatch@upi" // TODO: replace with the shop's real UPI ID before going live
  };
  const CURRENCY = "₹";
  const STORAGE_MENU = "cfc_menu_v2";
  const STORAGE_ORDERS = "cfc_orders_v2";
  const STORAGE_BILLNO = "cfc_billno_v2";

  const CATEGORIES = [
    { key: "Chicken", icon: "🐔" },
    { key: "Mutton", icon: "🐐" },
    { key: "Sea Fish", icon: "🐟" },
    { key: "Fresh Water Fish", icon: "🐠" },
    { key: "Prawns", icon: "🦐" },
    { key: "Crabs", icon: "🦀" },
    { key: "Squids", icon: "🦑" },
    { key: "Special Meat", icon: "🍗" }
  ];

  const CATEGORY_FALLBACK = {
    "Chicken": "https://images.pexels.com/photos/13376576/pexels-photo-13376576.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Mutton": "https://images.pexels.com/photos/26244103/pexels-photo-26244103.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Sea Fish": "https://images.pexels.com/photos/8352009/pexels-photo-8352009.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Fresh Water Fish": "https://images.pexels.com/photos/8352786/pexels-photo-8352786.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Crabs": "https://images.pexels.com/photos/3806139/pexels-photo-3806139.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Prawns": "https://images.pexels.com/photos/2714384/pexels-photo-2714384.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Squids": "https://images.pexels.com/photos/30648997/pexels-photo-30648997.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Special Meat": "https://images.pexels.com/photos/5847715/pexels-photo-5847715.jpeg?auto=compress&cs=tinysrgb&w=600"
  };

  const DEFAULT_MENU = [
    /* ---------- CHICKEN ---------- */
    { id: "c1", name: "Chicken Curry Cut with Skin", desc: "Bone-in curry cut, skin on", category: "Chicken", price: 169, unit: "500g",
      image: "https://images.pexels.com/photos/13376576/pexels-photo-13376576.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "c2", name: "Chicken Curry Cut without Skin", desc: "Skinless curry cut, ready to cook", category: "Chicken", price: 179, originalPrice: 199, unit: "kg",
      image: "https://images.pexels.com/photos/7140318/pexels-photo-7140318.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "c3", name: "Chicken Liver", desc: "Nutritious source of iron & protein", category: "Chicken", price: 60, unit: "250g",
      image: "https://images.pexels.com/photos/13422436/pexels-photo-13422436.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "c4", name: "Chicken Strips", desc: "Boneless strips, ready to marinate", category: "Chicken", price: 249, originalPrice: 299, unit: "500g",
      image: "https://images.pexels.com/photos/6107735/pexels-photo-6107735.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "c5", name: "Chicken Cubes", desc: "Fresh diced boneless cubes", category: "Chicken", price: 249, originalPrice: 299, unit: "500g",
      image: "https://images.pexels.com/photos/12197308/pexels-photo-12197308.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "c6", name: "Chicken Breast Fillets", desc: "Lean boneless breast fillets", category: "Chicken", price: 249, originalPrice: 299, unit: "500g",
      image: "https://images.pexels.com/photos/6107726/pexels-photo-6107726.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "c7", name: "Chicken Wings", desc: "Juicy whole wings", category: "Chicken", price: 159, originalPrice: 189, unit: "500g",
      image: "https://images.pexels.com/photos/7140306/pexels-photo-7140306.jpeg?auto=compress&cs=tinysrgb&w=600" },

    /* ---------- MUTTON ---------- */
    { id: "mu1", name: "Mutton Brain", desc: "Rich source of protein", category: "Mutton", price: 299, unit: "piece",
      image: "https://images.pexels.com/photos/26244103/pexels-photo-26244103.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "mu2", name: "Mutton Liver Chunks", desc: "Fresh cleaned liver chunks", category: "Mutton", price: 249, unit: "500g",
      image: "https://images.pexels.com/photos/26244103/pexels-photo-26244103.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "mu3", name: "Mutton Botti (Tripe & Intestine)", desc: "Cleaned, ready to cook", category: "Mutton", price: 399, unit: "kg",
      image: "https://images.pexels.com/photos/26244103/pexels-photo-26244103.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "mu4", name: "Mutton Paaya (Leg)", desc: "Traditional trotters for paya", category: "Mutton", price: 399, unit: "kg",
      image: "https://images.pexels.com/photos/26244103/pexels-photo-26244103.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "mu5", name: "Mutton Spleen (Suvarotti)", desc: "Fresh cleaned spleen", category: "Mutton", price: 399, unit: "kg",
      image: "https://images.pexels.com/photos/26244103/pexels-photo-26244103.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "mu6", name: "Mutton Kapura (Aatu Kottai)", desc: "Succulent, juicy, tasty cut", category: "Mutton", price: 249, unit: "250g",
      image: "https://images.pexels.com/photos/31732110/pexels-photo-31732110.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "mu7", name: "Mutton Kidney", desc: "Fresh cleaned kidney", category: "Mutton", price: 299, unit: "250g",
      image: "https://images.pexels.com/photos/31732110/pexels-photo-31732110.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "mu8", name: "Mutton Chops", desc: "Bone-in chops, curry or grill", category: "Mutton", price: 499, unit: "500g",
      image: "https://images.pexels.com/photos/31732110/pexels-photo-31732110.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "mu9", name: "Mutton Curry Cut", desc: "Classic bone-in curry cut", category: "Mutton", price: 499, unit: "500g",
      image: "https://images.pexels.com/photos/26244103/pexels-photo-26244103.jpeg?auto=compress&cs=tinysrgb&w=600" },

    /* ---------- SEA FISH ---------- */
    { id: "sf1", name: "Pomfret (Vavval)", desc: "High in Omega-3 fatty acids", category: "Sea Fish", price: 599, originalPrice: 799, unit: "500g",
      image: "https://images.pexels.com/photos/8352009/pexels-photo-8352009.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf2", name: "Tuna (Kora)", desc: "Especially abundant in Omega-3", category: "Sea Fish", price: 499, originalPrice: 599, unit: "kg",
      image: "https://images.pexels.com/photos/5532880/pexels-photo-5532880.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf3", name: "Seer Fish / Vanjaram", desc: "Firm, boneless steaks", category: "Sea Fish", price: 1199, originalPrice: 1300, unit: "kg",
      image: "https://images.pexels.com/photos/8351649/pexels-photo-8351649.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf4", name: "Anchovy Fish (Nethili)", desc: "Rich in poly-unsaturated fatty acids", category: "Sea Fish", price: 499, unit: "kg",
      image: "https://images.pexels.com/photos/3650159/pexels-photo-3650159.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf5", name: "Barracuda (Sheela/Ooli)", desc: "Firm white fish, great for frying", category: "Sea Fish", price: 550, unit: "kg",
      image: "https://images.pexels.com/photos/14879227/pexels-photo-14879227.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf6", name: "Ray Fish (Thirukkai)", desc: "Mild flavour, firm texture", category: "Sea Fish", price: 299, unit: "kg",
      image: "https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf7", name: "Red Snapper (Sangara Meen)", desc: "Popular for curry & fry", category: "Sea Fish", price: 499, unit: "kg",
      image: "https://images.pexels.com/photos/61153/fish-fischer-ocean-market-61153.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf8", name: "Ayala / Bangda (Mackerel)", desc: "Classic mackerel for fry", category: "Sea Fish", price: 399, unit: "kg",
      image: "https://images.pexels.com/photos/14879226/pexels-photo-14879226.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf9", name: "Emperor Fish (Vilai Meen)", desc: "Firm textured white fish", category: "Sea Fish", price: 599, unit: "kg",
      image: "https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf10", name: "Sardine (Mathi)", desc: "Small, healthy & flavourful", category: "Sea Fish", price: 299, unit: "kg",
      image: "https://images.pexels.com/photos/6148977/pexels-photo-6148977.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf11", name: "Leatherjacket Fish (Kilathi)", desc: "Good source of lean protein", category: "Sea Fish", price: 499, unit: "kg",
      image: "https://images.pexels.com/photos/8352050/pexels-photo-8352050.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf12", name: "Silver Belly Fish (Karapodi)", desc: "Small silvery fish, great for fry", category: "Sea Fish", price: 249, unit: "kg",
      image: "https://images.pexels.com/photos/15553656/pexels-photo-15553656.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf13", name: "Cobia Fish (Kadal Viral)", desc: "Healthy fish, rich flavour", category: "Sea Fish", price: 599, unit: "kg",
      image: "https://images.pexels.com/photos/2042564/pexels-photo-2042564.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf14", name: "Kilanga Meen (Lady Fish)", desc: "Soft-boned, easy to cook", category: "Sea Fish", price: 599, unit: "kg",
      image: "https://images.pexels.com/photos/8352344/pexels-photo-8352344.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf15", name: "Seabass (Koduva Meen)", desc: "Fat content makes it extra tasty", category: "Sea Fish", price: 799, unit: "kg",
      image: "https://images.pexels.com/photos/20234945/pexels-photo-20234945.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sf16", name: "Indian Salmon (Salmon Meen)", desc: "Great source of protein", category: "Sea Fish", price: 899, unit: "kg",
      image: "https://images.pexels.com/photos/18072772/pexels-photo-18072772.jpeg?auto=compress&cs=tinysrgb&w=600" },

    /* ---------- FRESH WATER FISH ---------- */
    { id: "fw1", name: "Rohu Catla (Kendai Meen)", desc: "Popular freshwater curry fish", category: "Fresh Water Fish", price: 299, unit: "kg",
      image: "https://images.pexels.com/photos/10039794/pexels-photo-10039794.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "fw2", name: "Ayirai Fish", desc: "Native freshwater delicacy", category: "Fresh Water Fish", price: 3499, unit: "kg",
      image: "https://images.pexels.com/photos/3650159/pexels-photo-3650159.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "fw3", name: "Jilebi Fish (Tilapia)", desc: "Mild, versatile freshwater fish", category: "Fresh Water Fish", price: 299, unit: "kg",
      image: "https://images.pexels.com/photos/8352786/pexels-photo-8352786.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "fw4", name: "Roopchand Fish", desc: "Omega-3 rich flat fish", category: "Fresh Water Fish", price: 299, unit: "kg",
      image: "https://images.pexels.com/photos/8352009/pexels-photo-8352009.jpeg?auto=compress&cs=tinysrgb&w=600" },

    /* ---------- PRAWNS ---------- */
    { id: "pr1", name: "Freshwater Prawn Medium", desc: "Sweet, tender medium prawns", category: "Prawns", price: 480, unit: "kg",
      image: "https://images.pexels.com/photos/2714384/pexels-photo-2714384.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "pr2", name: "Kal Iral Prawns", desc: "Classic local variety", category: "Prawns", price: 499, unit: "kg",
      image: "https://images.pexels.com/photos/2714384/pexels-photo-2714384.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "pr3", name: "Sea White Prawn Medium", desc: "Fresh sea-caught, medium size", category: "Prawns", price: 650, unit: "kg",
      image: "https://images.pexels.com/photos/2714384/pexels-photo-2714384.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "pr4", name: "White Prawn (Vellai Iral)", desc: "High levels of Omega-3", category: "Prawns", price: 699, unit: "kg",
      image: "https://images.pexels.com/photos/2714384/pexels-photo-2714384.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "pr5", name: "Black Tiger Prawn (Puli Iral)", desc: "Large, meaty tiger prawns", category: "Prawns", price: 699, unit: "kg",
      image: "https://images.pexels.com/photos/2714384/pexels-photo-2714384.jpeg?auto=compress&cs=tinysrgb&w=600" },

    /* ---------- CRABS ---------- */
    { id: "cr1", name: "Big 3-Spot Crab", desc: "Medium size, meaty crab", category: "Crabs", price: 499, unit: "kg",
      image: "https://images.pexels.com/photos/3806139/pexels-photo-3806139.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "cr2", name: "Mud Crab (Kazhi Nandu)", desc: "Premium mud crab, extra meaty", category: "Crabs", price: 899, unit: "kg",
      image: "https://images.pexels.com/photos/3806139/pexels-photo-3806139.jpeg?auto=compress&cs=tinysrgb&w=600" },

    /* ---------- SQUIDS ---------- */
    { id: "sq1", name: "Squid (Kanava)", desc: "Rich in protein like any seafood", category: "Squids", price: 499, unit: "kg",
      image: "https://images.pexels.com/photos/30648997/pexels-photo-30648997.jpeg?auto=compress&cs=tinysrgb&w=600" },

    /* ---------- SPECIAL MEAT ---------- */
    { id: "sp1", name: "Rabbit Meat (Muyal Kari)", desc: "Excellent lean, low-fat meat", category: "Special Meat", price: 1199, unit: "kg",
      image: "https://images.pexels.com/photos/24973403/pexels-photo-24973403.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sp2", name: "Quail / Kaadai (Pack of 4)", desc: "Many health benefits", category: "Special Meat", price: 299, unit: "pack",
      image: "https://images.pexels.com/photos/7140318/pexels-photo-7140318.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "sp3", name: "Turkey (Vaan Kozhi)", desc: "Lean meat, high in protein", category: "Special Meat", price: 899, unit: "kg",
      image: "https://images.pexels.com/photos/5847715/pexels-photo-5847715.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ];

  /* ===================== STATE ===================== */
  let menu = loadMenu();
  let cart = []; // [{id,name,price,unit,qty}]
  let currentCategory = null;

  function loadMenu(){
    try{
      const raw = localStorage.getItem(STORAGE_MENU);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    localStorage.setItem(STORAGE_MENU, JSON.stringify(DEFAULT_MENU));
    return JSON.parse(JSON.stringify(DEFAULT_MENU));
  }
  function saveMenu(){ localStorage.setItem(STORAGE_MENU, JSON.stringify(menu)); }

  function loadOrders(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_ORDERS)) || []; }catch(e){ return []; }
  }
  function saveOrders(orders){ localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders)); }

  function nextBillNo(){
    let n = parseInt(localStorage.getItem(STORAGE_BILLNO) || "1000", 10);
    n += 1;
    localStorage.setItem(STORAGE_BILLNO, String(n));
    return n;
  }

  function fmt(n){ return CURRENCY + Number(n).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}); }
  function uid(){ return 'id' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

  /* ===================== ELEMENTS ===================== */
  const el = (id) => document.getElementById(id);
  const catTileGrid = el('catTileGrid');
  const catHome = el('catHome');
  const catDetail = el('catDetail');
  const itemList = el('itemList');
  const catDetailTitle = el('catDetailTitle');
  const cartLines = el('cartLines');
  const cartBadge = el('cartBadge');
  const cartSubtotal = el('cartSubtotal');
  const cartTotal = el('cartTotal');
  const cartPanel = el('cartPanel');
  const cartOverlay = el('cartOverlay');
  const mobileCartBar = el('mobileCartBar');
  const mobileCartText = el('mobileCartText');
  const toastEl = el('toast');

  /* ===================== VIEW SWITCHING (Billing/Menu/Report) ===================== */
  function showView(name){
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    el('view-' + name).classList.remove('hidden');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.view === name));
    document.querySelectorAll('.bn-btn').forEach(b => b.classList.toggle('active', b.dataset.view === name));
    if(name === 'menu') renderManageTable();
    if(name === 'report') renderReport();
  }
  document.querySelectorAll('.tab-btn, .bn-btn').forEach(btn=>{
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  /* ===================== TOAST ===================== */
  let toastTimer;
  function showToast(msg){
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> toastEl.classList.remove('show'), 1600);
  }

  /* ===================== CATEGORY HOME ===================== */
  function renderCategoryTiles(){
    catTileGrid.innerHTML = CATEGORIES.map(c=>{
      const count = menu.filter(m=>m.category===c.key).length;
      return `
        <button class="cat-tile" data-cat="${c.key}">
          <span class="icon">${c.icon}</span>
          <span class="name">${c.key}</span>
          <span class="count">${count} item${count!==1?'s':''}</span>
        </button>
      `;
    }).join('');
  }
  catTileGrid.addEventListener('click', (e)=>{
    const tile = e.target.closest('.cat-tile');
    if(!tile) return;
    openCategory(tile.dataset.cat);
  });

  function openCategory(cat){
    currentCategory = cat;
    catDetailTitle.textContent = cat;
    catHome.classList.add('hidden');
    catDetail.classList.remove('hidden');
    renderItemList();
  }
  el('catBackBtn').addEventListener('click', ()=>{
    currentCategory = null;
    catDetail.classList.add('hidden');
    catHome.classList.remove('hidden');
    renderCategoryTiles();
  });

  /* ===================== ITEM LIST (list rows) ===================== */
  function renderItemList(){
    const items = menu.filter(m=>m.category===currentCategory);
    if(items.length === 0){
      itemList.innerHTML = '<p class="empty-msg">No items in this category yet. Add some from Manage Menu.</p>';
      return;
    }
    itemList.innerHTML = items.map(item=>{
      const line = cart.find(c=>c.id===item.id);
      const addControl = line
        ? `<div class="add-btn in-cart" data-id="${item.id}">
             <button class="qty-minus" aria-label="Decrease">−</button>
             <span class="qty-num">${line.qty}</span>
             <button class="qty-plus" aria-label="Increase">+</button>
           </div>`
        : `<button class="add-btn" data-id="${item.id}" aria-label="Add">+</button>`;
      return `
        <div class="list-row">
          <img class="list-thumb" src="${item.image}" alt="${item.name}" loading="lazy"
               onerror="this.src='${CATEGORY_FALLBACK[item.category] || CATEGORY_FALLBACK['Sea Fish']}'">
          <div class="list-info">
            <div class="list-name">${item.name}</div>
            <div class="list-desc">${item.desc || ''}</div>
            <div class="list-price">
              <span class="price-now">${fmt(item.price)} <span style="color:var(--text-faint);font-weight:400;">/${item.unit}</span></span>
              ${item.originalPrice ? `<span class="price-was">${fmt(item.originalPrice)}</span>` : ''}
            </div>
          </div>
          ${addControl}
        </div>
      `;
    }).join('');
  }

  itemList.addEventListener('click', (e)=>{
    const plainAdd = e.target.closest('.add-btn:not(.in-cart)');
    if(plainAdd){
      const item = menu.find(m=>m.id===plainAdd.dataset.id);
      if(item) addToCart(item);
      return;
    }
    const stepper = e.target.closest('.add-btn.in-cart');
    if(stepper){
      const id = stepper.dataset.id;
      if(e.target.classList.contains('qty-plus')) changeQty(id, 1);
      else if(e.target.classList.contains('qty-minus')) changeQty(id, -1);
    }
  });

  /* ===================== CART LOGIC ===================== */
  function addToCart(item){
    const line = cart.find(c => c.id === item.id);
    if(line){ line.qty += 1; }
    else{ cart.push({ id:item.id, name:item.name, price:item.price, unit:item.unit, qty:1 }); }
    renderCart();
    renderItemList();
    showToast(`${item.name} added to bill`);
  }

  function changeQty(id, delta){
    const line = cart.find(c=>c.id===id);
    if(!line) return;
    line.qty += delta;
    if(line.qty <= 0){ cart = cart.filter(c=>c.id!==id); }
    renderCart();
    renderItemList();
  }

  function removeLine(id){
    cart = cart.filter(c=>c.id!==id);
    renderCart();
    renderItemList();
  }

  function cartTotalValue(){
    return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  }

  function renderCart(){
    const totalItems = cart.reduce((s,c)=>s+c.qty,0);
    if(totalItems > 0){
      cartBadge.textContent = totalItems;
      cartBadge.classList.remove('hidden');
    } else {
      cartBadge.classList.add('hidden');
    }
    mobileCartText.textContent = `${totalItems} item${totalItems!==1?'s':''} · ${fmt(cartTotalValue())}`;
    mobileCartBar.classList.toggle('hidden', totalItems === 0);

    if(cart.length === 0){
      cartLines.innerHTML = '<p class="empty-msg">Tap any item to add it to the bill.</p>';
    } else {
      cartLines.innerHTML = cart.map(c => `
        <div class="cart-line" data-id="${c.id}">
          <div>
            <div class="cl-name">${c.name}</div>
            <div class="cl-sub">${fmt(c.price)} / ${c.unit}</div>
          </div>
          <div class="qty-stepper">
            <button class="qty-minus" aria-label="Decrease">−</button>
            <span>${c.qty}</span>
            <button class="qty-plus" aria-label="Increase">+</button>
          </div>
          <div style="text-align:right;">
            <div class="cl-linetotal">${fmt(c.price * c.qty)}</div>
            <button class="cl-remove" aria-label="Remove">🗑</button>
          </div>
        </div>
      `).join('');
    }
    const total = cartTotalValue();
    cartSubtotal.textContent = fmt(total);
    cartTotal.textContent = fmt(total);
  }

  cartLines.addEventListener('click', (e)=>{
    const lineEl = e.target.closest('.cart-line');
    if(!lineEl) return;
    const id = lineEl.dataset.id;
    if(e.target.classList.contains('qty-plus')) changeQty(id, 1);
    else if(e.target.classList.contains('qty-minus')) changeQty(id, -1);
    else if(e.target.classList.contains('cl-remove')) removeLine(id);
  });

  el('clearCartBtn').addEventListener('click', ()=>{
    if(cart.length === 0) return;
    if(confirm('Clear the entire cart?')){
      cart = [];
      renderCart();
      renderItemList();
      showToast('Cart cleared');
    }
  });

  /* ---- cart drawer open/close ---- */
  function openCart(){
    cartPanel.classList.add('open');
    cartOverlay.classList.remove('hidden');
  }
  function closeCart(){
    cartPanel.classList.remove('open');
    cartOverlay.classList.add('hidden');
  }
  el('cartTriggerBtn').addEventListener('click', openCart);
  mobileCartBar.addEventListener('click', openCart);
  el('cartCloseBtn').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  /* ===================== PAY NOW / QR ===================== */
  el('payNowBtn').addEventListener('click', ()=>{
    if(cart.length === 0){ showToast('Add items to the bill first'); return; }
    const total = cartTotalValue();
    el('payAmount').textContent = fmt(total);
    const upiString = `upi://pay?pa=${encodeURIComponent(SHOP.upiId)}&pn=${encodeURIComponent(SHOP.name)}&am=${total.toFixed(2)}&cu=INR`;
    el('qrImage').src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiString)}`;
    el('payModalOverlay').classList.remove('hidden');
  });
  el('payModalClose').addEventListener('click', ()=> el('payModalOverlay').classList.add('hidden'));
  el('cancelPayBtn').addEventListener('click', ()=> el('payModalOverlay').classList.add('hidden'));

  el('confirmPayBtn').addEventListener('click', ()=>{
    const total = cartTotalValue();
    const billNo = nextBillNo();
    const order = {
      id: uid(),
      billNo,
      date: new Date().toISOString(),
      items: cart.map(c=>({name:c.name, price:c.price, unit:c.unit, qty:c.qty})),
      total
    };
    const orders = loadOrders();
    orders.push(order);
    saveOrders(orders);

    el('payModalOverlay').classList.add('hidden');
    buildReceipt(order);
    el('receiptOverlay').classList.remove('hidden');

    cart = [];
    renderCart();
    renderItemList();
    closeCart();
    showToast('Payment recorded. Bill ready!');
  });

  /* ===================== RECEIPT / PRINT ===================== */
  function buildReceipt(order){
    const d = new Date(order.date);
    const dateStr = d.toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'});
    const timeStr = d.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'});
    el('receiptContent').innerHTML = `
      <div class="r-head">
        <h2>${SHOP.name}</h2>
        <p>${SHOP.location} · ${SHOP.phone}</p>
      </div>
      <div class="r-meta">
        <span>Bill #${order.billNo}</span>
        <span>${dateStr}, ${timeStr}</span>
      </div>
      ${order.items.map(it => `
        <div class="r-line">
          <span class="rl-name">${it.name} x${it.qty} (${it.unit})</span>
          <span>${fmt(it.price * it.qty)}</span>
        </div>
      `).join('')}
      <div class="r-divider"></div>
      <div class="r-total"><span>TOTAL</span><span>${fmt(order.total)}</span></div>
      <div class="r-footer">Thank you! Visit again 🙏</div>
    `;
  }
  el('receiptClose').addEventListener('click', ()=> el('receiptOverlay').classList.add('hidden'));
  el('receiptDoneBtn').addEventListener('click', ()=> el('receiptOverlay').classList.add('hidden'));
  el('printBtn').addEventListener('click', ()=> window.print());

  /* ===================== MANAGE MENU (CRUD) ===================== */
  const itemModalOverlay = el('itemModalOverlay');
  const itemForm = el('itemForm');

  function renderManageTable(){
    const body = el('manageTableBody');
    body.innerHTML = menu.map(item => `
      <tr data-id="${item.id}">
        <td><img src="${item.image}" alt="${item.name}"
             onerror="this.src='${CATEGORY_FALLBACK[item.category] || CATEGORY_FALLBACK['Sea Fish']}'"></td>
        <td>${item.name}</td>
        <td><span class="cat-pill">${item.category}</span></td>
        <td>${fmt(item.price)}${item.originalPrice ? ` <span style="text-decoration:line-through;color:var(--text-faint);">${fmt(item.originalPrice)}</span>` : ''}</td>
        <td>${item.unit}</td>
        <td>
          <div class="row-actions">
            <button class="edit">Edit</button>
            <button class="del">Delete</button>
          </div>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted);">No items yet — add your first one!</td></tr>';
  }

  el('manageTableBody').addEventListener('click', (e)=>{
    const row = e.target.closest('tr');
    if(!row) return;
    const id = row.dataset.id;
    const item = menu.find(m=>m.id===id);
    if(e.target.classList.contains('edit')) openItemModal(item);
    else if(e.target.classList.contains('del')){
      if(confirm(`Delete "${item.name}" from the menu?`)){
        menu = menu.filter(m=>m.id!==id);
        saveMenu();
        renderManageTable();
        renderCategoryTiles();
        if(currentCategory) renderItemList();
        showToast('Item deleted');
      }
    }
  });

  el('addItemBtn').addEventListener('click', ()=> openItemModal(null));

  function openItemModal(item){
    el('itemModalTitle').textContent = item ? 'Edit Item' : 'Add Item';
    el('itemId').value = item ? item.id : '';
    el('itemName').value = item ? item.name : '';
    el('itemDesc').value = item ? (item.desc || '') : '';
    el('itemCategory').value = item ? item.category : 'Chicken';
    el('itemPrice').value = item ? item.price : '';
    el('itemOriginalPrice').value = item && item.originalPrice ? item.originalPrice : '';
    el('itemUnit').value = item ? item.unit : 'kg';
    el('itemImage').value = item ? item.image : '';
    updateImgPreview();
    el('itemDeleteBtn').style.display = item ? 'inline-block' : 'none';
    itemModalOverlay.classList.remove('hidden');
  }
  function closeItemModal(){ itemModalOverlay.classList.add('hidden'); }
  el('itemModalClose').addEventListener('click', closeItemModal);
  itemModalOverlay.addEventListener('click', (e)=>{ if(e.target === itemModalOverlay) closeItemModal(); });

  function updateImgPreview(){
    const url = el('itemImage').value.trim();
    const prev = el('itemImgPreview');
    if(url){ prev.src = url; prev.classList.remove('hidden'); }
    else{ prev.classList.add('hidden'); }
  }
  el('itemImage').addEventListener('input', updateImgPreview);

  itemForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const id = el('itemId').value || uid();
    const category = el('itemCategory').value;
    const origPriceVal = parseFloat(el('itemOriginalPrice').value);
    const data = {
      id,
      name: el('itemName').value.trim(),
      desc: el('itemDesc').value.trim(),
      category,
      price: parseFloat(el('itemPrice').value) || 0,
      unit: el('itemUnit').value,
      image: el('itemImage').value.trim() || CATEGORY_FALLBACK[category]
    };
    if(!isNaN(origPriceVal) && origPriceVal > data.price) data.originalPrice = origPriceVal;
    const idx = menu.findIndex(m=>m.id===id);
    if(idx > -1) menu[idx] = data; else menu.push(data);
    saveMenu();
    renderManageTable();
    renderCategoryTiles();
    if(currentCategory) renderItemList();
    closeItemModal();
    showToast(idx > -1 ? 'Item updated' : 'Item added');
  });

  el('itemDeleteBtn').addEventListener('click', ()=>{
    const id = el('itemId').value;
    const item = menu.find(m=>m.id===id);
    if(item && confirm(`Delete "${item.name}"?`)){
      menu = menu.filter(m=>m.id!==id);
      saveMenu();
      renderManageTable();
      renderCategoryTiles();
      if(currentCategory) renderItemList();
      closeItemModal();
      showToast('Item deleted');
    }
  });

  /* ===================== SALES REPORT ===================== */
  function currentMonthStr(){
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
  }
  el('reportMonth').value = currentMonthStr();
  el('reportMonth').addEventListener('change', renderReport);

  function renderReport(){
    const monthVal = el('reportMonth').value || currentMonthStr();
    const [year, month] = monthVal.split('-').map(Number);
    const orders = loadOrders().filter(o=>{
      const d = new Date(o.date);
      return d.getFullYear() === year && (d.getMonth()+1) === month;
    }).sort((a,b)=> new Date(b.date) - new Date(a.date));

    const totalSales = orders.reduce((s,o)=>s+o.total,0);
    const orderCount = orders.length;
    const avg = orderCount ? totalSales / orderCount : 0;

    const itemTotals = {};
    orders.forEach(o => o.items.forEach(it=>{
      itemTotals[it.name] = (itemTotals[it.name]||0) + it.qty;
    }));
    let topItem = '—', topQty = 0;
    Object.entries(itemTotals).forEach(([name,qty])=>{ if(qty>topQty){topQty=qty;topItem=name;} });

    el('statTotalSales').textContent = fmt(totalSales);
    el('statOrders').textContent = orderCount;
    el('statAvg').textContent = fmt(avg);
    el('statTop').textContent = topItem;

    const daysInMonth = new Date(year, month, 0).getDate();
    const dailyTotals = new Array(daysInMonth+1).fill(0);
    orders.forEach(o=>{
      const day = new Date(o.date).getDate();
      dailyTotals[day] += o.total;
    });
    const maxVal = Math.max(...dailyTotals, 1);
    const chart = el('dailyChart');
    chart.innerHTML = '';
    for(let day=1; day<=daysInMonth; day++){
      const val = dailyTotals[day];
      const col = document.createElement('div');
      col.className = 'bar-col';
      col.title = `${day}: ${fmt(val)}`;
      col.innerHTML = `<div class="bar" style="height:${Math.max((val/maxVal)*100,2)}%"></div><div class="bar-day">${day}</div>`;
      chart.appendChild(col);
    }

    const body = el('ordersTableBody');
    const emptyMsg = el('ordersEmptyMsg');
    if(orders.length === 0){
      body.innerHTML = '';
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = 'none';
      body.innerHTML = orders.map(o=>{
        const d = new Date(o.date);
        const dateStr = d.toLocaleDateString('en-IN', {day:'2-digit',month:'short'}) + ', ' + d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
        const itemsSummary = o.items.map(it=>`${it.name} x${it.qty}`).join(', ');
        return `<tr><td>${dateStr}</td><td>#${o.billNo}</td><td>${itemsSummary}</td><td>${fmt(o.total)}</td></tr>`;
      }).join('');
    }
  }

  /* ===================== INIT ===================== */
  renderCategoryTiles();
  renderCart();
  showView('billing');
})();
