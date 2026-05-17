(function () {
  if (new URLSearchParams(window.location.search).get('app') !== '1') return;
  document.documentElement.classList.add('app-mode');
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('header.nav');
    if (nav) nav.style.display = 'none';
  });
})();
