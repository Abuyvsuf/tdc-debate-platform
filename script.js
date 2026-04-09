const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('siteNav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
});

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);
revelsSafeObserve();

function revelsSafeObserve() {
  if (!reveals.length) return;
  reveals.forEach((el) => revealObserver.observe(el));
}

const filtersWrap = document.getElementById('eventFilters');
if (filtersWrap) {
  const filterButtons = filtersWrap.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  filtersWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('.filter-btn');
    if (!btn) return;

    filterButtons.forEach((button) => button.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    eventCards.forEach((card) => {
      const tags = card.dataset.tags || '';
      card.style.display = filter === 'all' || tags.includes(filter) ? 'block' : 'none';
    });
  });
}

document.querySelectorAll('.tabs').forEach((tabWrap) => {
  const group = tabWrap.dataset.tabGroup;
  const buttons = tabWrap.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll(`.tab-panel[data-tab-group="${group}"]`);

  tabWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('.tab-btn');
    if (!btn) return;
    const tab = btn.dataset.tab;

    buttons.forEach((button) => button.classList.remove('active'));
    btn.classList.add('active');

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === tab);
    });

    if (group === 'contact-tabs') {
      const subjectInput = document.getElementById('subjectInput');
      if (subjectInput) subjectInput.value = `${tab.charAt(0).toUpperCase() + tab.slice(1)} Inquiry`;
    }
  });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    if (button) {
      button.textContent = 'Message Sent';
      button.disabled = true;
    }
  });
}
