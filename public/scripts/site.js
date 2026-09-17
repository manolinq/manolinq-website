document.documentElement.classList.add('js');
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('mainNav');
const setMenu = (open) => {
  nav.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.textContent = open ? 'Sluiten ×' : 'Menu +';
};
navToggle?.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    navToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (navToggle && !event.target.closest('.site-header')) setMenu(false);
});
window.matchMedia('(min-width: 701px)').addEventListener('change', () => navToggle && setMenu(false));
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
