// Cloudflare Pages Function pour l'API Components
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
    components: [
      { 
        name: 'TextInput', 
        type: 'input', 
        description: 'Composant de saisie de texte',
        category: 'Input',
        icon: '📝'
      },
      { 
        name: 'TextOutput', 
        type: 'output', 
        description: 'Composant de sortie de texte',
        category: 'Output',
        icon: '📄'
      },
      { 
        name: 'LLM', 
        type: 'llm', 
        description: 'Modèle de langage',
        category: 'LLM',
        icon: '🤖'
      },
      { 
        name: 'Memory', 
        type: 'memory', 
        description: 'Composant de mémoire',
        category: 'Memory',
        icon: '🧠'
      },
      { 
        name: 'PromptTemplate', 
        type: 'prompt', 
        description: 'Template de prompt',
        category: 'Prompt',
        icon: '📋'
      },
      { 
        name: 'Chain', 
        type: 'chain', 
        description: 'Chaîne de traitement',
        category: 'Chain',
        icon: '🔗'
      },
      { 
        name: 'VectorStore', 
        type: 'vectorstore', 
        description: 'Stockage vectoriel',
        category: 'Vector',
        icon: '🗂️'
      },
      { 
        name: 'Embeddings', 
        type: 'embeddings', 
        description: 'Modèle d\'embeddings',
        category: 'Embeddings',
        icon: '🔢'
      }
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
}
