
// Middleware CSRF pour Cloudflare Functions
export function csrfProtection(request) {
  const origin = request.headers.get('Origin');
  const referer = request.headers.get('Referer');
  const host = request.headers.get('Host');
  
  // Vérifier l'origine pour les requêtes POST/PUT/DELETE
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const allowedOrigins = [
      'https://all-ai-frontend.pages.dev',
      'https://45aab86e.all-ai-frontend.pages.dev',
      'http://localhost:3000' // Pour le développement
    ];
    
    if (!allowedOrigins.includes(origin)) {
      return new Response('CSRF Protection: Origin not allowed', { 
        status: 403,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        }
      });
    }
  }
  
  return null; // Pas d'erreur CSRF
}
