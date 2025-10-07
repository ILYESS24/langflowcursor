// Backend ALL AI pour Cloudflare Workers
// Version simplifiée pour accès libre

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers pour permettre l'accès depuis le frontend
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Gérer les requêtes OPTIONS (preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200, 
        headers: corsHeaders 
      });
    }

    // Route de santé
    if (url.pathname === '/health' || url.pathname === '/health_check') {
      return new Response(JSON.stringify({ 
        status: 'ok', 
        message: 'ALL AI Backend is running',
        version: '1.6.0'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Route API de base
    if (url.pathname.startsWith('/api/v1/')) {
      return new Response(JSON.stringify({ 
        message: 'ALL AI API is running',
        endpoints: [
          '/api/v1/flows',
          '/api/v1/components',
          '/api/v1/run'
        ]
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Route par défaut
    return new Response(JSON.stringify({ 
      message: 'ALL AI Backend',
      status: 'running',
      endpoints: {
        health: '/health',
        api: '/api/v1/',
        docs: 'https://docs.ALL AI.org'
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
};
