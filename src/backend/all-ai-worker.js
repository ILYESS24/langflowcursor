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
        platform: 'Cloudflare Workers',
        timestamp: new Date().toISOString()
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
            flows: [
              {
                id: 'demo-flow-1',
                name: 'Demo Workflow',
                description: 'Exemple de workflow ALL AI',
                status: 'active',
                created_at: new Date().toISOString()
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
          
        case 'components':
          return new Response(JSON.stringify({ 
            components: [
              { name: 'TextInput', type: 'input', description: 'Composant de saisie de texte' },
              { name: 'TextOutput', type: 'output', description: 'Composant de sortie de texte' },
              { name: 'LLM', type: 'llm', description: 'Modèle de langage' },
              { name: 'Memory', type: 'memory', description: 'Composant de mémoire' },
              { name: 'PromptTemplate', type: 'prompt', description: 'Template de prompt' },
              { name: 'Chain', type: 'chain', description: 'Chaîne de traitement' }
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
            output: 'Hello from ALL AI on Cloudflare Workers!',
            message: 'ALL AI API - Run endpoint',
            status: 'running',
            execution_time: '0.1s'
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });

        case 'auth':
          return new Response(JSON.stringify({ 
            authenticated: true,
            user: {
              id: 'demo-user',
              username: 'demo',
              email: 'demo@allai.dev'
            },
            message: 'ALL AI API - Auth endpoint',
            status: 'authenticated'
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
            status: 'running',
            available_endpoints: ['flows', 'components', 'run', 'auth']
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
      version: '1.6.0',
      endpoints: {
        health: '/health',
        api: '/api/v1/',
        flows: '/api/v1/flows',
        components: '/api/v1/components',
        run: '/api/v1/run',
        auth: '/api/v1/auth',
        docs: 'https://docs.allai.org'
      },
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
};
