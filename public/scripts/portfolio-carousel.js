document.querySelectorAll('[data-carousel]').forEach(carousel=>{
 const slides=[...carousel.querySelectorAll('[data-carousel-slide]')];
 const images=[...carousel.querySelectorAll('[data-carousel-image]')];
 const dots=[...carousel.querySelectorAll('[data-carousel-to]')];
 if(!slides.length||slides.length!==images.length)return;
 let active=0;
 function show(index){
  active=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>{slide.hidden=i!==active;images[i].hidden=i!==active;dots[i].setAttribute('aria-current',String(i===active));});
  carousel.querySelector('[data-carousel-status]').textContent=slides[active].getAttribute('aria-label');
 }
 carousel.querySelector('[data-carousel-prev]').addEventListener('click',()=>show(active-1));
 carousel.querySelector('[data-carousel-next]').addEventListener('click',()=>show(active+1));
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
 carousel.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey)return;
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
   event.preventDefault();
   const fromLink=event.target.closest('[data-carousel-image],.carousel-cta');
   show(active+(event.key==='ArrowRight'?1:-1));
   if(fromLink)dots[active].focus();
  }
 });
 carousel.querySelector('[data-carousel-controls]').hidden=slides.length<2;
 carousel.dataset.ready='true';
});
