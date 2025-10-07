// Cloudflare Pages Function pour l'API Flows
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
    flows: [
      {
        id: 'demo-flow-1',
        name: 'Demo Workflow',
        description: 'Exemple de workflow ALL AI',
        status: 'active',
        created_at: new Date().toISOString(),
        components: [
          { id: 'input-1', type: 'TextInput', name: 'Input Text' },
          { id: 'llm-1', type: 'LLM', name: 'GPT Model' },
          { id: 'output-1', type: 'TextOutput', name: 'Output Text' }
        ]
      }
    ],
    message: 'ALL AI API - Flows endpoint',
    status: 'running'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
