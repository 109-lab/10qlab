// ヘッダー スクロール
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// ハンバーガー
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.classList.remove('open');
  navLinks.classList.remove('open');
}));

// スクロールリビール
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// フォーム（Formspree）
const form = document.getElementById('contactForm');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('.c-submit');
  btn.textContent = '送信中...';
  btn.disabled = true;

  const res = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });

  if (res.ok) {
    btn.textContent = '送信しました！';
    btn.classList.add('sent');
    form.reset();
  } else {
    btn.textContent = '送信に失敗しました。再度お試しください。';
    btn.disabled = false;
  }
});
