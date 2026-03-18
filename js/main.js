/* ===================== NAV ===================== */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Set active nav link based on current page
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
})();

/* ===================== SERVICES TABS ===================== */
function initTabs() {
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('panel-' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  // Allow deep-linking via ?tab=workflow etc.
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  if (tabParam) {
    const target = document.querySelector(`.tab-btn[data-tab="${tabParam}"]`);
    if (target) target.click();
  }
}

/* ===================== CASE STUDY MODALS ===================== */
function initModals() {
  document.querySelectorAll('.case-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const modal = document.getElementById('modal-' + card.dataset.modal);
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeAllModals();
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

/* ===================== CASE FILTER ===================== */
function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.filter;

      document.querySelectorAll('.case-card').forEach(card => {
        if (type === 'all') {
          card.style.display = '';
        } else if (type === 'oisin') {
          card.style.display = card.dataset.person === 'oisin' ? '' : 'none';
        } else if (type === 'kat') {
          card.style.display = card.dataset.person === 'kat' ? '' : 'none';
        } else if (type === 'id') {
          card.style.display = card.dataset.type === 'id' ? '' : 'none';
        } else if (type === 'workflow') {
          card.style.display = card.dataset.type === 'workflow' ? '' : 'none';
        }
      });
    });
  });
}

/* ===================== CONTACT FORM ===================== */
function initContactForm() {
  const btn = document.getElementById('form-submit-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const confirm = document.getElementById('form-confirm');
    if (confirm) {
      confirm.style.display = 'block';
      setTimeout(() => confirm.style.display = 'none', 5000);
    }
  });
}

/* ===================== SCROLL FADE-INS ===================== */
function initScrollFades() {
  const els = document.querySelectorAll('.scroll-fade');
  if (!els.length || !('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-up');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
}

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initModals();
  initFilter();
  initContactForm();
  initScrollFades();
});
