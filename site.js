'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('open', expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
for (const anchor of document.querySelectorAll('[data-wa]')) {
  anchor.href = 'https://wa.me/6281276632200?text=' + encodeURIComponent(anchor.dataset.wa);
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
}
function openDialog(dialog) {
  dialog.showModal();
  document.body.classList.add('body-locked');
}
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('body-locked'));
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
}
document.querySelector('[data-open-trip]').addEventListener('click', () => openDialog(document.querySelector('#trip-dialog')));
document.querySelector('[data-open-policy]').addEventListener('click', () => openDialog(document.querySelector('#policy-dialog')));
const tripSummary = 'Noob Angler — rencana open trip Piayu Laut, Minggu 1 November 2026, 08.00–18.00 WIB. Harga publik Rp170.000/orang. Termasuk umpan hidup total 3 kg untuk bersama. Trip ini khusus laki-laki; pemula boleh ikut. Ketersediaan, titik kumpul, fasilitas, keselamatan, pembayaran, dan aturan pembatalan perlu konfirmasi admin. Kontak: +62 812-7663-2200 / @noobangler.batam. Belum merupakan booking terkonfirmasi.';
document.querySelector('#copy-trip').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard) throw new Error('Clipboard tidak tersedia');
    await navigator.clipboard.writeText(tripSummary);
    status.textContent = 'Ringkasan trip disalin. Silakan bagikan ke temanmu.';
  } catch {
    status.textContent = 'Salin otomatis tidak tersedia. Teks di bawah dapat kamu pilih dan salin manual.';
    let fallback = document.querySelector('#copy-fallback');
    if (!fallback) {
      fallback = document.createElement('textarea');
      fallback.id = 'copy-fallback';
      fallback.setAttribute('aria-label', 'Ringkasan trip untuk disalin manual');
      fallback.readOnly = true;
      fallback.style.cssText = 'width:100%;min-height:170px;padding:12px;font:13px/1.6 Arial;margin-top:12px';
      status.after(fallback);
    }
    fallback.value = tripSummary;
    fallback.focus();
    fallback.select();
  }
});

'use strict';
(() => {
  const carousel = document.querySelector('[data-merch-carousel]');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.merch-slide')];
  const selectors = [...carousel.querySelectorAll('[data-merch-goto]')];
  const toggle = carousel.querySelector('[data-merch-toggle]');
  const count = carousel.querySelector('[data-merch-count]');
  const timing = carousel.querySelector('[data-merch-timing]');
  const announcement = carousel.querySelector('[data-merch-announcement]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let userPaused = reducedMotion.matches;
  let hovered = false;
  let inView = false;
  let timer = null;
  function schedule() {
    window.clearTimeout(timer);
    timer = null;
    if (slides.length < 2 || userPaused || hovered || !inView || document.hidden) return;
    timer = window.setTimeout(() => show(current + 1, false), 10000);
  }
  function updatePlayback() {
    toggle.textContent = userPaused ? 'Putar otomatis' : 'Jeda';
    toggle.setAttribute('aria-label', userPaused ? 'Mulai pergantian merch setiap 10 detik' : 'Jeda pergantian merch');
    toggle.setAttribute('aria-pressed', String(!userPaused));
    timing.textContent = userPaused
      ? 'Slideshow dijeda. Pilih desain atau tekan Putar otomatis untuk melanjutkan.'
      : 'Berganti setiap 10 detik saat bagian ini terlihat. Arahkan kursor atau tekan Jeda untuk membaca.';
    schedule();
  }
  function show(index, manual) {
    current = (index + slides.length) % slides.length;
    if (manual) userPaused = true;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
    selectors.forEach((button, i) => {
      if (i === current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    if (manual) announcement.textContent = slides[current].getAttribute('aria-label');
    updatePlayback();
  }
  carousel.querySelector('[data-merch-prev]').addEventListener('click', () => show(current - 1, true));
  carousel.querySelector('[data-merch-next]').addEventListener('click', () => show(current + 1, true));
  selectors.forEach(button => button.addEventListener('click', () => show(Number(button.dataset.merchGoto), true)));
  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    updatePlayback();
  });
  const hoverArea = carousel.querySelector('.merch-viewport');
  hoverArea.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  hoverArea.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', event => {
    if (event.target !== toggle) {
      userPaused = true;
      updatePlayback();
    }
  });
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    // Do not hide a focused product link with keyboard navigation.
    if (event.target.closest('.merch-slide')) return;
    event.preventDefault();
    show(current + (event.key === 'ArrowRight' ? 1 : -1), true);
  });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { userPaused = true; updatePlayback(); }
  });
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    schedule();
  }, { threshold: 0 }).observe(carousel);
  show(0, false);
})();
