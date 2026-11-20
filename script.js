// Mobile drawer navigation with focus management and inert background
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#mobile-nav');

if (toggle && navigation) {
  const links = [...navigation.querySelectorAll('a')];
  const background = document.querySelectorAll('.site-stage');

  function setNavigation(open, restoreFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.hidden = !open;
    document.body.classList.toggle('nav-open', open);
    background.forEach(element => { element.inert = open; });
    if (open && links[0]) links[0].focus();
    else if (restoreFocus) toggle.focus();
  }

  toggle.hidden = false;
  toggle.addEventListener('click', () => setNavigation(navigation.hidden));
  navigation.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    setNavigation(false);
    if (link.hash) {
      const destination = document.getElementById(link.hash.slice(1));
      if (destination) {
        destination.tabIndex = -1;
        destination.focus({ preventScroll: true });
      }
    }
  });
  document.addEventListener('keydown', event => {
    if (navigation.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setNavigation(false, true);
    } else if (event.key === 'Tab') {
      const sequence = [toggle, ...links];
      const index = sequence.indexOf(document.activeElement);
      const step = event.shiftKey ? -1 : 1;
      event.preventDefault();
      sequence[(index + step + sequence.length) % sequence.length].focus();
    }
  });
  matchMedia('(min-width: 901px)').addEventListener('change', event => {
    if (event.matches && !navigation.hidden) setNavigation(false);
  });
}

// Year stamp
document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = String(new Date().getFullYear());
});

// Active section scroll-spy on desktop index rail
const railLinks = [...document.querySelectorAll('.rail-link[data-nav]')];
if (railLinks.length && 'IntersectionObserver' in window) {
  const sections = railLinks
    .map(link => ({ link, id: link.dataset.nav, el: document.getElementById(link.dataset.nav) }))
    .filter(item => item.el);

  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const activeId = visible.target.id;
    railLinks.forEach(link => {
      link.classList.toggle('is-active', link.dataset.nav === activeId);
    });
  }, { rootMargin: '-18% 0px -55% 0px', threshold: [0.1, 0.4] });

  sections.forEach(item => {
    if (item.id !== 'top') observer.observe(item.el);
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY < 140) {
      railLinks.forEach(link => link.classList.toggle('is-active', link.dataset.nav === 'top'));
    }
  }, { passive: true });
}

// Interactive Archive Box Stack drawer switcher
const BOX_META = {
  aster: {
    title: 'ASTER COFFEE',
    meta: 'STUDIO CONCEPT · LIVE WEBSITE & QR MENU',
    strip: 'is-brick'
  },
  menu: {
    title: 'DIGITAL MENU · ₹2,999',
    meta: 'UP TO 30 ITEMS · ₹50 PER EXTRA ITEM · TABLE QR',
    strip: 'is-forest'
  },
  website: {
    title: 'BUSINESS WEBSITE · ₹7,999+',
    meta: 'CUSTOM RESPONSIVE SITE · GALLERY · MAP & WHATSAPP',
    strip: 'is-steel'
  },
  qr: {
    title: 'TABLETOP QR DEMO',
    meta: 'ONE SCAN TO THE ASTER COFFEE PHONE MENU',
    strip: 'is-brick'
  }
};

const drawer = document.getElementById('archive-drawer');
const boxTabs = [...document.querySelectorAll('.stack-box[data-box]')];
const drawerPanels = [...document.querySelectorAll('.drawer-panel[data-panel]')];
const drawerTitle = document.querySelector('[data-drawer-title]');
const drawerMeta = document.querySelector('[data-drawer-meta]');
const drawerStrip = document.querySelector('[data-drawer-strip]');
let switchTimer = null;

