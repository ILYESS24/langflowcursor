// Cloudflare Pages Function pour l'API Login
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
    }));
  }

  // Gérer les requêtes POST pour la connexion
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const { username, password } = body;
      
      // Simulation d'authentification (en production, vérifier avec une vraie base de données)
      if (username && password) {
        // Générer un token JWT simulé
        const token = btoa(JSON.stringify({
          user_id: 'demo-user-123',
          username: username,
          email: `${username}@allai.dev`,
          exp: Date.now() + (24 * 60 * 60 * 1000) // 24 heures
        }));
        
        return addSecurityHeaders(new Response(JSON.stringify({
          access_token: token,
          token_type: 'bearer',
          user: {
            id: 'demo-user-123',
            username: username,
            email: `${username}@allai.dev`,
            is_active: true,
            is_superuser: username === 'admin'
          },
          message: 'Connexion réussie',
          status: 'success'
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }));
      } else {
        return addSecurityHeaders(new Response(JSON.stringify({
          detail: 'Nom d\'utilisateur et mot de passe requis',
          status: 'error'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }));
      }
    } catch (error) {
      return addSecurityHeaders(new Response(JSON.stringify({
        detail: 'Erreur lors de la connexion',
        error: error.message,
        status: 'error'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }));
    }
  }

  // Pour les autres méthodes, retourner une erreur
  return addSecurityHeaders(new Response(JSON.stringify({
    detail: 'Méthode non autorisée',
    allowed_methods: ['POST', 'OPTIONS'],
    status: 'error'
  }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  }));
}
