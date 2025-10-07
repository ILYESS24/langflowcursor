#!/bin/bash
echo "🚀 Déploiement sur Cloudflare Pages..."
echo "====================================="

# Vérifier que wrangler est installé
if ! command -v wrangler &> /dev/null; then
    echo "Installation de Wrangler CLI..."
    npm install -g wrangler
fi

# Se connecter à Cloudflare (nécessite interaction manuelle)
echo "Connexion à Cloudflare..."
echo "Une fenêtre de navigateur va s'ouvrir"
wrangler login

# Déployer le frontend
echo "Déploiement du frontend..."
cd src/frontend
wrangler pages deploy build --project-name langflow-frontend

echo "✅ Déploiement terminé !"
echo "🌐 Votre application est accessible sur :"
echo "   https://langflow-frontend.pages.dev"