function openArchiveBox(boxKey, scrollToDrawer = false) {
  if (!drawer || !BOX_META[boxKey]) return;
  const current = drawer.dataset.activeBox;

  boxTabs.forEach(tab => {
    const active = tab.dataset.box === boxKey;
    tab.setAttribute('aria-selected', String(active));
    tab.classList.toggle('is-selected', active);
  });

  const activeTab = boxTabs.find(tab => tab.dataset.box === boxKey);
  if (activeTab) drawer.setAttribute('aria-labelledby', activeTab.id);

  if (scrollToDrawer && window.innerWidth <= 1120) {
    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (current === boxKey) return;

  const meta = BOX_META[boxKey];
  const applyPanel = () => {
    drawer.dataset.activeBox = boxKey;
    drawerPanels.forEach(panel => {
      const match = panel.dataset.panel === boxKey;
      panel.hidden = !match;
      panel.classList.toggle('is-active', match);
    });
    if (drawerTitle) drawerTitle.textContent = meta.title;
    if (drawerMeta) drawerMeta.textContent = meta.meta;
    if (drawerStrip) {
      drawerStrip.className = 'colorway-strip ' + meta.strip;
    }
    drawer.classList.remove('is-switching');
  };

  clearTimeout(switchTimer);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyPanel();
    return;
  }

  drawer.classList.add('is-switching');
  switchTimer = setTimeout(applyPanel, 150);
}

boxTabs.forEach(tab => {
  tab.addEventListener('click', () => openArchiveBox(tab.dataset.box));
});

document.querySelectorAll('[data-open-box]').forEach(btn => {
  btn.addEventListener('click', () => openArchiveBox(btn.dataset.openBox, true));
});

// Synchronized Digital Menu item-count price calculator (Hero Drawer + Pricing Box)
const BASE_MENU_PRICE = 2999;
const BASE_MENU_ITEMS = 30;
const EXTRA_ITEM_PRICE = 50;
let currentMenuCount = 30;

function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function updateMenuEstimate(rawCount) {
  const count = Math.max(1, Math.min(200, Math.round(Number(rawCount) || BASE_MENU_ITEMS)));
  currentMenuCount = count;
  const extra = Math.max(0, count - BASE_MENU_ITEMS);
  const total = BASE_MENU_PRICE + extra * EXTRA_ITEM_PRICE;
  const formatted = formatINR(total);

  const heroPrice = document.querySelector('[data-hero-price]');
  const heroBreakdown = document.querySelector('[data-hero-breakdown]');
  const calcDisplay = document.querySelector('[data-calc-display]');
  const calcNote = document.querySelector('[data-calc-note]');
  const calcInput = document.getElementById('menu-items-input');

  if (heroPrice) heroPrice.textContent = formatted;
  if (calcDisplay) calcDisplay.textContent = formatted;
  if (calcInput && document.activeElement !== calcInput) calcInput.value = String(count);

  const breakdownText = extra > 0
    ? `${count} items = ₹2,999 base (30 items) + ${extra} extra × ₹50 (${formatINR(extra * EXTRA_ITEM_PRICE)}). Custom domain extra.`
    : `${count} items included in base package (₹2,999, covers up to 30 items). Custom domain extra.`;

  if (heroBreakdown) heroBreakdown.textContent = breakdownText;
  if (calcNote) calcNote.textContent = breakdownText;

  document.querySelectorAll('.size-chip[data-size]').forEach(chip => {
    const match = Number(chip.dataset.size) === count;
    chip.classList.toggle('is-selected', match);
    chip.setAttribute('aria-pressed', String(match));
  });

  document.querySelectorAll('.preset-chip[data-preset]').forEach(chip => {
    const match = Number(chip.dataset.preset) === count;
    chip.classList.toggle('is-selected', match);
    chip.setAttribute('aria-pressed', String(match));
  });
}

document.querySelectorAll('.size-chip[data-size]').forEach(chip => {
  chip.addEventListener('click', () => updateMenuEstimate(chip.dataset.size));
});

document.querySelectorAll('.preset-chip[data-preset]').forEach(chip => {
  chip.addEventListener('click', () => updateMenuEstimate(chip.dataset.preset));
});

document.querySelectorAll('.step-btn[data-step]').forEach(btn => {
  btn.addEventListener('click', () => updateMenuEstimate(currentMenuCount + Number(btn.dataset.step)));
});

const menuInput = document.getElementById('menu-items-input');
if (menuInput) {
  menuInput.addEventListener('input', () => {
    if (menuInput.value !== '') updateMenuEstimate(menuInput.value);
  });
  menuInput.addEventListener('blur', () => updateMenuEstimate(menuInput.value));
}

