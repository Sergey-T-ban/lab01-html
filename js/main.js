document.addEventListener('DOMContentLoaded', init);

function init() {
  initActiveNav();
  initThemeToggle();
  initBackToTop();
  initContactForm();
}

// === 1. АКТИВНЕ МЕНЮ ===
function initActiveNav() {
  const links = document.querySelectorAll('nav a');
  const path = window.location.pathname;

  links.forEach(link => {
    if (path.includes(link.getAttribute('href'))) {
      link.classList.add('is-active');
    }
  });
}

// === 2. ТЕМНА ТЕМА ===
function initThemeToggle() {
  const btn = document.querySelector('.theme-toggle');
  const body = document.body;

  if (!btn) return;

  const saved = localStorage.getItem('siteTheme');
  if (saved === 'dark') {
    body.classList.add('theme-dark');
  }

  btn.addEventListener('click', () => {
    body.classList.toggle('theme-dark');

    const theme = body.classList.contains('theme-dark') ? 'dark' : 'light';
    localStorage.setItem('siteTheme', theme);
  });
}

// === 3. КНОПКА ВГОРУ ===
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < 200;
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === 4. ФОРМА ===
function initContactForm() {
  const form = document.querySelector('form');
  if (!form) return;

  const message = document.querySelector('#message');
  const counter = document.createElement('p');
  message?.after(counter);

  // ЛІЧИЛЬНИК
  message?.addEventListener('input', () => {
    counter.textContent = `Символів: ${message.value.length}`;
  });

  // ЧЕРНЕТКА
  const draftKey = 'contactDraft';

  function saveDraft() {
    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());
    localStorage.setItem(draftKey, JSON.stringify(obj));
  }

  function loadDraft() {
    const data = JSON.parse(localStorage.getItem(draftKey) || '{}');

    Object.entries(data).forEach(([key, value]) => {
      const field = form.elements[key];
      if (field) field.value = value;
    });
  }

  loadDraft();
  form.addEventListener('input', saveDraft);

  // ВАЛІДАЦІЯ + SUBMIT
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();

    let errors = [];

    if (name.length < 2) errors.push('Імʼя занадто коротке');
    if (!email.includes('@')) errors.push('Невірний email');
    if (!msg) errors.push('Повідомлення пусте');

    let result = document.querySelector('.form-result');
    if (!result) {
      result = document.createElement('div');
      result.className = 'form-result';
      form.after(result);
    }

    if (errors.length) {
      result.textContent = errors.join(', ');
      result.style.color = 'red';
      return;
    }

    // УСПІХ
    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());

    result.textContent = 'Успішно відправлено: ' + JSON.stringify(obj);
    result.style.color = 'green';

    localStorage.removeItem(draftKey);
    form.reset();
  });
}

function initMenuToggle() {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');

    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
  });
}

function initAccordion() {
  const items = document.querySelectorAll('.accordion-header');

  items.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.classList.toggle('open');
    });
  });
}

