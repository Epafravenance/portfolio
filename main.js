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

const bars = document.querySelectorAll('.bar-fill');
if ('IntersectionObserver' in window && bars.length) {
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.getPropertyValue('--w');
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(bar => {
    bar.style.width = '0';
    barObserver.observe(bar);
  });
} else {
  bars.forEach(bar => {
    bar.style.width = bar.style.getPropertyValue('--w');
  });
}

function revealInView(items) {
  return 'IntersectionObserver' in window && items.length > 0;
}

const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    contactForm.reset();
    if (contactMessage) {
      contactMessage.textContent = 'Message sent! I will get back to you soon.';
      contactMessage.classList.add('visible');
    }
  });
}