// Package comparison anchor auto-open
const comparison = document.getElementById('compare');
if (comparison) {
  function openLinkedComparison() {
    if (location.hash === '#compare') comparison.open = true;
  }
  openLinkedComparison();
  window.addEventListener('hashchange', openLinkedComparison);
  document.querySelectorAll('a[href="#compare"]').forEach(link => {
    link.addEventListener('click', () => {
      comparison.open = true;
      comparison.querySelector('summary').focus({ preventScroll: true });
    });
  });
}

// Pre-select service when clicking package CTAs
const serviceSelect = document.getElementById('service');
const detailsField = document.getElementById('details');
if (serviceSelect) {
  document.querySelectorAll('[data-service]').forEach(link => {
    link.hash = 'enquiry-form';
    link.addEventListener('click', () => {
      if (serviceSelect.matches(':disabled')) return;
      serviceSelect.value = link.dataset.service;
      serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
      if (link.dataset.service === 'digital-menu' && currentMenuCount !== 30 && detailsField && !detailsField.value.trim()) {
        const extra = Math.max(0, currentMenuCount - BASE_MENU_ITEMS);
        const total = BASE_MENU_PRICE + extra * EXTRA_ITEM_PRICE;
        detailsField.value = `We’re looking for a digital QR menu with roughly ${currentMenuCount} items (estimated ${formatINR(total)}). `;
      }
    });
  });
}

// Google Apps Script + WhatsApp fallback enquiry submission (preserved from Madeform)
function isGoogleScriptEndpoint(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'script.google.com' && !url.port && !url.username && !url.password && !url.search && !url.hash && /^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url.pathname);
  } catch { return false; }
}

function isGoogleAcknowledgementOrigin(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.port && (
      url.hostname === 'script.google.com' || url.hostname === 'script.googleusercontent.com' ||
      url.hostname.endsWith('-script.googleusercontent.com') || url.hostname.endsWith('.script.googleusercontent.com')
    );
  } catch { return false; }
}

function submitToGoogleSheets(endpoint, payload, timeoutMs = 45000) {
  return new Promise((resolve, reject) => {
    if (!isGoogleScriptEndpoint(endpoint)) {
      reject(new Error('Online enquiries are temporarily unavailable. Please send your details on WhatsApp.'));
      return;
    }
    if (!/^https?:$/.test(location.protocol) || location.origin === 'null') {
      reject(new Error('Please open the live website to send this enquiry, or continue on WhatsApp.'));
      return;
    }
    if (new URLSearchParams(payload).toString().length > 20000) {
      reject(new Error('Your enquiry is too long to send. Please shorten the project details.'));
      return;
    }
    const frame = document.createElement('iframe');
    const submission = document.createElement('form');
    frame.name = 'madeform-enquiry-' + payload.requestId;
    frame.title = 'Secure enquiry submission';
    frame.className = 'enquiry-transport';
    frame.hidden = true;
    frame.tabIndex = -1;
    frame.setAttribute('aria-hidden', 'true');
    submission.action = endpoint;
    submission.method = 'POST';
    submission.enctype = 'application/x-www-form-urlencoded';
    submission.target = frame.name;
    submission.className = 'enquiry-transport';
    submission.hidden = true;
    for (const [name, value] of Object.entries(payload)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      submission.appendChild(input);
    }
    let settled = false;
    let timer;
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener('message', acknowledge);
      submission.remove();
      frame.remove();
    };
    const finish = (error) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (error) reject(error); else resolve({ ok: true });
    };
    const acknowledge = event => {
      const data = event.data;
      if (!isGoogleAcknowledgementOrigin(event.origin) || !data || typeof data !== 'object' ||
          data.type !== 'madeform:enquiry' || data.requestId !== payload.requestId) return;
      if (data.ok === true) finish();
      else if (data.ok === false) finish(new Error(typeof data.error === 'string' ? data.error : 'Your enquiry could not be saved. Please try again.'));
    };
    window.addEventListener('message', acknowledge);
    frame.addEventListener('error', () => finish(new Error('We couldn’t connect. Please try again, or continue on WhatsApp.')));
    timer = setTimeout(() => {
      const error = new Error('We couldn’t confirm your enquiry. It may have reached us — retrying will not save a duplicate. You can also confirm on WhatsApp.');
      error.name = 'TimeoutError';
      finish(error);
    }, timeoutMs);
    document.body.appendChild(frame);
    document.body.appendChild(submission);
    try { submission.submit(); } catch { finish(new Error('We couldn’t send your enquiry. Please try again, or continue on WhatsApp.')); }
  });
}

