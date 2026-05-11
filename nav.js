(function () {
  const header    = document.getElementById('site-header');
  const btn       = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-menu');
  if (!header || !btn || !mobileNav) return;

  function positionDrawer() {
    mobileNav.style.top = header.offsetHeight + 'px';
  }
  function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !mobileNav.classList.contains('open');
    btn.classList.toggle('open', isOpen);
    mobileNav.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  btn.addEventListener('click', () => toggleMenu());
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  document.addEventListener('click', e => {
    if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !btn.contains(e.target))
      toggleMenu(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) { toggleMenu(false); btn.focus(); }
  });

  positionDrawer();
  window.addEventListener('resize', () => {
    positionDrawer();
    if (window.innerWidth > 860) toggleMenu(false);
  });
})();
