const IMG={
 fish:'https://images.pexels.com/photos/15934197/pexels-photo-15934197.jpeg?cs=srgb&dl=pexels-blue-15934197.jpg&fm=jpg',
 prawns:'https://images.pexels.com/photos/2714384/pexels-photo-2714384.jpeg?cs=srgb&dl=pexels-nc-farm-bureau-mark-2714384.jpg&fm=jpg',
 seafood:'https://images.pexels.com/photos/3903587/pexels-photo-3903587.jpeg?cs=srgb&dl=pexels-markus-winkler-1430818-3903587.jpg&fm=jpg',
 market:'https://images.pexels.com/photos/11119097/pexels-photo-11119097.jpeg?cs=srgb&dl=pexels-nareshmandal46-11119097.jpg&fm=jpg',
 mixed:'https://images.pexels.com/photos/20811000/pexels-photo-20811000.jpeg?cs=srgb&dl=pexels-change-c-c-974768353-20811000.jpg&fm=jpg'
};
const products=[
 {id:1,name:'Indian Mackerel',price:220,unit:'/kg',cat:'Fresh Fish',image:IMG.fish},
 {id:2,name:'Prawns (Medium)',price:450,unit:'/kg',cat:'Prawns',image:IMG.prawns},
 {id:3,name:'Crab (Live)',price:600,unit:'/kg',cat:'Crab',image:IMG.mixed},
 {id:4,name:'Seer Fish',price:420,unit:'/kg',cat:'Seer Fish',image:IMG.seafood},
 {id:5,name:'Vanjaram',price:480,unit:'/kg',cat:'Vanjaram',image:IMG.market},
 {id:6,name:'Fish Combo Pack',price:999,unit:'/pack',cat:'Combo Packs',image:IMG.seafood}
];
const categories=[['Fresh Fish',IMG.fish],['Prawns',IMG.prawns],['Crab',IMG.mixed],['Seer Fish',IMG.seafood],['Vanjaram',IMG.market],['Combo Packs',IMG.seafood]];
let cart=[]; const $=s=>document.querySelector(s);
function renderCategories(){ $('#categoryGrid').innerHTML=categories.map(([name,image])=>`<article class="category-card"><div class="category-image"><img src="${image}" alt="${name}"></div><h3>${name}</h3><a href="#shop" data-cat="${name}">View All <b>→</b></a></article>`).join(''); document.querySelectorAll('[data-cat]').forEach(a=>a.onclick=()=>filterProducts(a.dataset.cat)); }
function renderProducts(list=products){ $('#productGrid').innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><button class="fav" aria-label="Favorite">♡</button><img src="${p.image}" alt="${p.name}"></div><div class="product-info"><h3>${p.name}</h3><div><span class="price">₹ ${p.price.toLocaleString('en-IN')}</span> <span class="unit">${p.unit}</span></div><button class="add" onclick="addToCart(${p.id})">🛒 Add to Cart</button></div></article>`).join(''); }
function filterProducts(cat){renderProducts(products.filter(p=>p.cat===cat));document.getElementById('shop').scrollIntoView({behavior:'smooth'});}
window.addToCart=id=>{const p=products.find(x=>x.id===id),found=cart.find(x=>x.id===id);found?found.qty++:cart.push({...p,qty:1});updateCart();openCart();};
function updateCart(){ $('#cartCount').textContent=cart.reduce((s,p)=>s+p.qty,0);const box=$('#cartItems');if(!cart.length){box.innerHTML='<p class="empty">Your cart is empty.</p>';$('#cartTotal').textContent='₹0';return;}box.innerHTML=cart.map(p=>`<div class="cart-row"><img class="cart-thumb" src="${p.image}" alt=""><div><h4>${p.name}</h4><small>₹${p.price.toLocaleString('en-IN')} × ${p.qty}</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${p.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><strong>₹${(p.price*p.qty).toLocaleString('en-IN')}</strong></div>`).join('');const total=cart.reduce((s,p)=>s+p.price*p.qty,0);$('#cartTotal').textContent='₹'+total.toLocaleString('en-IN');}
window.changeQty=(id,d)=>{const p=cart.find(x=>x.id===id);if(!p)return;p.qty+=d;if(p.qty<=0)cart=cart.filter(x=>x.id!==id);updateCart();};
function openCart(){$('#cartDrawer').classList.add('open');$('#overlay').classList.add('show')}function closeCart(){$('#cartDrawer').classList.remove('open');$('#overlay').classList.remove('show')}
$('#cartBtn').onclick=openCart;$('#closeCart').onclick=closeCart;$('#overlay').onclick=closeCart;
$('#checkoutBtn').onclick=()=>{if(!cart.length)return alert('Please add a product first.');const lines=cart.map(p=>`${p.name} x ${p.qty} = ₹${p.price*p.qty}`).join('%0A');const total=cart.reduce((s,p)=>s+p.price*p.qty,0);window.open(`https://wa.me/919445823174?text=Hello%20Chennai%20Fresh%20Catch,%20I%20want%20to%20order:%0A${lines}%0ATotal:%20₹${total}`,'_blank');};
$('#menuToggle').onclick=()=>$('#mainNav').classList.toggle('open');
$('#searchBtn').onclick=()=>{$('#searchModal').classList.add('show');$('#searchInput').focus()};$('#closeSearch').onclick=()=>$('#searchModal').classList.remove('show');$('#searchModal').onclick=e=>{if(e.target.id==='searchModal')e.currentTarget.classList.remove('show')};
$('#searchInput').oninput=e=>{const q=e.target.value.toLowerCase().trim(),r=$('#searchResults');if(!q){r.innerHTML='';return}const hits=products.filter(p=>(p.name+' '+p.cat).toLowerCase().includes(q));r.innerHTML=hits.length?hits.map(p=>`<div class="result" onclick="addToCart(${p.id});document.getElementById('searchModal').classList.remove('show')"><strong>${p.name}</strong><span>${p.cat} · ₹${p.price}/kg</span></div>`).join(''):'<div class="no-result">No matching products found.</div>';};
renderCategories();renderProducts();updateCart();
