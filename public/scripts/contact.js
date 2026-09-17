// Same endpoint, field mappings, metadata and dropdown values as the original standalone form.
const form = document.getElementById('auditForm');
const formOpenedAt = Date.now();
const status = document.getElementById('formStatus');
const button = form.querySelector('button[type="submit"]');
const serviceSelect = document.getElementById('serviceSelect');
const preset = new URLSearchParams(window.location.search).get('service');
if ([...serviceSelect.options].some(option => option.value === preset)) serviceSelect.value = preset;
button.disabled = false;
form.noValidate = true;
function validateField(field) {
  const error = document.getElementById(`${field.id}-error`);
  if (!error) return field.validity.valid;
  let message = '';
  if (field.validity.valueMissing) message = field.tagName === 'SELECT' ? 'Kies een dienst.' : 'Vul dit veld in.';
  else if (field.validity.typeMismatch) message = 'Vul een geldig e-mailadres in, bijvoorbeeld naam@bedrijf.be.';
  else if (!field.validity.valid) message = 'Controleer de ingevulde waarde.';
  error.textContent = message;
  field.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
}
form.querySelectorAll('[required]').forEach(field => {
  field.addEventListener('blur', () => { if (field.value) validateField(field); });
  field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validateField(field); });
  field.addEventListener('change', () => { if (field.getAttribute('aria-invalid') === 'true') validateField(field); });
});
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  if (button.disabled) return;
  const invalid = [...this.querySelectorAll('[required]')].filter(field => !validateField(field));
  if (invalid.length) {
    status.dataset.state = 'error';
    status.textContent = 'Controleer de gemarkeerde velden voordat je je aanvraag verstuurt.';
    invalid[0].focus();
    return;
  }
  const f = new FormData(this);
  const originalText = button.innerHTML;
  button.disabled = true;
  this.setAttribute('aria-busy', 'true');
  button.textContent = 'Aanvraag versturen…';
  status.dataset.state = 'loading';
  status.textContent = 'Je aanvraag wordt verstuurd. Even geduld.';
  const payload = {
    name: f.get('name'),
    business_name: f.get('business'),
    email: f.get('email'),
    whatsapp_number: f.get('whatsapp') || '',
    service_needed: f.get('service'),
    budget_range: f.get('budget') || '',
    message: f.get('message') || '',
    source: 'manolinq_website',
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    company_website: f.get('company_website') || '',
    form_started_at: formOpenedAt
  };
  try {
    const response = await fetch('/.netlify/functions/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success !== true) {
      const error = new Error('Submission failed');
      error.httpStatus = response.status;
      throw error;
    }
    this.reset();
    this.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
    status.dataset.state = 'success';
    status.textContent = 'Bedankt! Je aanvraag is ontvangen. Manolito neemt contact met je op om je project te bespreken.';
    status.focus();
  } catch (error) {
    const messages = {
      400: 'Controleer je gegevens en je e-mailadres en probeer opnieuw.',
      403: 'Versturen is vanaf deze pagina niet toegestaan. Neem contact op via e-mail of WhatsApp.',
      413: 'Je aanvraag is te lang. Maak je bericht korter en probeer opnieuw.',
      429: 'Er zijn momenteel te veel aanvragen. Probeer het later opnieuw of neem rechtstreeks contact op.'
    };
    status.dataset.state = 'error';
    status.textContent = messages[error.httpStatus] || 'Je aanvraag kon niet bevestigd worden. Je gegevens blijven ingevuld. Probeer opnieuw of neem contact op via e-mail of WhatsApp.';
    status.focus();
  } finally {
    button.disabled = false;
    this.setAttribute('aria-busy', 'false');
    button.innerHTML = originalText;
  }
});
