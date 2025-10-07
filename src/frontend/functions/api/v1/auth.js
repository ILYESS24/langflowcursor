// Cloudflare Pages Function pour l'API Auth
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

  // Gérer les requêtes GET pour vérifier l'authentification
  if (request.method === 'GET') {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return addSecurityHeaders(new Response(JSON.stringify({
        authenticated: false,
        message: 'Token d\'authentification requis',
        status: 'error'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }));
    }
    
    try {
      const token = authHeader.substring(7); // Enlever "Bearer "
      const decoded = JSON.parse(atob(token));
      
      // Vérifier si le token a expiré
      if (decoded.exp && decoded.exp < Date.now()) {
        return addSecurityHeaders(new Response(JSON.stringify({
          authenticated: false,
          message: 'Token expiré',
          status: 'error'
        }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }));
      }
      
      return addSecurityHeaders(new Response(JSON.stringify({
        authenticated: true,
        user: {
          id: decoded.user_id,
          username: decoded.username,
          email: decoded.email
        },
        message: 'Utilisateur authentifié',
        status: 'success'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }));
      
    } catch (error) {
      return addSecurityHeaders(new Response(JSON.stringify({
        authenticated: false,
        message: 'Token invalide',
        error: error.message,
        status: 'error'
      }), {
        status: 401,
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
    allowed_methods: ['GET', 'OPTIONS'],
    status: 'error'
  }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  }));
}
