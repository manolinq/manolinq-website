const { createClient } = require('@supabase/supabase-js');

const REQUIRED_FIELDS = ['name', 'business_name', 'email', 'service_needed'];

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event) => {
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

  // Validate required fields
  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || !String(body[field]).trim()) {
      return {
        statusCode: 400,
        headers: cors,
        body: JSON.stringify({ error: `Missing required field: ${field}` }),
      };
    }
  }

  // Basic email format check
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(body.email)) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({ error: 'Invalid email address' }),
    };
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const lead = {
    name:            String(body.name).trim(),
    business_name:   String(body.business_name).trim(),
    email:           String(body.email).trim().toLowerCase(),
    whatsapp_number: String(body.whatsapp_number || '').trim(),
    service_needed:  String(body.service_needed).trim(),
    budget_range:    String(body.budget_range || '').trim(),
    message:         String(body.message || '').trim(),
    source:          String(body.source || 'manolinq_website').trim(),
    page_url:        String(body.page_url || '').trim(),
    user_agent:      String(body.user_agent || '').trim(),
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

  return {
    statusCode: 200,
    headers: cors,
    body: JSON.stringify({ success: true }),
  };
};
