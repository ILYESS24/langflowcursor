// Cloudflare Pages Function pour l'API ALL AI
import { csrfProtection } from '../csrf-middleware.js';

import { addSecurityHeaders } from '../security-headers.js';

export async function onRequest(context) {
  const { request } = context;
  
  // Vérification CSRF
  const csrfError = csrfProtection(request);
  if (csrfError) return csrfError;
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Gérer les requêtes OPTIONS (preflight)
  if (request.method === 'OPTIONS') {
    return addSecurityHeaders(new Response(null, { 
      status: 200, 
      headers: corsHeaders 
    });
  }

  return new Response(JSON.stringify({
    status: 'ok',
    message: 'ALL AI Backend is running on Cloudflare Pages Functions',
    version: '1.6.0',
    platform: 'Cloudflare Pages',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
