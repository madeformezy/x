function appendArrow(element) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon-svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M5 19 19 5M5 5h14v14');
  svg.appendChild(path);
  element.appendChild(svg);
}
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#mobile-nav');
function closeNavigation(restoreFocus = false) {
  if (!toggle || !navigation) return;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  navigation.hidden = true;
  document.body.classList.remove('nav-open');
  if (restoreFocus) toggle.focus();
}
if (toggle && navigation) {
  toggle.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
    navigation.hidden = !opening;
    document.body.classList.toggle('nav-open', opening);
    if (opening) navigation.querySelector('a')?.focus();
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeNavigation(); });
  document.addEventListener('keydown', event => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { event.preventDefault(); closeNavigation(true); }
    if (event.key === 'Tab') {
      const links = [...navigation.querySelectorAll('a')];
      const first = links[0], last = links.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); toggle.focus(); }
      else if (event.shiftKey && document.activeElement === toggle) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.focus(); }
      else if (!event.shiftKey && document.activeElement === toggle) { event.preventDefault(); first.focus(); }
    }
  });
  matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeNavigation(); });
}
document.querySelectorAll('[data-year]').forEach(element => { element.textContent = String(new Date().getFullYear()); });
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = document.querySelector('#service');
    if (service) { service.value = link.dataset.service; service.dispatchEvent(new Event('change')); }
  });
});
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
      if (error) reject(error); else resolve({ok: true});
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
const form = document.querySelector('#enquiry-form');
if (form) {
  let previousAttempt = null;
  form.addEventListener('input', event => event.target.removeAttribute('aria-invalid'));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type=submit]');
    if (button.disabled) return;
    const status = document.querySelector('#form-status');
    const data = Object.fromEntries(new FormData(form));
    const signature = JSON.stringify(data);
    if (!previousAttempt || previousAttempt.signature !== signature) {
      const bytes = crypto.getRandomValues(new Uint8Array(16));
      previousAttempt = {signature, requestId: Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('')};
    }
    form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
    button.disabled = true;
    button.textContent = 'Sending your enquiry…';
    status.textContent = '';
    status.removeAttribute('data-state');
    form.setAttribute('aria-busy', 'true');
    try {
      const endpoint = window.MADEFORM_CONFIG?.appsScriptUrl || '';
      await submitToGoogleSheets(endpoint, {...data, requestId: previousAttempt.requestId, sourceOrigin: location.origin});
      status.dataset.state = 'success';
      status.textContent = 'Thank you — your enquiry is safely with Madeform. We’ll use your email address to continue the conversation.';
      previousAttempt = null;
      form.reset();
    } catch (error) {
      status.dataset.state = 'error';
      status.textContent = (error.message || 'Your enquiry could not be saved. Please try again.') + ' ';
      const chat = document.createElement('a');
      chat.href = 'https://wa.me/916301438905?text=' + encodeURIComponent(`Hi Madeform, I’d like to discuss a project.\nName: ${data.name}\nBusiness: ${data.businessName}\nEmail: ${data.email}\nService: ${data.service}\n\n${data.details}`);
      chat.target = '_blank';
      chat.rel = 'noopener noreferrer';
      chat.textContent = 'Continue on WhatsApp ';
      appendArrow(chat);
      status.appendChild(chat);
    } finally {
      button.disabled = false;
      button.textContent = 'Send your enquiry';
      appendArrow(button);
      form.removeAttribute('aria-busy');
      status.focus({preventScroll:true});
    }
  });
}
