(function () {
  if (new URLSearchParams(window.location.search).get('app') === '1') {
    var nav = document.querySelector('header.nav');
    if (nav) nav.style.display = 'none';
  }
})();
