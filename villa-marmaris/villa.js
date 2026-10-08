/* Demo: Marmaris Villaları — Dil (TR/EN), WhatsApp linkleri, galeri */
(function () {
  var PHONE = '905303400236'; // Canlı sitede villa sahibinin numarası gelir
  var lang = 'tr';

  // ---- WhatsApp: villaya ve dile göre hazır mesaj ----
  function waText(villa) {
    if (lang === 'en') return villa ? 'Hello, I would like to ask about availability for ' + villa + '. Dates: ... Guests: ...' : 'Hello, I would like to ask about villa availability. Dates: ... Guests: ...';
    return villa ? 'Merhaba, ' + villa + ' için müsaitlik sormak istiyorum. Tarihler: ... Kişi sayısı: ...' : 'Merhaba, villalarınız için müsaitlik sormak istiyorum. Tarihler: ... Kişi sayısı: ...';
  }
  function updateWa() {
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      a.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(waText(a.getAttribute('data-wa')));
    });
  }

  // ---- Dil değiştirme ----
  function setLang(next) {
    lang = next;
    document.documentElement.lang = next;
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.hasAttribute('data-tr')) el.setAttribute('data-tr', el.innerHTML);
      el.innerHTML = el.getAttribute(next === 'en' ? 'data-en' : 'data-tr');
    });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === next ? 'true' : 'false');
    });
    updateWa();
    try { localStorage.setItem('villa-lang', next); } catch (e) {}
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  var start = new URLSearchParams(location.search).get('lang');
  if (!start) { try { start = localStorage.getItem('villa-lang'); } catch (e) {} }
  if (!start && (navigator.language || '').slice(0, 2) !== 'tr') start = 'en';
  setLang(start === 'en' ? 'en' : 'tr');

  // ---- Galeri (lightbox) ----
  var lb = document.querySelector('.lb');
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('.cap');
  var items = [], pos = 0, lastFocus = null;
  function show() {
    lbImg.src = items[pos].src;
    lbImg.alt = items[pos].alt;
    lbCap.textContent = items[pos].alt + '  ·  ' + (pos + 1) + ' / ' + items.length;
  }
  function open(card, i) {
    items = [].map.call(card.querySelectorAll('.shots img'), function (img) { return { src: img.src, alt: img.alt }; });
    pos = i || 0;
    lastFocus = document.activeElement;
    show();
    lb.classList.add('open');
    lb.querySelector('.x').focus();
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function step(d) { pos = (pos + d + items.length) % items.length; show(); }
  document.querySelectorAll('.villa').forEach(function (card) {
    card.querySelectorAll('.shots button').forEach(function (b) {
      b.addEventListener('click', function () { open(card, +b.getAttribute('data-i')); });
    });
    var g = card.querySelector('[data-open]');
    if (g) g.addEventListener('click', function () { open(card, 0); });
  });
  lb.querySelector('.x').addEventListener('click', close);
  lb.querySelector('.prev').addEventListener('click', function () { step(-1); });
  lb.querySelector('.next').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  // Mobil: kaydırarak geçiş
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    x0 = null;
  });

  // ---- Görünür oldukça yumuşak giriş ----
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
})();
