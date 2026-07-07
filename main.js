const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

const updateNav = () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 30);
};

window.addEventListener('scroll', updateNav);
updateNav();

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

function revealInView(items) {
  return 'IntersectionObserver' in window && items.length > 0;
}

const reveals = document.querySelectorAll('.reveal');
if (revealInView(reveals)) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => revealObserver.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

/* Contact form: this is a static site with no backend, so submissions
   are sent via the visitor's own email client (mailto). If you later
   want messages delivered without opening an email app, wire this form
   up to a form-backend service such as Formspree instead. */
const CONTACT_EMAIL = 'epafravenance035@gmail.com';

const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim() || 'Portfolio contact form';
    const message = contactForm.message.value.trim();

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    if (contactMessage) {
      contactMessage.textContent = 'Opening your email app to send this message…';
      contactMessage.classList.add('visible');
    }
  });
}
