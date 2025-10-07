// Cloudflare Pages Function pour l'API Signup
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

  // Gérer les requêtes POST pour l'inscription
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const { username, email, password, confirm_password } = body;
      
      // Validation des données
      if (!username || !email || !password) {
        return addSecurityHeaders(new Response(JSON.stringify({
          detail: 'Tous les champs sont requis',
          status: 'error'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }));
      }
      
      if (password !== confirm_password) {
        return addSecurityHeaders(new Response(JSON.stringify({
          detail: 'Les mots de passe ne correspondent pas',
          status: 'error'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }));
      }
      
      if (password.length < 6) {
        return addSecurityHeaders(new Response(JSON.stringify({
          detail: 'Le mot de passe doit contenir au moins 6 caractères',
          status: 'error'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }));
      }
      
      // Simulation de création d'utilisateur (en production, sauvegarder en base de données)
      const userId = `user-${Date.now()}`;
      
      // Générer un token JWT simulé
      const token = btoa(JSON.stringify({
        user_id: userId,
        username: username,
        email: email,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 heures
      }));
      
      return addSecurityHeaders(new Response(JSON.stringify({
        access_token: token,
        token_type: 'bearer',
        user: {
          id: userId,
          username: username,
          email: email,
          is_active: true,
          is_superuser: false,
          created_at: new Date().toISOString()
        },
        message: 'Compte créé avec succès',
        status: 'success'
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }));
      
    } catch (error) {
      return addSecurityHeaders(new Response(JSON.stringify({
        detail: 'Erreur lors de la création du compte',
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
