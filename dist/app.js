const menuButton=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('#mobile-menu');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');mobileMenu.hidden=true;}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Open menu':'Close menu');mobileMenu.hidden=open;});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.matchMedia('(min-width:701px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{document.querySelector('.collection-grid').classList.toggle('is-filtered',button.dataset.filter!=='all');filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('[data-category]').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter);}));
const pieces={sarong:{title:'One Shoulder Sarong Dress',kicker:'ARTISANAL WEAR / ONE SHOULDER SARONG DRESS',image:'assets/sarong-dress.jpg',alt:'Pink one-shoulder batik sarong dress by Fusion14',description:'Pink batik, a knotted waist, and an easy one-shoulder drape.'},orchid:{title:'The Orchid Garden Edit',kicker:'BATIK IN BLOOM / THE ORCHID GARDEN EDIT',image:'assets/collection.jpg',alt:'Fusion14 Orchid Garden Edit in soft blue',description:'Floral batik in soft blue. Explore the Orchid Garden Edit.'},living:{title:'For your home',kicker:'SPACES & LIVING / EXPLORE IN STORE',image:'assets/batik-fashion.jpg',alt:'Colourful Fusion14 boutique with artisanal clothing and ceramics',description:'Ceramics, textiles, and interiors. Discover the current selection in store.'}};
const dialog=document.querySelector('#piece-dialog');
let lastTrigger;
document.querySelectorAll('[data-piece]').forEach(card=>card.addEventListener('click',()=>{const piece=pieces[card.dataset.piece];document.querySelector('#piece-title').textContent=piece.title;document.querySelector('#piece-kicker').textContent=piece.kicker;document.querySelector('#piece-description').textContent=piece.description;const img=document.querySelector('#piece-image');img.src=piece.image;img.alt=piece.alt;lastTrigger=card;dialog.showModal();document.body.classList.add('modal-open');}));
function closeDialog(){dialog.close();}
document.querySelector('.dialog-close').addEventListener('click',closeDialog);
document.querySelector('.dialog-continue').addEventListener('click',closeDialog);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastTrigger?.focus({preventScroll:true});});
document.querySelector('#year').textContent=new Date().getFullYear();
// Reveal content once, with a small stagger and a reduced-motion alternative.
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const targets=document.querySelectorAll('.section-heading,.collection-card,.craft-image,.craft-copy,.spaces-art,.spaces-copy,.social-top');
 document.documentElement.classList.add('motion-ready');
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});
 targets.forEach(target=>{target.classList.add('reveal');if(target.classList.contains('collection-card'))target.style.setProperty('--reveal-delay',`${Array.from(target.parentElement.children).indexOf(target)*90}ms`);revealObserver.observe(target);});
}
