// Backend ALL AI pour Cloudflare Workers
// Version simplifiée mais fonctionnelle

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
        message: 'ALL AI Backend is running on Cloudflare Workers',
        version: '1.6.0',
        platform: 'Cloudflare Workers'
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
      const endpoint = url.pathname.replace('/api/v1/', '');
      
      switch (endpoint) {
        case 'flows':
          return new Response(JSON.stringify({ 
            flows: [],
            message: 'ALL AI API - Flows endpoint',
            status: 'running'
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
          
        case 'components':
          return new Response(JSON.stringify({ 
            components: [
              { name: 'TextInput', type: 'input' },
              { name: 'TextOutput', type: 'output' },
              { name: 'LLM', type: 'llm' },
              { name: 'Memory', type: 'memory' }
            ],
            message: 'ALL AI API - Components endpoint',
            status: 'running'
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
          
        case 'run':
          return new Response(JSON.stringify({ 
            result: 'Workflow executed successfully',
            message: 'ALL AI API - Run endpoint',
            status: 'running'
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
          
        default:
          return new Response(JSON.stringify({ 
            message: 'ALL AI API endpoint',
            endpoint: endpoint,
            status: 'running'
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
      }
    }

    // Route par défaut
    return new Response(JSON.stringify({ 
      message: 'ALL AI Backend on Cloudflare Workers',
      status: 'running',
      endpoints: {
        health: '/health',
        api: '/api/v1/',
        flows: '/api/v1/flows',
        components: '/api/v1/components',
        run: '/api/v1/run',
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