function whatsappDraft(data, serviceLabel) {
  const message = [
    'Hi Madeform, I’d like to discuss a project.',
    '',
    'Name: ' + data.name.trim(),
    'Business: ' + data.businessName.trim(),
    'Email: ' + data.email.trim(),
    'Service: ' + serviceLabel,
    '',
    data.details.trim()
  ].join('\n');
  const link = document.createElement('a');
  link.href = 'https://wa.me/916301438905?text=' + encodeURIComponent(message);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Open WhatsApp draft';
  return link;
}

const form = document.getElementById('enquiry-form');
if (form) {
  const endpoint = window.MADEFORM_CONFIG?.appsScriptUrl || '';
  const useSheets = isGoogleScriptEndpoint(endpoint) && /^https?:$/.test(location.protocol);
  const submit = document.getElementById('submit-enquiry');
  const label = submit.querySelector('.button-label');
  const fields = form.querySelector('fieldset');
  const status = document.getElementById('form-status');
  const intro = document.getElementById('form-intro');
  let previousAttempt = null;

  label.textContent = useSheets ? 'Send your enquiry' : 'Continue on WhatsApp';
  intro.textContent = useSheets
    ? 'All fields are required. We’ll reply to your enquiry by email.'
    : 'All fields are required. You’ll review your details in WhatsApp before sending.';
  form.hidden = false;

  function clearStatus() {
    status.replaceChildren();
    delete status.dataset.state;
  }

  form.addEventListener('input', event => {
    event.target.setCustomValidity?.('');
    clearStatus();
  });
  serviceSelect.addEventListener('change', clearStatus);

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled) return;

    const data = Object.fromEntries(new FormData(form));
    const controls = form.elements;
    if (data.name.trim().length < 2) controls.namedItem('name').setCustomValidity('Enter a name with at least two characters.');
    if (!data.businessName.trim()) controls.namedItem('businessName').setCustomValidity('Enter your business name.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email.trim())) controls.namedItem('email').setCustomValidity('Enter a complete email address, such as you@example.com.');
    if (data.details.trim().length < 20) controls.namedItem('details').setCustomValidity('Tell us a little more, using at least 20 characters.');
    if (!form.reportValidity() || data.website) return;

    const serviceLabel = serviceSelect.selectedOptions[0].textContent;
    clearStatus();
    if (!useSheets) {
      const draft = whatsappDraft(data, serviceLabel);
      status.dataset.state = 'draft';
      status.append('Your draft is ready to review. ', draft);
      draft.click();
      return;
    }

    const signature = JSON.stringify(data);
    if (!previousAttempt || previousAttempt.signature !== signature) {
      const bytes = crypto.getRandomValues(new Uint8Array(16));
      const requestId = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
      previousAttempt = { signature, requestId };
    }
    submit.disabled = true;
    fields.disabled = true;
    label.textContent = 'Sending your enquiry…';
    form.setAttribute('aria-busy', 'true');
    try {
      await submitToGoogleSheets(endpoint, { ...data, requestId: previousAttempt.requestId, sourceOrigin: location.origin });
      form.reset();
      previousAttempt = null;
      status.dataset.state = 'success';
      status.textContent = 'Thank you. Madeform has received your enquiry and will reply by email.';
    } catch (error) {
      status.dataset.state = 'error';
      status.append((error.message || 'Your enquiry could not be saved. Please try again.') + ' ', whatsappDraft(data, serviceLabel));
    } finally {
      fields.disabled = false;
      submit.disabled = false;
      label.textContent = 'Send your enquiry';
      form.removeAttribute('aria-busy');
      status.focus({ preventScroll: true });
    }
  });
}
