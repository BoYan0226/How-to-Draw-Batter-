(() => {
  const pages = ['index.html', 'look.html', 'pencil.html', 'practice.html', 'hope.html'];
  const current = pages.indexOf(location.pathname.split('/').pop() || 'index.html');
  if (current < 0) return;
  let navigating = false;
  window.addEventListener('pageshow', () => {
    document.documentElement.classList.remove("page-leaving");
    navigating = false;
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function navigateTo(url) {
    if (navigating) return;
    navigating = true;
    if (reducedMotion.matches) {
      location.assign(url);
      return;
    }
    document.documentElement.classList.add('page-leaving');
    window.setTimeout(() => location.assign(url), 240);
  }

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.hash ||
        !pages.some(page => new URL(page, location.href).pathname === url.pathname)) return;
    event.preventDefault();
    if (url.pathname === location.pathname && url.search === location.search) return;
    navigateTo(url.href);
  });

})();
