const dataElement=document.getElementById('manolinq-assistant-data');
const root=document.querySelector('[data-assistant-root]');
if(dataElement&&root){
 const config=JSON.parse(dataElement.textContent);
 const launcher=root.querySelector('[data-assistant-launcher]');
 const panel=root.querySelector('[data-assistant-panel]');
 const content=root.querySelector('[data-assistant-content]');
 const backButton=root.querySelector('[data-assistant-back]');
 const nudge=root.querySelector('[data-assistant-nudge]');
 const mobileCta=document.querySelector('[data-mobile-cta]');
 const history=[];
 let current='start';
 let nudgeHandled=false;
 let ctaRequested=false;
 let footerVisible=false;
 let formVisible=false;
 let keyboardOpen=false;
 const initialViewportHeight=window.visualViewport?.height||window.innerHeight;

 const linkAttributes=action=>action.external?' target="_blank" rel="noopener noreferrer"':'';
 const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 function render(stepId,{push=true}={}){
  const step=config.steps[stepId];
  if(!step)return;
  if(push&&stepId!==current)history.push(current);
  current=stepId;
  const options=(step.options||[]).map(option=>`<button type="button" data-next="${escape(option.next)}">${escape(option.label)}<span aria-hidden="true">→</span></button>`).join('');
  const actions=(step.actions||[]).map(action=>action.href?`<a class="${action.primary?'is-primary':''}" href="${escape(action.href)}"${linkAttributes(action)}>${escape(action.label)}<span aria-hidden="true">↗</span></a>`:`<button type="button" class="${action.primary?'is-primary':''}" data-next="${escape(action.next)}">${escape(action.label)}<span aria-hidden="true">→</span></button>`).join('');
  const projects=step.projectList?config.projects.map(project=>`<article><div><strong>${escape(project.title)}</strong><span>${escape(project.category)}</span></div><a href="${escape(project.url)}" target="_blank" rel="noopener noreferrer">Bekijk project <span aria-hidden="true">↗</span></a></article>`).join(''):'';
  const contentHeading=stepId==='start'?'':`<h2 tabindex="-1">${escape(step.title)}</h2>`;
  content.innerHTML=`<div class="assistant-step">${contentHeading}${step.text?`<p>${escape(step.text)}</p>`:''}${step.bullets?`<ul>${step.bullets.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>`:''}${step.prompt?`<p class="assistant-prompt">${escape(step.prompt)}</p>`:''}${options?`<div class="assistant-options">${options}</div>`:''}${actions?`<div class="assistant-actions">${actions}</div>`:''}${projects?`<div class="assistant-projects">${projects}</div>`:''}</div>`;
  backButton.disabled=!history.length;
  content.scrollTop=0;
  if(panel.hidden===false)(content.querySelector('h2')||panel.querySelector('#assistant-heading')).focus({preventScroll:true});
 }
 function setOpen(open){
  panel.hidden=!open;
  launcher.setAttribute('aria-expanded',String(open));
  document.body.classList.toggle('assistant-open',open);
  updateObstruction();
  hideNudge();
  updateMobileCta();
  if(open){panel.querySelector('#assistant-heading').focus({preventScroll:true});}
  else launcher.focus({preventScroll:true});
 }
 function hideNudge(){nudge.hidden=true;nudgeHandled=true;}
 function updateObstruction(){
  const obstructed=(footerVisible||formVisible)&&panel.hidden;
  root.classList.toggle('is-obstructing-content',obstructed);
  if(obstructed)nudge.hidden=true;
 }
 function showNudge(){if(!nudgeHandled&&panel.hidden&&!document.hidden&&(mobileCta?.hidden??true))nudge.hidden=false;}
 function updateMobileCta(){
  if(!mobileCta||!config.mobileCtaEnabled)return;
  const visible=ctaRequested&&!footerVisible&&!keyboardOpen&&panel.hidden&&mobileCta.dataset.contactPage!=='true'&&matchMedia('(max-width: 700px)').matches;
  mobileCta.hidden=!visible;
  document.body.classList.toggle('mobile-cta-visible',visible);
  if(visible)nudge.hidden=true;
 }
 root.addEventListener('click',event=>{
  const next=event.target.closest('[data-next]');
  if(next){render(next.dataset.next);return;}
  if(event.target.closest('[data-assistant-launcher],[data-assistant-nudge-open]'))setOpen(panel.hidden);
  if(event.target.closest('[data-assistant-close]'))setOpen(false);
  if(event.target.closest('[data-assistant-back]')&&history.length){const previous=history.pop();render(previous,{push:false});}
  if(event.target.closest('[data-assistant-restart]')){history.length=0;current='start';render('start',{push:false});}
  if(event.target.closest('[data-assistant-nudge-close]'))hideNudge();
 });
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!panel.hidden){setOpen(false);return;}
  if(event.key!=='Tab'||panel.hidden)return;
  const focusable=[...panel.querySelectorAll('button:not([disabled]),a[href]')].filter(element=>element.getClientRects().length);
  if(!focusable.length)return;
  const first=focusable[0],last=focusable.at(-1),active=document.activeElement;
  if(event.shiftKey&&(active===first||!focusable.includes(active))){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&active===last){event.preventDefault();first.focus();}
 });
 const requestCta=()=>{
  ctaRequested=scrollY>=Math.min(innerHeight*.9,700);
  updateMobileCta();
  if(!nudgeHandled&&scrollY>=Math.max(innerHeight*.75,500))showNudge();
 };
 addEventListener('scroll',requestCta,{passive:true});
 addEventListener('resize',updateMobileCta);
 if(window.visualViewport)window.visualViewport.addEventListener('resize',()=>{keyboardOpen=window.visualViewport.height<initialViewportHeight-140;updateMobileCta();});
 const footer=document.querySelector('.site-footer');
 if(footer)new IntersectionObserver(entries=>{footerVisible=entries[0].isIntersecting;updateMobileCta();updateObstruction();},{threshold:.08}).observe(footer);
 const form=document.querySelector('.form-card');
 if(form)new IntersectionObserver(entries=>{formVisible=entries[0].isIntersecting;updateObstruction();},{threshold:.15}).observe(form);
 setTimeout(showNudge,30000);
 if(config.assistantEnabled){root.hidden=false;render('start',{push:false});}
 if(config.mobileCtaEnabled&&mobileCta)requestCta();
}
