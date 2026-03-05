const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = siteNav ? Array.from(siteNav.querySelectorAll('a')) : [];

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = Array.from(document.querySelectorAll('main section[id]'));

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
} else if (sections.length) {
  setActiveLink(sections[0].id);
}

const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const mailtoFallback = document.getElementById('mailto-fallback');

const showError = (input, message) => {
  const errorEl = document.getElementById(`${input.id}-error`);
  if (errorEl) {
    errorEl.textContent = message;
  }
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
};

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validateForm = () => {
  if (!form) return false;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  let isValid = true;

  if (!name.value.trim()) {
    showError(name, 'Please enter your name.');
    isValid = false;
  } else {
    showError(name, '');
  }

  if (!email.value.trim()) {
    showError(email, 'Please enter your email.');
    isValid = false;
  } else if (!validateEmail(email.value.trim())) {
    showError(email, 'Please enter a valid email address.');
    isValid = false;
  } else {
    showError(email, '');
  }

  if (!message.value.trim()) {
    showError(message, 'Please share a short message.');
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showError(message, 'Please add at least 10 characters.');
    isValid = false;
  } else {
    showError(message, '');
  }

  return isValid;
};

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm()) {
      success.textContent = '';
      mailtoFallback.textContent = '';
      return;
    }

    const nameValue = document.getElementById('name').value.trim();
  const emailValue = document.getElementById('email').value.trim();
    const messageValue = document.getElementById('message').value.trim();

    success.textContent = `Thanks, ${nameValue}. Your message is ready to send.`;

    const subject = encodeURIComponent(`New inquiry from ${nameValue}`);
  const body = encodeURIComponent(`Name: ${nameValue}\nEmail: ${emailValue}\n\n${messageValue}`);
    const mailtoHref = `mailto:malickarsalan@hotmail.com?subject=${subject}&body=${body}`;

    mailtoFallback.innerHTML = '';
    const fallbackLink = document.createElement('a');
    fallbackLink.href = mailtoHref;
  fallbackLink.textContent = 'Send via email';
  mailtoFallback.append('Prefer email? ', fallbackLink, '.');

    form.reset();
  });
}

const accordionItems = Array.from(document.querySelectorAll('[data-accordion] .accordion-item'));
accordionItems.forEach((item) => {
  const trigger = item.querySelector('.accordion-trigger');
  const panel = item.querySelector('.accordion-panel');
  if (!trigger || !panel) return;

  trigger.addEventListener('click', () => {
    const isOpen = item.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    } else {
      panel.style.maxHeight = '0px';
    }
  });
});
