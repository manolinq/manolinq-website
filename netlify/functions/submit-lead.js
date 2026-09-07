const { createClient } = require('@supabase/supabase-js');

/* ---------------------------------------------------------------------------
   Which sites are allowed to post to this endpoint.
   Add or remove entries here if your domain ever changes.
--------------------------------------------------------------------------- */
const ALLOWED_ORIGINS = [
  'https://manolinq.com',
  'https://www.manolinq.com',
];

/* Netlify deploy previews get a random *.netlify.app address, so they would be
   blocked by the list above. Set ALLOW_NETLIFY_PREVIEWS=true in your Netlify
   environment variables while testing a preview; leave it unset in production. */
const ALLOW_PREVIEWS = process.env.ALLOW_NETLIFY_PREVIEWS === 'true';

const REQUIRED_FIELDS = ['name', 'business_name', 'email', 'service_needed'];

/* Longest value we accept per field. Anything longer is cut off rather than
   rejected, so an honest visitor with a lot to say still gets through. */
const MAX_LENGTHS = {
  name: 120,
  business_name: 160,
  email: 254,
  whatsapp_number: 40,
  service_needed: 80,
  budget_range: 60,
  message: 4000,
  source: 60,
  page_url: 500,
  user_agent: 500,
};

/* Hard ceiling on the whole request, so nobody can post a huge payload. */
const MAX_BODY_BYTES = 20000;

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (ALLOW_PREVIEWS && /^https:\/\/[a-z0-9-]+\.netlify\.app$/.test(origin)) return true;
  return false;
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function clean(value, field) {
  return String(value || '').trim().slice(0, MAX_LENGTHS[field] || 500);
}

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || '';
  const cors = corsHeaders(origin);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: cors,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  /* Only our own pages may submit. Browsers always send an Origin header on a
     POST like this one, so a request without a valid one is not a real visitor. */
  if (!isAllowedOrigin(origin)) {
    console.warn('Blocked submission from origin:', origin || '(none)');
    return {
      statusCode: 403,
      headers: cors,
      body: JSON.stringify({ error: 'Forbidden' }),
    };
  }

  if ((event.body || '').length > MAX_BODY_BYTES) {
    return {
      statusCode: 413,
      headers: cors,
      body: JSON.stringify({ error: 'Request too large' }),
    };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: 'Server configuration error' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  /* Honeypot. The form carries a field that is hidden from people but that
     automated scripts fill in anyway. If it has a value, drop the submission —
     and answer with success so the bot has nothing to learn from the response. */
  if (String(body.company_website || '').trim() !== '') {
    console.warn('Honeypot triggered — submission discarded');
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({ success: true }),
    };
  }

  /* Anything submitted faster than a human could type it is a script.
     The form stamps the time the page was opened into form_started_at. */
  const startedAt = Number(body.form_started_at);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 3000) {
    console.warn('Submission filled in under 3 seconds — discarded');
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({ success: true }),
    };
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || !String(body[field]).trim()) {
      return {
        statusCode: 400,
        headers: cors,
        body: JSON.stringify({ error: `Missing required field: ${field}` }),
      };
    }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(body.email)) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({ error: 'Invalid email address' }),
    };
  }

  /* Spam almost always carries links in the message. One or two is normal for a
     real enquiry; five is a advertisement. */
  const linkCount = (String(body.message || '').match(/https?:\/\//gi) || []).length;
  if (linkCount > 4) {
    console.warn('Submission with', linkCount, 'links — discarded');
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({ success: true }),
    };
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const lead = {
    name:            clean(body.name, 'name'),
    business_name:   clean(body.business_name, 'business_name'),
    email:           clean(body.email, 'email').toLowerCase(),
    whatsapp_number: clean(body.whatsapp_number, 'whatsapp_number'),
    service_needed:  clean(body.service_needed, 'service_needed'),
    budget_range:    clean(body.budget_range, 'budget_range'),
    message:         clean(body.message, 'message'),
    source:          clean(body.source || 'manolinq_website', 'source'),
    page_url:        clean(body.page_url, 'page_url'),
    user_agent:      clean(body.user_agent, 'user_agent'),
    status:          'new',
  };

  const { error } = await supabase.from('leads').insert(lead);

  if (error) {
    console.error('Supabase insert error:', error);
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: 'Failed to save lead' }),
    };
  }

  // Send Telegram notification after successful Supabase insert.
  // Failures here are logged but never surface as an error to the caller.
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    const text =
      `🔥 New Manolinq Lead\n\n` +
      `Name: ${lead.name}\n` +
      `Business: ${lead.business_name}\n` +
      `Email: ${lead.email}\n` +
      `WhatsApp: ${lead.whatsapp_number || '—'}\n` +
      `Service: ${lead.service_needed}\n` +
      `Budget: ${lead.budget_range || '—'}\n` +
      `Message:\n${lead.message || '—'}\n\n` +
      `Source: manolinq_website`;

    try {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text }),
        }
      );
      if (!tgRes.ok) {
        const tgBody = await tgRes.text();
        console.error('Telegram API error:', tgRes.status, tgBody);
      }
    } catch (tgErr) {
      console.error('Telegram fetch error:', tgErr);
    }
  }

  return {
    statusCode: 200,
    headers: cors,
    body: JSON.stringify({ success: true }),
  };
};
