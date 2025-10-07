// Cloudflare Pages Function pour l'API Run
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

  // Simuler l'exécution d'un workflow
  const startTime = Date.now();
  
  return new Response(JSON.stringify({
    result: 'Workflow executed successfully',
    output: 'Hello from ALL AI on Cloudflare Pages Functions!',
    message: 'ALL AI API - Run endpoint',
    status: 'completed',
    execution_time: `${(Date.now() - startTime)}ms`,
    workflow_id: 'demo-workflow-1',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
